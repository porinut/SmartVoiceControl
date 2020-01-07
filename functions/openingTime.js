/* eslint-disable consistent-return */
'use strict';
var moment = require('moment');
var now = moment();
var formatted = now.format('YYYY-MM-DDTHH:mm:ss-07:00');
var timeNow= moment.utc(formatted).format('HH:mm:ss DD-MM-YYYY');

module.exports = {
    handleCheckOpeningTime: function(agent,database) {
        console.log('------------------------------------------------------');
        console.log('Function handleCheckOpeningTime is running..')
        var number = agent.parameters['number'];
        var openingTime = agent.parameters['openingTime_entity'];
        try {

            if(number !== '' && number > 0 && number < 5){
                if(openingTime === '1'){
                    return database.ref('switchStatus/switch'+number).once('value').then((snapshot) => {
                        if (!snapshot || !snapshot.exists) {
                            throw new Error("snapshot doesn't exist");
                        }   
                        var status = snapshot.child('status').val();
                        var timestamp = snapshot.child('timestamp').val();
                        console.log('Retrieve child ok => '+status+'->'+timestamp);
                        if(status === '1'){
                            agent.add('สวิตซ์'+number+'เปิดอยู่ค่ะ');
                            agent.add('เปิดเมื่อ '+timestamp);
                            console.log('Responsed to dialogflow => '+status+'->'+timestamp);
                        }else{
                            agent.add('สวิตซ์'+number+'ปิดอยู่ค่ะ');
                            agent.add('ปิดเมื่อ '+timestamp);
                            console.log('Responsed to dialogflow => '+status+'->'+timestamp);
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
                        if(status === '1'){
                            agent.add('สวิตซ์'+number+'เปิดอยู่ค่ะ');
                            agent.add('เปิดมาแล้ว ');
                            console.log('Responsed to dialogflow => '+status+'->'+timestamp);
                        }else{
                            agent.add('สวิตซ์'+number+'ปิดอยู่ค่ะ');
                            agent.add('ปิดมาแล้ว ');
                            console.log('Responsed to dialogflow => '+status+'->'+timestamp);
                        }
                        console.log('Function handleCheckOpeningTime is run successfull'); 
                        console.log('------------------------------------------------------'); 
                        return true;
                    });
                }else{
                    return agent.add('โปรดลองใหม่อีกครั้งค่ะ');
                }
            }else{   
                console.log('Number switch error');
                return agent.add('ไม่มีสวิซนี้ค่ะ โปรดลองใหม่อีกครั้งค่ะ');
            }
         
        } catch (ex) {
            console.log('Database update error! : '+ex);
        }

    }
}
