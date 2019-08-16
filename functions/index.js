'use strict';

const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
var admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
var database = admin.database();

var currentDate = new Date();
var date = currentDate.getFullYear()+'-'+(currentDate.getMonth()+1)+'-'+currentDate.getDate();
var time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
var dateTime = date+' @ '+time;

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    const agent = new WebhookClient({ request, response});
    console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
    function handleBedroomLight(agent) {
        var bedroomLight = agent.parameters['bedroomLight'];
        try {
            database.ref('bedroomLightStatus').set({
                bedroomLight: bedroomLight,
                timestamp: dateTime
            });
            switch(bedroomLight){
                case '0':
                    agent.add('ปิดไฟห้องนอนแล้วค่ะ');
                    break;
                case '1':
                    agent.add('เปิดไฟห้องนอนแล้วค่ะ');
                    break;
                default: 
                    agent.add('มีอะไรให้รับใช้คะ');
                    break;
            }
        } catch (ex) {
            console.log('Database update error! : '+ex);
        }
    }

    function handleFan(agent) {
        var fan = agent.parameters['fan'];
        try {
            database.ref('fanStatus').set({
                fan: fan,
                timestamp: dateTime
            });
            switch(fan){
                case '0':
                    agent.add('ปิดพัดลมแล้วค่ะ');
                    break;
                case '1':
                    agent.add('เปิดพัดลมแล้วค่ะ');
                    break;
                default: 
                    agent.add('มีอะไรให้รับใช้คะ');
                    break;
            }
        } catch (ex) {
            console.log('Database update error! : '+ex);
        }
    }

    function handleLivingroomLight(agent) {
        var livingroomLight = agent.parameters['livingroomLight'];
        try {
            database.ref('livingroomLightStatus').set({
                livingroomLight: livingroomLight,
                timestamp: dateTime
            });
            switch(livingroomLight){
                case '0':
                    agent.add('ปิดไฟห้องนั่งเล่นแล้วค่ะ');
                    break;
                case '1':
                    agent.add('เปิดไฟห้องนั่งเล่นแล้วค่ะ');
                    break;
                default: 
                    agent.add('มีอะไรให้รับใช้คะ');
                    break;
            }
        } catch (ex) {
            console.log('Database update error! : '+ex);
        }
    }

    function handleTv(agent) {
        var tv = agent.parameters['tv'];
        try {
            database.ref('tvStatus').set({
                tv: tv,
                timestamp: dateTime
            });
            switch(tv){
                case '0':
                    agent.add('ปิดทีวีแล้วค่ะ');
                    break;
                case '1':
                    agent.add('เปิดทีวีแล้วค่ะ');
                    break;
                default: 
                    agent.add('มีอะไรให้รับใช้คะ');
                    break;
            }
        } catch (ex) {
            console.log('Database update error! : '+ex);
        }
    }

    

    let intenMap = new Map();
    intenMap.set('bedroomLight_Intent', handleBedroomLight);
    intenMap.set('fan_Intent', handleFan);
    intenMap.set('livingroomLight_Intent', handleLivingroomLight);
    intenMap.set('tv_Intent', handleTv);
    agent.handleRequest(intenMap);

});
