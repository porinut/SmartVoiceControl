/* eslint-disable consistent-return */
'use strict';
var moment = require('moment');
const globalFunction = require('./globalFunction');


module.exports = {
    handleCheckOpeningTime: function(agent,database) {
        console.log('------------------------------------------------------');
        console.log('Function handleCheckOpeningTime is running..')
        var number = agent.parameters['number'];
        var openingTime = agent.parameters['openingTime_entity'].toString().replace(/^.*(\d+).*$/i,'$1');
        var now = moment();
        var formatted = now.format('YYYY-MM-DDTHH:mm:ss-07:00');
        var timeNow = moment.utc(formatted).format('HH:mm:ss DD-MM-YYYY');

        globalFunction.checkNumber(agent,number); //Check Number 1,2,3,4
        try {
                if(openingTime === '1'){
                    return database.ref('switchStatus/switch'+number).once('value').then((snapshot) => {
                        if (!snapshot || !snapshot.exists) {
                            throw new Error("snapshot doesn't exist");
                        }   
                        var status = snapshot.child('status').val();
                        var timestamp = snapshot.child('timestamp').val();
                        var timestampFormattted = moment.utc(timestamp).format('HH:mm:ss DD-MM-YYYY');

                        console.log('Retrieve child ok => '+status+'->'+timestamp);
                        if(status === '1' || status === 1){
                            agent.add('สวิตช์'+number+'เปิดอยู่ค่ะ');
                            agent.add('เปิดเมื่อ '+timestampFormattted);
                            console.log('Responsed to dialogflow => '+status+'->'+timestampFormattted);
                        }else if (status === '0' || status === 0){
                            agent.add('สวิตช์'+number+'ปิดอยู่ค่ะ');
                            agent.add('ปิดเมื่อ '+timestampFormattted);
                            console.log('Responsed to dialogflow => '+status+'->'+timestampFormattted);
                        }else{
                             console.log('something error');
                            agent.add('มีบางอย่างผิดพลาด โปรดลองใหม่อีกครั้งค่ะ');
                        }
                        console.log('Function handleCheckOpeningTime is run successfull'); 
                        console.log('------------------------------------------------------'); 
                        return true;
                    });
                }else if(openingTime === '2'){
                    return database.ref('switchStatus/switch'+number).once('value').then((snapshot) => {
                        if (!snapshot || !snapshot.exists) {
                            throw new Error("snapshot doesn't exist");
                        }   
                        var status = snapshot.child('status').val();
                        var timestamp = snapshot.child('timestamp').val();
                        console.log('Retrieve child ok => '+status+'->'+timestamp);
                        var timestampFormattted = moment.utc(timestamp).format('HH:mm:ss DD-MM-YYYY');

                        var ms = moment(timeNow,"HH:mm:ss DD-MM-YYYY").diff(moment(timestampFormattted,"HH:mm:ss DD-MM-YYYY"));
                        var d = moment.duration(ms);
                        var s = Math.floor(d.asHours()) + moment.utc(ms).format(" ชั่วโมง m นาที s วินาที");
                        
                        if(status === '1' || status === 1){
                            agent.add('สวิตช์'+number+'เปิดอยู่ค่ะ');
                            console.log('Time Now =>'+timeNow);
                            console.log('Timestamp =>'+timestampFormattted);
                            console.log('Time difference =>'+s);
                            agent.add('เปิดมาแล้ว '+s);
                            console.log('Responsed to dialogflow => '+s);
                        }else if (status === '0' || status === 0){
                            agent.add('สวิตช์'+number+'ปิดอยู่ค่ะ');
                            console.log('Time Now =>'+timeNow);
                            console.log('Timestamp'+timestampFormattted);
                            console.log('Time difference =>'+s);
                            agent.add('ปิดมาแล้ว '+s);
                            console.log('Responsed to dialogflow => '+s);
                        }else{
                            console.log('something error');
                            agent.add('มีบางอย่างผิดพลาด โปรดลองใหม่อีกครั้งค่ะ');
                        }
                        console.log('Function handleCheckOpeningTime is run successfull'); 
                        console.log('------------------------------------------------------'); 
                        return true;
                    });
                }else{
                    console.log('var Opening error');
                    return agent.add('มีบางอย่างผิดพลาด โปรดลองใหม่อีกครั้งค่ะ');
                }
        
         
        } catch (ex) {
            console.log('Dialog Error!!');
            console.log('Database update error! : '+ex);
            return agent.add('มีบางอย่างผิดพลาด กรุณาลองใหม่อีกครั้งค่ะ')
        }

    }
}
