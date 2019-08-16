'use strict';

const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
var admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
var database = admin.database();


exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    const agent = new WebhookClient({ request, response});
    console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
    function handleBedroomLight(agent) {
        var bedroomLight = agent.parameters['bedroomLight'];
        try {
            database.ref('bedroomLightStatus').set({bedroomLight: bedroomLight});
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


    let intenMap = new Map();
    intenMap.set('bedroomLight_Intent', handleBedroomLight);
    agent.handleRequest(intenMap);

});
