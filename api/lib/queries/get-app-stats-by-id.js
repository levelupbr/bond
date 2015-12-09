'use strict';

const Q = require('q'),
  Version = require('./../models/version');

let Control = function(versionId) {

    this.version = versionId;
    this.count = 0;
    this.success = 0;
    this.error = 0;
    this.downgrade = 0;
    
    this.update = function(count, success, error)
    {
        this.count+=count;
        this.success+=success;        
        this.error+=error;
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
        this.getControl().update(version.count,version.success,version.error);
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
        
        return this.result;
    }
};

let getAppStatsById = {

    'execute': function (id) {
      
        let defered = Q.defer();
        
        Version.aggregate([
            {
                $match: { appId: id }
            },
            {
                $project: {
                    version: '$version',
                    from: '$from',
                    success: {
                        $cond: {
                            if : {
                                $eq: ['$status', 1]
                            },
                            then: 1,
                            else: 0
                        }
                    },
                    error: {
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
                    error: {
                        $sum: '$error'
                    },
                    success: { 
                        $sum: '$success'
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
