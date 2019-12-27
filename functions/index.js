/* eslint-disable no-empty */
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
/*-----------------------------------------------Function--------------------------------------------------------------*/ 
    //function Handle Switch
    function handleSwitch(agent){
        //Parameter name in dialogflow 
        var numberSwitch1 = agent.parameters['numberSwitch1'];
        var numberSwitch2 = agent.parameters['numberSwitch2']; 
        var statusSwitch1 = agent.parameters['statusSwitch1'];
        var statusSwitch2 = agent.parameters['statusSwitch2'];
        var allSwitch = agent.parameters['allSwitch'];
        var voiceSW1_0 = 'ปิดสวิตซ์'+numberSwitch1+'แล้วค่ะ';
        var voiceSW1_1 = 'เปิดสวิตซ์'+numberSwitch1+'แล้วค่ะ';
        var voiceSW2_0 = 'ปิดสวิตซ์'+numberSwitch2+'แล้วค่ะ';
        var voiceSW2_1 = 'เปิดสวิตซ์'+numberSwitch2+'แล้วค่ะ';
        
        try {
                //When command all switch
                if(allSwitch === '0'){
                    firebaseModel.updateFirebase(database,'1','0');    
                    firebaseModel.updateFirebase(database,'2','0');    
                    firebaseModel.updateFirebase(database,'3','0');    
                    firebaseModel.updateFirebase(database,'4','0');     
                    dialogflowModel.addResponse(agent,'0','ปิดสวิตซ์ทั้งหมดแล้วค่ะ','เปิดสวิตซ์ทั้งหมดแล้วค่ะ');
                }else if(allSwitch === '1'){
                    firebaseModel.updateFirebase(database,'1','1');    
                    firebaseModel.updateFirebase(database,'2','1');    
                    firebaseModel.updateFirebase(database,'3','1');    
                    firebaseModel.updateFirebase(database,'4','1');    
                    dialogflowModel.addResponse(agent,'1','ปิดสวิตซ์ทั้งหมดแล้วค่ะ','เปิดสวิตซ์ทั้งหมดแล้วค่ะ');
                }else{
                    //When command only one switch
                    if(numberSwitch2 === ''){
                        if(numberSwitch1 > 0 && numberSwitch1 < 5){
                            firebaseModel.updateFirebase(database, numberSwitch1, statusSwitch1);
                        }else{
                            statusSwitch1 = '0'; 
                            voiceSW1_0 = 'ไม่มีสวิตซ์นี้ โปรดลองใหม่อีกครั้งค่ะ';        
                        }
                        dialogflowModel.addResponse(agent, statusSwitch1, voiceSW1_0, voiceSW1_1);
                    //When command two switch
                    }else if(numberSwitch2 !== '' && statusSwitch2 === ''){
                        if(numberSwitch1 > 0 && numberSwitch1 < 5 && numberSwitch2 > 0 && numberSwitch2 < 5){
                            firebaseModel.updateFirebase(database, numberSwitch1, statusSwitch1);
                            dialogflowModel.addResponse(agent, statusSwitch1, voiceSW1_0, voiceSW1_1);
                            firebaseModel.updateFirebase(database, numberSwitch2, statusSwitch1);
                            dialogflowModel.addResponse(agent, statusSwitch1, voiceSW2_0, voiceSW2_1);
                        }else{
                            statusSwitch1 = '0'; 
                            voiceSW1_0 = 'หมายเลขสวิตซ์ไม่ถูกต้อง โปรดลองอีกครั้งค่ะ';  
                            dialogflowModel.addResponse(agent, statusSwitch1, voiceSW1_0, voiceSW1_0);
                        }

                    }else if(numberSwitch2 !== '' && statusSwitch2 !== ''){
                        if(numberSwitch1 > 0 && numberSwitch1 < 5 && numberSwitch2 > 0 && numberSwitch2 < 5){
                            firebaseModel.updateFirebase(database, numberSwitch1, statusSwitch1);
                            dialogflowModel.addResponse(agent, statusSwitch1, voiceSW1_0, voiceSW1_1);
                            firebaseModel.updateFirebase(database, numberSwitch2, statusSwitch2);
                            dialogflowModel.addResponse(agent, statusSwitch2, voiceSW2_0, voiceSW2_1);
                        }else{
                            statusSwitch1 = '0'; 
                            voiceSW1_0 = 'หมายเลขสวิตซ์ไม่ถูกต้อง โปรดลองอีกครั้งค่ะ'; 
                            dialogflowModel.addResponse(agent, statusSwitch1, voiceSW1_0, voiceSW1_0);
                        }
                    }
                }
            } catch (ex) {
                console.log('Database update error! : '+ex);
            }
    }
/*-----------------------------------------------Old Code--------------------------------------------------------------*/ 
    function handleBedroomLight(agent){
        var numberSwitch = '1';
        var status = agent.parameters['bedroomLight'];
        try {
            firebaseModel.updateFirebase(database,numberSwitch,status);
            dialogflowModel.addResponse(agent,status,'ปิดไฟห้องนอนแล้วค่ะ','เปิดไฟห้องนอนแล้วค่ะ');
        } catch (ex) {
            console.log('Database update error! : '+ex);
        }
    }

    function handleLivingroomLight(agent){
        var numberSwitch = '2';
        var status = agent.parameters['livingroomLight'];
        try {
            firebaseModel.updateFirebase(database,numberSwitch,status);
            dialogflowModel.addResponse(agent,status,'ปิดไฟห้องนั่งเล่นแล้วค่ะ','เปิดไฟห้องนั่งเล่นแล้วค่ะ');
        } catch (ex) {
            console.log('Database update error! : '+ex);
        }
    }

    function handleFan(agent){
        var numberSwitch = '3';
        var status = agent.parameters['fan'];
        try {
            firebaseModel.updateFirebase(database,numberSwitch,status);
            dialogflowModel.addResponse(agent,status,'ปิดพัดลมแล้วค่ะ','เปิดพัดลมแล้วค่ะ');
        } catch (ex) {
            console.log('Database update error! : '+ex);
        }
    }

    function handleTv(agent){
        var numberSwitch = '4';
        var status = agent.parameters['tv'];
        try {
            firebaseModel.updateFirebase(database,numberSwitch,status);
            dialogflowModel.addResponse(agent,status,'ปิดทีวีแล้วค่ะ','เปิดทีวีแล้วค่ะ');
        } catch (ex) {
            console.log('Database update error! : '+ex);
        }
    }
/*---------------------------------------------------------------------------------------------------------------------*/ 

    //Intent Mapping (intent Name, function name)
    let intenMap = new Map();
    intenMap.set('switch_Intent', handleSwitch);

/*-----------------------------------------------Old Code--------------------------------------------------------------*/ 
    intenMap.set('bedroomLight_Intent', handleBedroomLight);
    intenMap.set('fan_Intent', handleFan);
    intenMap.set('livingroomLight_Intent', handleLivingroomLight);
    intenMap.set('tv_Intent', handleTv);
/*---------------------------------------------------------------------------------------------------------------------*/ 
    //Intent map request
    agent.handleRequest(intenMap);

});
