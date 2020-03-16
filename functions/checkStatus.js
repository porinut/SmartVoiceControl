/* eslint-disable consistent-return */
'use strict';
const globalFunction = require('./globalFunction');

module.exports = {
    handleCheckStatusSwitch: function(agent,database){
        console.log('------------------------------------------------------');
        console.log('Function handleCheckStatusSwitch is running..')
        var number = agent.parameters['number'];
        var checkStatus = agent.parameters['checkStatus_entity'].toString();

        globalFunction.checkNumber(agent,number); //Check Number 1,2,3,4
        try {
      
            if(checkStatus === '1'  && number !== '' && number !== undefined && number !== null){
                console.log('Condition => checkStatus === 1 && number !== ');
                return database.ref('switchStatus/switch'+number).once('value').then((snapshot) => {
                    if (!snapshot || !snapshot.exists) {
                        throw new Error("snapshot doesn't exist");
                    }   
                    var data = snapshot.child('status').val();
                    console.log('Retrieve child ok => '+data);
                    if(data === '1' || data === 1){
                        agent.add('สวิตช์'+number+'เปิดอยู่ค่ะ');
                        console.log('Responsed to dialogflow => '+data);
                    }else{
                        agent.add('สวิตช์'+number+'ปิดอยู่ค่ะ');
                        console.log('Responsed to dialogflow => '+data);
                    }
                    console.log('Function handleCheckStatusSwitch is run successfull'); 
                    console.log('------------------------------------------------------'); 
                    return true;
                });

            }else if(checkStatus === '1' && number === '' || number === undefined || number === null){
                console.log('Condition => checkStatus === 1 && number === ');
                return database.ref('switchStatus').once('value', (snapshot) => {
                    if (!snapshot || !snapshot.exists) {
                        throw new Error("snapshot doesn't exist");
                    }
                    
                    var count = 1;
                    var on = [];
                    var off = [];
                    snapshot.forEach((childSnapshot) => {
                        var childKey = childSnapshot.key;
                        var childData = childSnapshot.child('status').val();
                        console.log('childKey => '+childKey);
                        console.log('childData => '+childData);
                        if(childData === '1' || childKey === 1){
                            on.push(count);
                            console.log('Array on pushed! '+count);
                          
                        }else if(childData === '0' || childKey === 0){
                            off.push(count);
                            console.log('Array off pushed! '+count);
                        }
                        count++;
                    });
                    var res1 = '';
                    var res2 = '';
                    if(on.length === 0 || on === []){
                        res1 = 'สวิตช์ '+off+ ' ปิดอยู่ค่ะ'; 
                    }else if (off.length === 0 || off === []){
                        res1 = 'สวิตช์ '+on+ ' เปิดอยู่ค่ะ';
                    }else {
                        res1 = 'สวิตช์ '+on+ ' เปิดอยู่ค่ะ';
                        res2 = 'สวิตช์ '+off+ ' ปิดอยู่ค่ะ';
                        console.log('Length on = '+on.length);
                        console.log('Length off = '+off.length)
                    }
        
                    agent.add(res1);
                    console.log('Responsed to dialogflow => '+res1);
                    if(res2 !== ''){
                        agent.add(res2);
                        console.log('Responsed to dialogflow => '+res2);
                    }
               
                    console.log('Function handleCheckStatusSwitch is run successfull'); 
                    console.log('------------------------------------------------------'); 
                    return true;
                });
            }
           
        } catch (ex) {
            console.log('Dialog Error!!');
            console.log('Database update error! : '+ex);
            return agent.add('มีบางอย่างผิดพลาด กรุณาลองใหม่อีกครั้งค่ะ')
        }
    }
}
