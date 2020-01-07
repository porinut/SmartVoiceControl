'use strict';

var moment = require('moment');
var now = moment();
var formatted = now.format('YYYY-MM-DDTHH:mm:ss-07:00');
var timeStamp = moment.utc(formatted).format('HH:mm:ss DD-MM-YYYY');

module.exports = {
    updateFirebase: function(database,numberSwitch,status) {
        console.log('switch'+numberSwitch);
        console.log(timeStamp);
        database.ref('switchStatus/'+'switch'+numberSwitch).set({
            status: status,
            timestamp: timeStamp
        });
    }
}

