"use strict";

const mongoose = require('mongoose');

let versionToNumber = function(version)
{
    return version.replace(/\./g,'');
};

let setStatus = function(status) {
    return { "open" : 0, "success": 1 }[status];
};

let versionSchema = new mongoose.Schema({
    'appId': String,
    'hardwareId': String,
    'version': String,
    'from': 'String',
    'status': { type: Number, set: setStatus },
    'downgrade' : { type: Boolean, default: false },
    'updated': { type: Date, default: Date.now }
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

versionSchema.methods.downgradeVersion = function (version) {
    this.setVersion(version);
    this.downgrade = true;
};

module.exports = mongoose.model('Version', versionSchema);
