'use strict';
var search = require('youtube-search');
const API_KEY = 'AIzaSyBI8_CMu07qFpmOPFjFj3WyUBEKDjY9BBQ';
const { Card }= require('dialogflow-fulfillment');

var opts = {
  maxResults: 1,
  order: 'viewCount',
  key: 'AIzaSyAyvDAESEPuudMgvipVGV5LwghhJJTOvFw'
};

module.exports = {
      playYoutube: function (agent) {
        console.log('------------------------------------------------------');
        console.log('Function playYoutube is running...');
       
        var query = agent.parameters['any'];
        var title = '';
        var image = '';
        var description = '';
        var url = '';
        var currentTime = new Date().getTime(); 

        // eslint-disable-next-line consistent-return
        search(query, opts, (err, results) => {
          if(err) return console.log(err);
          title = results[0].title;
          image = results[0].thumbnails.medium.url;
          description = results[0].description;
          url = results[0].link;
          console.log('title : '+title);
          console.log('image : '+image);
          console.log('des : '+description);
          console.log('url : '+url);
        });
        /*
        while (currentTime + 4500 >= new Date().getTime()) {
          if(currentTime + 4000 <= new Date().getTime()){
            console.log('Hello World');
            agent.add('Hello : '+title);
            break;
          }
        } */
        console.log('Function playYoutube run success!');
        console.log('------------------------------------------------------');
  }
}



/*
     agent.add(new Card({
              title: results[0].title,
              imageUrl: results[0].thumbnails.medium.url,
              text: results[0].description,
              buttonText: 'Open',
              buttonUrl: results[0].link
              })
            );

*/

  

