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
            version   : data.version,
            users     : data.count,
            success   : data.success,
            error     : data.error,
            downgrade : data.downgrade !== 0 ? - data.downgrade : data.downgrade
        }
    };
}