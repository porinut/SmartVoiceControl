'use strict';

var currentDate = new Date();
var date = currentDate.getFullYear()+'-'+(currentDate.getMonth()+1)+'-'+currentDate.getDate();
var time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
var dateTime = date+' @ '+time;

module.exports = {
    updateFirebase: function(database,device,status) {
        console.log(device);
        database.ref('deviceStatus/'+device).set({
            status: status,
            timestamp: dateTime
        });
    }
};

