'use strict';

const zmq = require('zmq'),
    log = require('npmlog'),
    publisher = zmq.socket('pub'),
    subscriber = zmq.socket('sub');

publisher.bind('tcp://*:5432', function (err) {
    if (!err)
        log.info('0MQ', 'Listening for zmq subscribers...');
    else
        log.error(err);
});

subscriber.subscribe("");
subscriber.connect("tcp://localhost:5432");

module.exports = { 
    publisher: publisher,
    subscriber: subscriber
};