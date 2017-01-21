const speedTest = require('speedtest-net');

var schedule = require('node-schedule');
var fs = require('fs');
var endOfLine = require('os').EOL;

 
var j = schedule.scheduleJob('*/1 * * * *', function(){
  var startTime = new Date();
  const test = speedTest({maxTime: 5000});
  test.on('data', data => {
    var endTime = new Date();
    var outputData = {
      startTime: startTime,
      endTime: endTime,
      dlSpeed: data.speeds.download,
      ulSpeed: data.speeds.upload,
      myIp: data.client.ip,
      position: {
        lat: data.client.lat,
        lon: data.client.lon
      },
      isp: {
        name: data.client.isp,
        rating: data.client.isprating,
        avgdlspeed: data.client.ispdlavg,
        avgulspeed: data.client.ispulavg
      },
      server: {
        hostIp: data.server.host,
        location: data.server.location,
        distance: data.server.distance,
        sponsor: data.server.sponsor,
        id: data.server.id
      }
    }
    console.dir(outputData);
    fs.appendFile('log.txt', JSON.stringify(outputData)+endOfLine, encoding='utf8', function (err) {
        if (err) throw err;
    });
  });
 
  test.on('error', err => {
    fs.appendFile('log.txt', JSON.stringify(err)+endOfLine, encoding='utf8', function (err) {
        if (err) throw err;
    });
  });
});

