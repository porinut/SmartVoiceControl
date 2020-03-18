/* eslint-disable consistent-return */
'use strict';

function updateTimer(database,numberSwitch,timer){
    console.log('update varTimer : '+timer);
    database.ref('switchStatus/'+'switch'+numberSwitch).update({
        timer: timer
    });
}


module.exports = {

    handleCancelSetTimer: function(agent,database) {
        console.log('------------------------------------------------------');
        console.log('Function handleCancelSetTimer is running..');
        var number = agent.parameters['number'];
        var allSwitch = agent.parameters['allSwitch'];
        var voice_0 = "ยกเลิกตั้งเวลาสวิตช์ "+number+" เรียบร้อยแล้วค่ะ";
        var voice_00 = "ยกเลิกตั้งเวลาทั้งหมดเวลาเรียบร้อยแล้วค่ะ";
        if(number !== '' && number < 1 || number !== undefined && number > 4){
            return agent.add('หมายเลขสวิตช์ไม่ถูกต้อง โปรดลองอีกครั้งค่ะ');
        }
        try {
            if(number === '' && number === undefined && allSwitch === true ){
                console.log('Case all switch');
                console.log('Update varTimer in Firebase');
                updateTimer(database,1,false);
                updateTimer(database,2,false);
                updateTimer(database,3,false);
                updateTimer(database,4,false);
                console.log('Add Response to Dialogflow');
                agent.add(voice_00);
            }else {
                console.log('Case only one switch');
                console.log('Update varTimer in Firebase');
                updateTimer(database,number,false);
                console.log('Add Response to Dialogflow');
                agent.add(voice_0);
            }
 
        console.log('------------------------------------------------------');
        console.log('Function handleSetTimer is run successfull');
        } catch (ex) {
            console.log('Dialog Error!!');
            console.log('Database update error! : '+ex);
            return agent.add('มีบางอย่างผิดพลาด กรุณาลองใหม่อีกครั้งค่ะ')
        }
    }
}
