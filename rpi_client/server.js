var sensor = require('node-dht-sensor');
var socket = require('socket.io-client')('https://plant-genesis.herokuapp.com');   // dev-link http://192.168.1.153:8180

socket.on('connect', function(){
  console.log("Device Connected")
  });


setInterval(getTemp,1000)

function getTemp(){
sensor.read(11, 4, function(err, temperature, humidity) {
  if (!err) {
    
    var data ={
      device_id: "12345",
      temp:temperature,
      hum: humidity,
      //led_status = true
  
     }
  socket.emit('dht', data)
	  
console.log(`temp: ${temperature}°C, humidity: ${humidity}%`)
    
  }else{
	  
  console.log('Error: can not get data') 
}
});
}






