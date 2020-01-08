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
        try {
            console.log('number => '+number);
            console.log('time => '+time);
            console.log('date => '+date);
            console.log('setTimer_entity => '+setTimer);
            agent.add('number => '+number);
            agent.add('time => '+time);
            agent.add('date => '+date);
            agent.add('setTimer_entity => '+setTimer);
            console.log('------------------------------------------------------');
            console.log('Function handleSetTimer is run successfull');
        } catch (ex) {
            console.log('Database update error! : '+ex);
        }
    }
}
