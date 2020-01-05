'use strict';

const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
var admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
var database = admin.database();
const firebaseModel = require('./firebase_model');
const dialogflowModel = require('./dialogflow_model');
const onOffSwitch = require('./onOffSwitch');
//const checkStatus = require('./checkStatus');
const controlRoom = require('./controlRoom');

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    const agent = new WebhookClient({ request, response});
    console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
/*-----------------------------------------------Function--------------------------------------------------------------*/ 

    function handleOnOffSwitch_map(agent){
        onOffSwitch.handleOnOffSwitch(agent,database);
    }
     /*
    function handleCheckStatusSwitch_map(agent){
        //agent.add('ok');
        //return checkStatus.handleCheckStatusSwitch(agent,database);
    }
 
    //function Handle Check Status Switch 
    function handleCheckStatusSwitch_map(agent){
        console.log('Function handleCheckStatusSwitch is running..')
        var number = agent.parameters['number'];
        var checkStatus = agent.parameters['checkOnOff'];
        try {
            if(checkStatus === '99' && number !== ''){
                console.log('Condition => checkStatus === 99 && number !== ');
                return database.ref('switchStatus/switch'+number).once('value').then((snapshot) => {
                    if (snapshot.exists){
                        var data = snapshot.child('status').val();
                        console.log('Retrieve child ok => '+data);
                        if(data === '1'){
                            agent.add('สวิตซ์'+number+'เปิดอยู่ค่ะ');
                            console.log('Responsed to dialogflow => '+data);
                        }else{
                            agent.add('สวิตซ์'+number+'ปิดอยู่ค่ะ');
                            console.log('Responsed to dialogflow => '+data);
                        }
                        return data;
                    }else{
                        throw new Error("Profile doesn't exist");
                    }
                    });

            }else if(checkStatus === '1' && number === ''){
                //return firebaseModel.readFirebase(database,agent); //Worked
                console.log('Condition => checkStatus === 1 && number === ');
                return database.ref('switchStatus').once('value', (snapshot) => {
                    var count = 1;
                    snapshot.forEach((childSnapshot) => {
                        var childKey = childSnapshot.key;
                        var childData = childSnapshot.child('status').val();
                        console.log('childKey => '+childKey);
                        console.log('childData => '+childData);
                        if(childData === '1'){
                            agent.add('สวิตซ์'+count+'เปิดอยู่ค่ะ');
                            console.log('Responsed to dialogflow => '+childData);
                        }else{
                            agent.add('สวิตซ์'+count+'ปิดอยู่ค่ะ');
                            console.log('Responsed to dialogflow => '+childData);
                        }
                        count++;
                    });
                  });
            }
            console.log('Function handleCheckStatusSwitch is run successfull');
        } catch (ex) {
            console.log('Database update error! : '+ex);
        }
    }
    */
/*-----------------------------------------------Old Code--------------------------------------------------------------*/ 
    function handleBedroomLight_map(agent){
        controlRoom.handleBedroomLight(agent,database);
    }

    function handleLivingroomLight_map(agent){
        controlRoom.handleLivingroomLight(agent,database);
    }

    function handleFan_map(agent){
        controlRoom.handleFan(agent,database);
    }

    function handleTv_map(agent){
        controlRoom.handleTv(agent,database);
    }

    function test(agent){
        agent.add('OK');
    }
/*---------------------------------------------------------------------------------------------------------------------*/ 
    /*Intent Mapping (intent Name, function name)*/
    let intenMap = new Map();
    intenMap.set('bedroomLight_Intent', test);
    intenMap.set('onoff_switch_Intent', handleOnOffSwitch_map);
    intenMap.set('check_switch_Intent', handleCheckStatusSwitch_map);
    //intenMap.set('onoff_switch_Intent', handleOnOffSwitch);
/*-----------------------------------------------Old Code--------------------------------------------------------------*/ 
    intenMap.set('bedroomLight_Intent', handleBedroomLight_map);
    intenMap.set('livingroomLight_Intent', handleLivingroomLight_map);
    intenMap.set('fan_Intent', handleFan_map);
    intenMap.set('tv_Intent', handleTv_map);
/*---------------------------------------------------------------------------------------------------------------------*/ 
    //Intent map request
    agent.handleRequest(intenMap);

});
