'use strict';

const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
var admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
var database = admin.database();
const firebaseModel = require('./firebase_model');
const dialogflowModel = require('./dialogflow_model');

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    const agent = new WebhookClient({ request, response});
    console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
    function handleBedroomLight(agent){
        var device = 'bedroomLight';
        var status = agent.parameters[device];
        try {
            firebaseModel.updateFirebase(database,device,status);
            dialogflowModel.addResponse(agent,status,'ปิดไฟห้องนอนแล้วค่ะ','เปิดไฟห้องนอนแล้วค่ะ');
        } catch (ex) {
            console.log('Database update error! : '+ex);
        }
    }

    function handleLivingroomLight(agent){
        var device = 'livingroomLight';
        var status = agent.parameters[device];
        try {
            firebaseModel.updateFirebase(database,device,status);
            dialogflowModel.addResponse(agent,status,'ปิดไฟห้องนั่งเล่นแล้วค่ะ','เปิดไฟห้องนั่งเล่นแล้วค่ะ');
        } catch (ex) {
            console.log('Database update error! : '+ex);
        }
    }

    function handleFan(agent){
        var device = 'fan';
        var status = agent.parameters[device];
        try {
            firebaseModel.updateFirebase(database,device,status);
            dialogflowModel.addResponse(agent,status,'ปิดพัดลมแล้วค่ะ','เปิดพัดลมแล้วค่ะ');
        } catch (ex) {
            console.log('Database update error! : '+ex);
        }
    }

    function handleTv(agent){
        var device = 'tv';
        var status = agent.parameters[device];
        try {
            firebaseModel.updateFirebase(database,device,status);
            dialogflowModel.addResponse(agent,status,'ปิดทีวีแล้วค่ะ','เปิดทีวีแล้วค่ะ');
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
