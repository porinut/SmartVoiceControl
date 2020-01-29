'use strict';

var moment = require('moment');

module.exports = {
    updateFirebase: function(database,numberSwitch,status) {
        var now = moment();
        var formatted = now.format('YYYY-MM-DDTHH:mm:ss-07:00');
        var timeStamp = moment.utc(formatted).format('YYYY-MM-DDTHH:mm:ss');
        console.log('switch'+numberSwitch+' : '+status);
        console.log(timeStamp);
        database.ref('switchStatus/'+'switch'+numberSwitch).set({
            status: status,
            timestamp: timeStamp
        });
    }
}

