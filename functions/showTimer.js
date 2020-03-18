/* eslint-disable consistent-return */
'use strict';
  
module.exports = {
    
        handleShowTimer: function (agent,database) {
            console.log('------------------------------------------------------');
            console.log('Function ShowTimer is running..');
            var number = agent.parameters['number'];
            if(number !== '' && number < 1 || number !== undefined && number > 4){
                return agent.add('หมายเลขสวิตช์ไม่ถูกต้อง โปรดลองอีกครั้งค่ะ');
            }
            try {
                if(number !== undefined && number !== '' && number !== null){
                    console.log('Case only one switch');
                    return database.ref('switchStatus/switch'+number).once('value').then((snapshot) => {
                        if (!snapshot || !snapshot.exists) {
                            throw new Error("snapshot doesn't exist");
                        }   
                        var timer = snapshot.child('timer').val();
                        console.log('Retrieve child ok => '+timer);
                        if(timer === true || timer === 'true'){
                            agent.add('สวิตช์ '+number+ ' มีการตั้งเวลาทำงานอยู่ค่ะ');  
                            console.log('Timer is setup');
                         }else{
                            agent.add('สวิตช์ '+number+ ' ไม่มีการตั้งเวลาค่ะ');
                            console.log('Timer is not setup');
                         }
                        console.log('Responsed to Dialogflow!');
                        console.log('Function ShowTimer is run successfull'); 
                        console.log('------------------------------------------------------'); 
                        return true;
                    });
                }else{
                    console.log('Case all switch');
                    return database.ref('switchStatus').once('value', (snapshot) => {
                        if (!snapshot || !snapshot.exists) {
                            throw new Error("snapshot doesn't exist");
                        }   
                        var on = [];
                        var count = 1;
                        snapshot.forEach((childSnapshot) => {
                            //var childKey = childSnapshot.key;
                            var childData = childSnapshot.child('timer').val();
                            //console.log('childData => '+childData);
                            console.log('Now varTimer : '+childData);
                            if(childData === true ||childData === 'true'){
                                console.log('Timer is setup');
                                on.push(count);
                             }
                             count++;
                        });
                        if(on.length===4){
                            agent.add('สวิตช์ทั้งหมดมีการตั้งเวลาอยู่ค่ะ');
                        }else{
                            agent.add('สวิตช์ '+on+' มีการตั้งเวลาอยู่ค่ะ');
                        }
                        console.log('Function ShowTimer is run successfull'); 
                        console.log('------------------------------------------------------'); 
                        return true;
                    });
                }
            } catch (error) {
                console.log('Dialog Error!!');
                console.log('Database update error! : '+error);
                return agent.add('มีบางอย่างผิดพลาด กรุณาลองใหม่อีกครั้งค่ะ');
            }
        }
        
        
}

