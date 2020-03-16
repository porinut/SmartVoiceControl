'use strict';
const firebaseModel = require('./firebase_model');
const dialogflowModel = require('./dialogflow_model');
const globalFunction = require('./globalFunction');

module.exports = {
    handleOnOffSwitch : function (agent,database) {
        console.log('------------------------------------------------------');
        console.log('Function handleOnOffSwitch is running..');
        //Parameter name in dialogflow 
        var numberSwitch1 = agent.parameters['numberSwitch1'];
        var numberSwitch2 = agent.parameters['numberSwitch2']; 
        var statusSwitch1 = agent.parameters['statusSwitch1'].toString().replace(/^.*(\d+).*$/i,'$1');
        var statusSwitch2 = agent.parameters['statusSwitch2'].toString().replace(/^.*(\d+).*$/i,'$1');
        //var all = agent.parameters['allSwitch'];
        var allSwitch = agent.parameters['allSwitch'].toString().replace(/^.*(\d+).*$/i,'$1');
        var voiceSW1_0 = 'ปิดสวิตช์'+numberSwitch1+'แล้วค่ะ';
        var voiceSW1_1 = 'เปิดสวิตช์'+numberSwitch1+'แล้วค่ะ';
        var voiceSW2_0 = 'ปิดสวิตช์'+numberSwitch2+'แล้วค่ะ';
        var voiceSW2_1 = 'เปิดสวิตช์'+numberSwitch2+'แล้วค่ะ';


      
        try {
            //When command all switch
            if(allSwitch === '0' || allSwitch === 0 ){
                console.log('Condition if allSwitch === 0 ');   
                firebaseModel.updateFirebase(database,'1','0'); 
                firebaseModel.updateFirebase(database,'2','0');
                firebaseModel.updateFirebase(database,'3','0'); 
                firebaseModel.updateFirebase(database,'4','0');
                console.log('Updated firebase!'); 
                dialogflowModel.addResponse(agent,'0','ปิดสวิตช์ทั้งหมดแล้วค่ะ','เปิดสวิตช์ทั้งหมดแล้วค่ะ');
                console.log('Responsed to dialogflow!'); 
            }else if(allSwitch === '1' || allSwitch === 1){
                console.log('Condition if allSwitch === 1 '); 
                firebaseModel.updateFirebase(database,'1','1');    
                firebaseModel.updateFirebase(database,'2','1');    
                firebaseModel.updateFirebase(database,'3','1');    
                firebaseModel.updateFirebase(database,'4','1'); 
                console.log('Updated firebase!');    
                dialogflowModel.addResponse(agent,'1','ปิดสวิตช์ทั้งหมดแล้วค่ะ','เปิดสวิตช์ทั้งหมดแล้วค่ะ');
                console.log('Responsed to dialogflow!'); 
            }else{
                globalFunction.checkNumber(agent,numberSwitch1); //Check Number 1,2,3,4
                    //When command only one switch
                if(numberSwitch2 === ''){
                    if(numberSwitch1 > 0 && numberSwitch1 < 5){
                        firebaseModel.updateFirebase(database, numberSwitch1, statusSwitch1);
                        console.log('Updated firebase!');
                    }else{
                        statusSwitch1 = '0'; 
                        voiceSW1_0 = 'ไม่มีสวิตช์นี้ โปรดลองใหม่อีกครั้งค่ะ';        
                    }
                    dialogflowModel.addResponse(agent, statusSwitch1, voiceSW1_0, voiceSW1_1);
                    console.log('Responsed to dialogflow!'); 
                    
                    //When command two switch
                }else if(numberSwitch2 !== '' && statusSwitch2 === ''){
                    if(numberSwitch1 > 0 && numberSwitch1 < 5 && numberSwitch2 > 0 && numberSwitch2 < 5){
                        firebaseModel.updateFirebase(database, numberSwitch1, statusSwitch1);
                        dialogflowModel.addResponse(agent, statusSwitch1, voiceSW1_0, voiceSW1_1);
                        firebaseModel.updateFirebase(database, numberSwitch2, statusSwitch1);
                        dialogflowModel.addResponse(agent, statusSwitch1, voiceSW2_0, voiceSW2_1);
                        console.log('Responsed to dialogflow!'); 
                    }else{
                        statusSwitch1 = '0'; 
                        voiceSW1_0 = 'หมายเลขสวิตช์ไม่ถูกต้อง โปรดลองอีกครั้งค่ะ';  
                        dialogflowModel.addResponse(agent, statusSwitch1, voiceSW1_0, voiceSW1_0);
                        console.log('Responsed to dialogflow!'); 
                    }

                }else if(numberSwitch2 !== '' && statusSwitch2 !== ''){
                        if(numberSwitch1 > 0 && numberSwitch1 < 5 && numberSwitch2 > 0 && numberSwitch2 < 5){
                            firebaseModel.updateFirebase(database, numberSwitch1, statusSwitch1);
                            dialogflowModel.addResponse(agent, statusSwitch1, voiceSW1_0, voiceSW1_1);
                            firebaseModel.updateFirebase(database, numberSwitch2, statusSwitch2);
                            dialogflowModel.addResponse(agent, statusSwitch2, voiceSW2_0, voiceSW2_1);
                            console.log('Updated firebase!');
                            console.log('Responsed to dialogflow!'); 
                        }else{
                            statusSwitch1 = '0'; 
                            voiceSW1_0 = 'หมายเลขสวิตช์ไม่ถูกต้อง โปรดลองอีกครั้งค่ะ'; 
                            dialogflowModel.addResponse(agent, statusSwitch1, voiceSW1_0, voiceSW1_0);
                            console.log('Responsed to dialogflow!'); 
                        }
                    }
                }
                console.log('Function handleOnOffSwitch run success!');
                console.log('------------------------------------------------------');
            } catch (ex) {
                console.log('Dialog Error!!');
                console.log('Database update error! : '+ex);
                agent.add('มีบางอย่างผิดพลาด กรุณาลองใหม่อีกครั้งค่ะ')
            }
    }
}