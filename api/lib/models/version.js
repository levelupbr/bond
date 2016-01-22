"use strict";

const mongoose = require('mongoose');

let versionToNumber = function(version)
{
    return version.replace(/\./g,'');
};

let versionSchema = new mongoose.Schema({
    'appId': String,
    'hardwareId': String,
    'createdAt': { type: Date, default: Date.now },
    'version': String,
    'from': 'String',
    'ip' : { type: String, default: '' },
    'status': { type: Number, default: 0 },
    'data': { type: mongoose.Schema.Types.Mixed },
    'downgrade' : { type: Boolean, default: false },
    'updated': { type: Date, default: Date.now },
    'history' : [{}]
});

versionSchema.pre('save', function(next){
  this.updated = new Date();
  next();
});

versionSchema.index({ appId: 1, hardwareId: 1}, { unique: true });

versionSchema.methods.setVersion = function (version) {
    if ( this.version === version )
        return;

    this.from = this.version;
    this.version = version;
    this.downgrade = versionToNumber(this.version) < versionToNumber(this.from);
};

versionSchema.methods.setStatus = function (status) {
    // 0: inactive, 1: offline: 2: online
    let code = { "open" : this.status ? 1 : 0, "success": 2, "repair": 3, "try-connect": 4, "closed" : 5 }[status];
    this.status = code;
};

versionSchema.methods.downgradeVersion = function (version) {
    this.setVersion(version);
    this.downgrade = true;
};

versionSchema.methods.addHistory = function () {

    let history = {
      'version': this.version,
      'from': this.from,
      'status': this.status,
      'downgrade' : this.downgrade,
      'updated': this.updated,
      'ip' : this.ip,
      'data': this.data
    };

    this.history.push(history);
};

versionSchema.virtual('succeeded').get(function () {
  return (this.status === 2);
});

module.exports = mongoose.model('Version', versionSchema);
