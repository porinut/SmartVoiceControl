'use strict';

module.exports = {
        addResponse: function (agent,status,voice_0,voice_1) {
        var default_response = 'มีอะไรให้รับใช้คะ';
            switch(status){
                case '0':
                    agent.add(voice_0);
                    break;
                case '1':
                    agent.add(voice_1);
                    break;
                case '88':
                    agent.add(voice_0);
                    break;
                default: 
                    agent.add(default_response);
                    break;
            }

    }
}