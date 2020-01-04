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
    
        return database.ref('bigData/data').once('value').then((snapshot) => {
            if (snapshot.exists){
                var data = snapshot.child('smallData').val();
                console.log('return ok => '+data);
                agent.add('read data ok => '+data);
                return data;
            }else{
                throw new Error("Profile doesn't exist");
            }
        });
    }
};

