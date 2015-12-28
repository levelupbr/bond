'use strict';

const zmq = require('zmq'),
    log = require('npmlog'),
    publisher = zmq.socket('pub'),
    port = 2533,
    subscriber = zmq.socket('sub');

publisher.bind('tcp://*:'+port, function (err) {
    if (!err)
        log.info('0MQ', 'Listening for zmq subscribers...');
    else
        log.error(err);
});

subscriber.subscribe("");
subscriber.connect("tcp://localhost:"+port);

module.exports = {
    publisher: publisher,
    subscriber: subscriber
};
