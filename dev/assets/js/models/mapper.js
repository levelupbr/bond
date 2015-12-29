function MapperModel () {
    'use strict';

    this.mapAppList = function (data) {
        return {
            id   : data._id,
            name : data.name
        }
    };

    this.mapAppData = function (data) {

        return {
            version   : data.version  || 0,
            users     : data.count    || 0,
            online    : data.online   || 0,
            offline   : data.offline  || 0,
            inactive  : data.inactive || 0,
            downgrade : data.downgrade !== 0 ? - data.downgrade : data.downgrade
        }
    };
}