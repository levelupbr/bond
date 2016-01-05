'use strict';

const Q = require('q'),
  Version = require('./../models/version');

String.prototype.toNumber = function() {
    return this.replace(/\./g, '');
};

let Control = function(versionId) {

    this.version = versionId;
    this.count = 0;
    this.online = 0;
    this.offline = 0;
    this.inactive = 0;
    this.downgrade = 0;

    this.update = function(count, online, offline, inactive)
    {
        this.count+=count;
        this.online+=online;
        this.offline+=offline;
        this.inactive+=inactive;
    };
}  ;

let summarize = {

    result: [],
    downgrades: {},
    control: {},
    downgrade: {},
    selectedVersion: {},

    getSelectedVersionId: function() {
        return this.selectedVersion._id.version;
    },

    createControl: function(_versionId) {
        let versionId = _versionId||this.getSelectedVersionId();
        this.control[versionId] = new Control(versionId);
        this.result.push(this.control[versionId]);
    },

    getControl: function(_versionId) {
        let versionId = _versionId||this.getSelectedVersionId();
        if ( ! this.control[versionId] )
            this.createControl(versionId);

        return this.control[versionId];
    },

    updateDowngrade: function() {
        if ( this.selectedVersion._id.from && this.selectedVersion.downgrade )
            this.getControl(this.selectedVersion._id.from).downgrade += this.selectedVersion.downgrade;
    },

    update: function(version) {
        this.selectedVersion = version;
        this.getControl().update(version.count,version.online,version.offline, version.inactive);
        this.updateDowngrade();
    },

    reset: function() {
        this.result = [];
        this.downgrades = {};
        this.control = {};
        this.downgrade = {};
        this.selectedVersion = {};
    },

    exec: function(data) {
        this.reset();

        if (!data) return [];
        let self = this;

        data.forEach(function(version){
            self.update(version);
        });

        this.result.sort(function(v1, v2) {
            if ( v1.version.toNumber() < v2.version.toNumber )
              return -1;

            return 1;
        });

        return this.result;
    }
};

let getAppStatsById = {

    'execute': function (id, q) {

        let defered = Q.defer();

        let match = { appId: id };

        if ( q ) {

          let date1 = new Date(q.start||q) ,
            date2 = new Date(q.end||q);

          date2.setDate(date2.getDate() + 1);
          match.updated = { $gte: date1, $lt:  date2};

        }

        Version.aggregate([
            {
                $match: match
            },
            {
                $project: {
                    version: '$version',
                    from: '$from',
                    online: {
                        $cond: {
                            if : {
                                $eq: ['$status', 2]
                            },
                            then: 1,
                            else: 0
                        }
                    },
                    offline: {
                        $cond: {
                            if : {
                                $eq: ['$status', 1]
                            },
                            then: 1,
                            else: 0
                        }
                    },
                    inactive: {
                        $cond: {
                            if : {
                                $eq: ['$status', 0]
                            },
                            then: 1,
                            else: 0
                        }
                    },
                    downgrade: {
                        $cond: {
                            if : {
                                $eq: ['$downgrade', true]
                            },
                            then: 1,
                            else: 0
                        }
                    }
                }
            },
            {
                $group: {
                    _id: {
                        version: '$version',
                        from: '$from'
                    },
                    count: {
                        $sum: 1
                    },
                    inactive: {
                        $sum: '$inactive'
                    },
                    online: {
                        $sum: '$online'
                    },
                    offline: {
                        $sum: '$offline'
                    },
                    downgrade: {
                        $sum: '$downgrade'
                    }
                }
            }
        ]).exec(function(err, result){
            if (err) return defered.reject(err);
            defered.resolve(summarize.exec(result));
        });

        return defered.promise;
    }
};

module.exports = getAppStatsById;
