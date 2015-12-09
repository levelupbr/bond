"use strict";

const mongoose = require('mongoose');

let appSchema = new mongoose.Schema({
    'name': { type: String, index: true },
    'created': { type: Date, default: Date.now }
});

module.exports = mongoose.model('App', appSchema);