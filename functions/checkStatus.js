/* eslint-disable consistent-return */
'use strict';

module.exports = {
    handleCheckStatusSwitch: function(agent,database){
        console.log('------------------------------------------------------');
        console.log('Function handleCheckStatusSwitch is running..')
        var number = agent.parameters['number'];
        var checkStatus = agent.parameters['checkStatus_entity'];
        try {
            if(number !== '' && number < 1 || number !== '' && number > 4){
                console.log('Number switch error');
                console.log('Responsed to dialogflow');
                return agent.add('ไม่มีสวิซนี้ค่ะ โปรดลองใหม่อีกครั้งค่ะ');
            }
            if(checkStatus === '1' && number !== ''){
                console.log('Condition => checkStatus === 99 && number !== ');
                return database.ref('switchStatus/switch'+number).once('value').then((snapshot) => {
                    if (!snapshot || !snapshot.exists) {
                        throw new Error("snapshot doesn't exist");
                    }   
                    var data = snapshot.child('status').val();
                    console.log('Retrieve child ok => '+data);
                    if(data === '1'){
                        agent.add('สวิตซ์'+number+'เปิดอยู่ค่ะ');
                        console.log('Responsed to dialogflow => '+data);
                    }else{
                        agent.add('สวิตซ์'+number+'ปิดอยู่ค่ะ');
                        console.log('Responsed to dialogflow => '+data);
                    }
                    console.log('Function handleCheckStatusSwitch is run successfull'); 
                    console.log('------------------------------------------------------'); 
                    return true;
                });

            }else if(checkStatus === '1' && number === ''){
                console.log('Condition => checkStatus === 1 && number === ');
                return database.ref('switchStatus').once('value', (snapshot) => {
                    if (!snapshot || !snapshot.exists) {
                        throw new Error("snapshot doesn't exist");
                    }     
                    var count = 1;
                    snapshot.forEach((childSnapshot) => {
                        var childKey = childSnapshot.key;
                        var childData = childSnapshot.child('status').val();
                        console.log('childKey => '+childKey);
                        console.log('childData => '+childData);
                        if(childData === '1'){
                            agent.add('สวิตซ์'+count+'เปิดอยู่ค่ะ');
                            console.log('Responsed to dialogflow => '+childData);
                        }else{
                            agent.add('สวิตซ์'+count+'ปิดอยู่ค่ะ');
                            console.log('Responsed to dialogflow => '+childData);
                        }
                        count++;
                    });
                    console.log('Function handleCheckStatusSwitch is run successfull'); 
                    console.log('------------------------------------------------------'); 
                    return true;
                });
            }
           
        } catch (ex) {
            console.log('Database update error! : '+ex);
        }
    }
}
