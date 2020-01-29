'use strict';

function evil(fn) {
    // eslint-disable-next-line no-new-func
    return new Function('return ' + fn)();
  }
  
module.exports = {
        // eslint-disable-next-line consistent-return
        handleCalculate: function (agent) {
            console.log('------------------------------------------------------');
            console.log('Function calculator is running..');
            //Parameter name in dialogflow 
            var txt = agent.parameters['any'];
            if( txt === undefined || txt === ''|| txt===null){return agent.add('มีบางอย่างผิดพลาด โปรดลองใหม่อีกครั้งค่ะ');}
            try {   
                var result = evil(txt.toString().replace(/[^-()\d/*+.]/g, ''));
                console.log(result);
                agent.add(txt.toString()+' = '+result);

            } catch (error) {
                console.log(error);
            }
            console.log('Function calculator run success');
            console.log('------------------------------------------------------');
    }
}

