# Plant Genesis
This project demonstrates the skills I gain during Resilient Coders 2020A bootcamp. 

This is a web application displaying real time data of the temperature and humidity of a DHT11 sensor and displays those reading in daily, weekly and monthly charts. 

![alt text](/misc/plant_genesis_img.png "Plant Genesis Main Page")


## How It's Made

**Tech used**: 
 - **Software:** HTML5, CSS, Javascript, Node.js, MongoDB, Passport, Express.js, Socket.io
 
  - **Hardware:** Raspberry Pi 3 (Model B), DHT11 Temperature + Humidity sensor
  
## Installation

1. Clone repo
2. run `npm install`

## Usage

1. run `node server.js`
2. Navigate to `"your.local.IP.address":8180`

## Updates

- **4/17/2020:** Have some basic functionality on the site. There a few bugs that need to be worked through. I still need to figure out how to take a sample of the ongoing data coming from the raspberry pi on the server-side instead of the client. Also added another library, Charts.Js  to display the temperature averages in a more elegant way. 

- **3/29/2020:** Was able to install Node.js, and the DTHTll sensor package on the RPI3 and read the sensors values and on the console. Also drafted out how the website, database, and device will connect to one another.

## References

- [Node.js RPI-DHT11 package](https://www.npmjs.com/package/node-dht-sensor)

- [Socket.io](https://socket.io/)

- [Socket.io Documentation](https://github.com/socketio/socket.io/tree/master/docs)

- [Chart.js](https://www.chartjs.org/)

- [Raspberry Pi 3 Model B (2015)](https://www.adafruit.com/product/3055)

- [Raspbian Installation](https://www.raspberrypi.org/documentation/installation/installing-images/)

- [Raspberry Pi Setup with Node.js,Express,and MongoDB](https://www.instructables.com/id/How-to-Build-a-Website-on-a-Raspberry-Pi-With-Node/)

- [DHT11 data sheet](https://components101.com/dht11-temperature-sensor)

- [NodeSource](https://nodesource.com/)

`


