'use strict';

var currentDate = new Date();
var date = currentDate.getFullYear()+'-'+(currentDate.getMonth()+1)+'-'+currentDate.getDate();
var time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
var dateTime = date+' @ '+time;

module.exports = {
    updateFirebase: function(database,numberSwitch,status) {
        console.log('switch'+numberSwitch);
        database.ref('switchStatus/'+'switch'+numberSwitch).set({
            status: status,
            timestamp: dateTime
        });
    },

    readFirebase: function(database,numberSwitch) {
        //var userId = firebase.auth().currentUser.uid;
        console.log('switch'+numberSwitch);
        return database.ref('switchStatus/'+'switch1/'+'status').once('value');
    }
};

