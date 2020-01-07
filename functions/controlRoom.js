'use strict';
const firebaseModel = require('./firebase_model');
const dialogflowModel = require('./dialogflow_model');

module.exports = {
    handleBedroomLight : function (agent,database) {
        var numberSwitch = '1';
        var status = agent.parameters['bedroomLight'];
        try {
            firebaseModel.updateFirebase(database,numberSwitch,status);
            dialogflowModel.addResponse(agent,status,'ปิดไฟห้องนอนแล้วเด้อ','เปิดไฟห้องนอนแล้วค่ะ');
        } catch (ex) {
            console.log('Database update error! : '+ex);
        }
    },
    handleLivingroomLight : function (agent,database) {
        var numberSwitch = '2';
        var status = agent.parameters['livingroomLight'];
        try {
            firebaseModel.updateFirebase(database,numberSwitch,status);
            dialogflowModel.addResponse(agent,status,'ปิดไฟห้องนั่งเล่นแล้วค่ะ','เปิดไฟห้องนั่งเล่นแล้วค่ะ');
        } catch (ex) {
            console.log('Database update error! : '+ex);
        }
    },
    handleFan : function (agent,database) {
        var numberSwitch = '3';
        var status = agent.parameters['fan'];
        try {
            firebaseModel.updateFirebase(database,numberSwitch,status);
            dialogflowModel.addResponse(agent,status,'ปิดพัดลมแล้วค่ะ','เปิดพัดลมแล้วค่ะ');
        } catch (ex) {
            console.log('Database update error! : '+ex);
        }
    },
    handleTv : function (agent,database) {
        var numberSwitch = '4';
        var status = agent.parameters['tv'];
        try {
            firebaseModel.updateFirebase(database,numberSwitch,status);
            dialogflowModel.addResponse(agent,status,'ปิดทีวีแล้วค่ะ','เปิดทีวีแล้วค่ะ');
        } catch (ex) {
            console.log('Database update error! : '+ex);
        }
    }
     
}