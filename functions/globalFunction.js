'use strict';

module.exports = {
    checkNumber: function(agent,number) {

        if(number !== '' && number < 1 || number !== undefined && number > 4){
            console.log('Number switch error');
            console.log('Responsed to dialogflow');
            return agent.add('ไม่มีสวิตช์นี้ค่ะ โปรดลองใหม่อีกครั้งค่ะ');
        }else{
            return true;
        }
        
    }
}


