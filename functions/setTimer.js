/* eslint-disable consistent-return */
'use strict';
var moment = require('moment');
const firebaseModel = require('./firebase_model');
const dialogflowModel = require('./dialogflow_model');

module.exports = {
    handleSetTimer: function(agent,database) {
        console.log('------------------------------------------------------');
        console.log('Function handleSetTimer is running..');
        var number = agent.parameters['number'];
        var time = agent.parameters['time'];
        var date = agent.parameters['date'];
        var setTimer = agent.parameters['setTimer_entity'];

        var timeUTC = moment(time).format('YYYY-MM-DDTHH:mm:ss-07:00');
        var timeFormatted = moment.utc(timeUTC).format('HH:mm:ss');
 
        var dateUTC = moment(date).format('YYYY-MM-DDTHH:mm:ss-07:00');
        var dateFormatted = moment.utc(dateUTC).format('DD-MM-YYYY');


        try {
            console.log('number => '+number);
            console.log('time => '+timeFormatted);
            console.log('date => '+dateFormatted);
            console.log('setTimer_entity => '+setTimer);
            agent.add('number => '+number);
            agent.add('time => '+timeFormatted);
            agent.add('date => '+dateFormatted);
            agent.add('setTimer_entity => '+setTimer);
            console.log('------------------------------------------------------');
            console.log('Function handleSetTimer is run successfull');
        } catch (ex) {
            console.log('Database update error! : '+ex);
        }
    }
}
