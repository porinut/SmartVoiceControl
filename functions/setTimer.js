/* eslint-disable consistent-return */
'use strict';
var moment = require('moment');
const firebaseModel = require('./firebase_model');
const dialogflowModel = require('./dialogflow_model')

function timeFuture(time,date){
    //Date and Time formatted for convert to milliSec
    var timeUTC = moment(time).format('YYYY-MM-DDTHH:mm:ss-07:00');
    var dateUTC = moment(date).format('YYYY-MM-DDTHH:mm:ss-07:00');
    var dateFormatted = moment.utc(dateUTC).format('YYYY-MM-DD');
    var timeFormatted = moment.utc(timeUTC).format('HH:mm:ss');
    var catTime = dateFormatted+'T'+timeFormatted;
    return catTime;
}

function differenceTime(timeNow,timeFuture){
    var seconds = moment(timeFuture).diff(timeNow,'seconds');
    var ms;
    if(seconds>0){
        ms = seconds*1000;
    }else{
        ms = 0;
    }
    return ms;
}

function timeResDialogflow(time){
    var timeUTC = moment(time).format('YYYY-MM-DDTHH:mm:ss-07:00');
    var timeResponse = moment.utc(timeUTC).format('HH:mm:ss');
    return timeResponse;
}

function dateResDialogflow(date){
    //Date formatted for response to dialogflow
    var dateUTC = moment(date).format('YYYY-MM-DDTHH:mm:ss-07:00');
    var dateResponse = moment.utc(dateUTC).format('DD-MM-YYYY');
    return dateResponse;
}

function timeNow(){
    //Time now for convert to milliSec
    var now = moment();
    var formatted = now.format('YYYY-MM-DDTHH:mm:ss-07:00');
    var timeNow = moment.utc(formatted).format('YYYY-MM-DDTHH:mm:ss');
    return timeNow;
}

module.exports = {

    handleSetTimer: function(agent,database) {
        console.log('------------------------------------------------------');
        console.log('Function handleSetTimer is running..');
        var number = agent.parameters['number'];
        var time = agent.parameters['time'];
        var date = agent.parameters['date'];
        var setTimer = agent.parameters['setTimer_entity'];

        if(number !== '' && number < 1 || number !== '' && number > 4){
            console.log('Number switch error');
            console.log('Responsed to dialogflow');
            return agent.add('ไม่มีสวิตช์นี้ค่ะ โปรดลองใหม่อีกครั้งค่ะ');
        }
        if(number === '' && setTimer === '0'){
            setTimer = '00';
        }else if(number === '' && setTimer === '1'){
            setTimer = '11';
        }

        try {
            var ms = 0;
            console.log('Time now => '+timeNow());
                if(date !== ''){
                    console.log('Time future => '+timeFuture(time,date));
                    ms = differenceTime(timeNow(),timeFuture(time,date));
                }else{
                    date = moment.now();
                    console.log('date is empty then date = time now =>'+date);
                    console.log('Time future => '+timeFuture(time,date));
                    ms = differenceTime(timeNow(),timeFuture(time,date)); 
                }
                if(ms !== 0){
                    var voice_0 = "ตั้งเวลาปิดสวิตช์ "+number+" เวลา "+timeResDialogflow(time)+" วันที่ "+dateResDialogflow(date)+" เรียบร้อยแล้วค่ะ";
                    var voice_1 = "ตั้งเวลาเปิดสวิตช์ "+number+" เวลา "+timeResDialogflow(time)+" วันที่ "+dateResDialogflow(date)+" เรียบร้อยแล้วค่ะ";
                    var voice_00 = "ตั้งเวลาปิดสวิตช์ทั้งหมดเวลา " +timeResDialogflow(time)+" วันที่ "+dateResDialogflow(date)+" เรียบร้อยแล้วค่ะ";
                    var voice_11 = "ตั้งเวลาเปิดสวิตช์ทั้งหมดเวลา " +timeResDialogflow(time)+" วันที่ "+dateResDialogflow(date)+" เรียบร้อยแล้วค่ะ";
                    console.log('Case turn of');
                    console.log('Difference Time => '+ ms);
                    if(setTimer === 1 || setTimer === '1' || setTimer === 0 || setTimer === '0'){
                        
                        setTimeout(() => {
                            firebaseModel.updateFirebase(database,number,setTimer);
                            console.log('Updated Firebase! at '+timeNow());
                        }, ms);
                        dialogflowModel.addResponse(agent,setTimer,voice_0,voice_1);
                        console.log('Set timer success');
                        //agent.add('ตั้งเวลาปิดสวิตช์ '+number+' เวลา '+timeResDialogflow(time)+' วันที่ '+dateResDialogflow(date)+' เรียบร้อยแล้วค่ะ');
                        console.log('Reponsed to dialogflow !');

                    }else if(setTimer === 11 || setTimer === '11' || setTimer === '00'){
                        var setT = '0';
                        if(setTimer === 11 || setTimer === '11'){
                            setT = '1';
                        }
                        console.log('setTime ='+setT);
                        setTimeout(() => {
                                firebaseModel.updateFirebase(database,'1',setT);
                                firebaseModel.updateFirebase(database,'2',setT);
                                firebaseModel.updateFirebase(database,'3',setT);
                                firebaseModel.updateFirebase(database,'4',setT);
                                console.log('Updated Firebase! at '+timeNow());
                        }, ms);
                        dialogflowModel.addResponse(agent,setT,voice_00,voice_11);
                        console.log('Set timer success');
                        //agent.add('ตั้งเวลาปิดสวิตช์ '+number+' เวลา '+timeResDialogflow(time)+' วันที่ '+dateResDialogflow(date)+' เรียบร้อยแล้วค่ะ');
                        console.log('Reponsed to dialogflow !');
                    }else{
                        console.log('Difference Error');
                        return agent.add('มีบางอย่างผิดพลาด กรุณาลองใหม่อีกครั้งค่ะ')
                    }
                   
                }else{
                    console.log('Difference Error');
                    return agent.add('เวลาไม่ถูกต้องค่ะ กรุณาลองใหม่อีกครั้งค่ะ')
                }
            
            console.log('------------------------------------------------------');
            console.log('Function handleSetTimer is run successfull');
        } catch (ex) {
            console.log('Database update error! : '+ex);
        }
    }
}




/*
                    switch(setTimer){
                        case '0':
                            console.log('Case turn of');
                            console.log('Difference Time => '+ ms);
                
                            setTimeout(() => {
                                firebaseModel.updateFirebase(database,number,setTimer);
                                console.log('Updated Firebase! at '+timeNow());
                            }, ms);

                            console.log('Set timer success');
                            agent.add('ตั้งเวลาปิดสวิตช์ '+number+' เวลา '+timeResDialogflow(time)+' วันที่ '+dateResDialogflow(date)+' เรียบร้อยแล้วค่ะ');
                            console.log('Reponsed to dialogflow !');
                            break;
                        case '1':
                            console.log('Case turn on');
                            console.log('Difference Time =>'+ ms);
                       
                            setTimeout(() => {
                                firebaseModel.updateFirebase(database,number,setTimer);
                                console.log('Updated Firebase! at '+timeNow());
                            }, ms);
                            console.log('Set timer success');
                            agent.add('ตั้งเวลาเปิดสวิตช์ '+number+' เวลา '+timeResDialogflow(time)+' วันที่ '+dateResDialogflow(date)+' เรียบร้อยแล้วค่ะ');
                            console.log('Reponsed to dialogflow !');
                            break; 

                        case '00':
                            console.log('Case turn off all');
                            console.log('Difference Time => '+ ms);
                    
                            setTimeout(() => {
                                firebaseModel.updateFirebase(database,1,0);
                                firebaseModel.updateFirebase(database,2,0);
                                firebaseModel.updateFirebase(database,3,0);
                                firebaseModel.updateFirebase(database,4,0);
                                console.log('Updated Firebase! at '+timeNow());
                            }, ms);
                            console.log('Set timer success');
                            agent.add('ตั้งเวลาปิดสวิตช์ ทั้งหมด'+' เวลา '+timeResDialogflow(time)+' วันที่ '+dateResDialogflow(date)+' เรียบร้อยแล้วค่ะ');
                            console.log('Reponsed to dialogflow !');
                            break;

                        case '11':
                            console.log('Case turn on all');
                            console.log('Difference Time => '+ ms);
                    
                            setTimeout(() => {
                                firebaseModel.updateFirebase(database,1,1);
                                firebaseModel.updateFirebase(database,2,1);
                                firebaseModel.updateFirebase(database,3,1);
                                firebaseModel.updateFirebase(database,4,1);
                                console.log('Updated Firebase! at '+timeNow());
                            }, ms);
                            console.log('Set timer success');
                            agent.add('ตั้งเวลาเปิดสวิตช์ ทั้งหมด'+' เวลา '+timeResDialogflow(time)+' วันที่ '+dateResDialogflow(date)+' เรียบร้อยแล้วค่ะ');
                            console.log('Reponsed to dialogflow !');
                            break;
                        default: 
                            agent.add('มีบางอย่างผิดพลาด กรุณาลองใหม่อีกครั้งค่ะ');
                            console.log('Out of case!');
                            break;
                    }

    */