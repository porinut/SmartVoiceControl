'use strict';

const functions = require('firebase-functions');
const { WebhookClient } = require('dialogflow-fulfillment');
var admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);
var database = admin.database();
//Import fucntion
const onOffSwitch = require('./onOffSwitch');
const checkStatus = require('./checkStatus');
const controlRoom = require('./controlRoom');
const openingTime = require('./openingTime');
const setTimer = require('./setTimer');
const calulator = require('./calculator');
const youtube = require('./youtube');

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    const agent = new WebhookClient({ request, response });
    console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

    /*-----------------------------------------------FEATURE--------------------------------------------------------------*/

    function handleOnOffSwitch_map(agent) {
        onOffSwitch.handleOnOffSwitch(agent, database);
    }

    function handleCheckStatusSwitch_map(agent) {
        return checkStatus.handleCheckStatusSwitch(agent, database);
    }

    function handleCheckOpeningTime_map(agent) {
        return openingTime.handleCheckOpeningTime(agent, database);
    }

    function handleSetTimer_map(agent) {
        setTimer.handleSetTimer(agent, database);
    }

    function handleCalculator_map(agent) {
        calulator.handleCalculate(agent);
    }

    function handleYoutube_map(agent) {
        youtube.playYoutube(agent);
    }

    /*---------------------------------------------------------------------------------------------------------------------*/

    /*-------------------------------------------Old Code-----------------------------------------------*/
    function handleBedroomLight_map(agent) {
        controlRoom.handleBedroomLight(agent, database);
    }

    function handleLivingroomLight_map(agent) {
        controlRoom.handleLivingroomLight(agent, database);
    }

    function handleFan_map(agent) {
        controlRoom.handleFan(agent, database);
    }

    function handleTv_map(agent) {
        controlRoom.handleTv(agent, database);
    }

    /*---------------------------------------------------------------------------------------------------*/
    /*Intent Mapping (intent Name, function name)*/
    let intenMap = new Map();

    intenMap.set('onoff_switch_Intent', handleOnOffSwitch_map);
    intenMap.set('check_status_Intent', handleCheckStatusSwitch_map);
    intenMap.set('check_opening_Intent', handleCheckOpeningTime_map);
    intenMap.set('set_timer_Intent', handleSetTimer_map);
    intenMap.set('calculator_Intent', handleCalculator_map);
    intenMap.set('youtube_Intent', handleYoutube_map);

    intenMap.set('bedroomLight_Intent', handleBedroomLight_map);
    intenMap.set('livingroomLight_Intent', handleLivingroomLight_map);
    intenMap.set('fan_Intent', handleFan_map);
    intenMap.set('tv_Intent', handleTv_map);
    /*-----------------------------------------------------------------------------------------------------*/
    //Intent map request
    agent.handleRequest(intenMap);

});


