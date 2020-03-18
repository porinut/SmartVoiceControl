'use strict';
const globalFunction = require('./globalFunction');

function handleTimer(database,number){
    console.log('handleTimer...')
    database.ref('switchStatus/switch'+number).once('value').then((snapshot) => {
        if (!snapshot || !snapshot.exists) {
            throw new Error("snapshot doesn't exist");
        }   
        var timer = snapshot.child('timer').val();
        console.log('Now varTimer : '+timer);
        if(timer === true){
           console.log('Timer is setup');
           //agent.add('สวิตช์ '+number+ ' มีการตั้งเวลาทำงานอยู่ค่ะ');
           return 1;
        }else{
           console.log('Timer is not setup');
           return 0;
           //agent.add('สวิตช์ '+number+ ' ไม่มีการตั้งเวลาค่ะ');
        }
    }).catch(error => { 
        console.log(error) 
    });
}
  
module.exports = {
    
        handleShowTimer: function (agent,database) {
            console.log('------------------------------------------------------');
            console.log('Function ShowTimer is running..');
            try {
                var number = agent.parameters['number'];
                if(number !== undefined || number !== '' || number !== null){
                    console.log('Case only one switch');
                    globalFunction.checkNumber(number);
                    console.log('Handle Timer return : '+handleTimer(database,number));
                    if(handleTimer(database,number) === 1 || handleTimer(database,number) === '1'){
                        agent.add('สวิตช์ '+number+ ' มีการตั้งเวลาทำงานอยู่ค่ะ');
                    }else{
                        agent.add('สวิตช์ '+number+ ' ไม่มีการตั้งเวลาค่ะ');
                    }
                    console.log('Responsed to Dialogflow!');
                }else{
                    console.log('Case all switch');
                    var count = handleTimer(agent,database,1)+handleTimer(agent,database,2)+handleTimer(agent,database,3)+handleTimer(agent,database,4);
                    if(count === 4){
                        agent.add('สวิตช์ทั้งหมดมีการตั้งเวลาอยู่ค่ะ');
                    }else{
                        var on = [];
                        for(var i=0;i<5;i++){
                            if( handleTimer(database,i) === 1){
                               on.push(i);
                               console.log('pushed!');
                            }
                        }
                        agent.add('สวิตช์ '+on+' มีการตั้งเวลาอยู่ค่ะ');
                    }
                }
                console.log('Function show timer run success');
                console.log('------------------------------------------------------');
            } catch (error) {
                console.log('Dialog Error!!');
                console.log('Database update error! : '+error);
                agent.add('มีบางอย่างผิดพลาด กรุณาลองใหม่อีกครั้งค่ะ')
            }
        
    }
}

