const socket = io.connect('https://192.168.1.153:8180')

const ctx = document.getElementById('dailyChart').getContext('2d');
const ctx2 = document.getElementById('weeklyChart').getContext('2d');
const ctx3 = document.getElementById('monthlyChart').getContext('2d');

const tempAvgDaily = document.querySelector('.hideDay').childNodes
const tempAvgMonthly = document.querySelector('.hideMonth').childNodes
const tempAvgWeekly = document.querySelector('.hideWeekly').childNodes
console.log(tempAvgMonthly[1].textContent)

const trash = document.querySelectorAll("#trash-btn")



// sends snapshot of temperature every hour

// this NEEDS TO BE ON Server side!!!!!

setInterval(() =>{

    let getTemp = document.querySelector('#temp').textContent
    const getDeviceId = document.querySelector('.getId').textContent
    console.log(getDeviceId)

    if (getTemp === 'N/A'){
            // do nothing 
            console.log("no data")
    }else{
        //send data to database
        fetch('/snapshot', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
             temp: getTemp,
             device_id: getDeviceId
        })
      })
   console.log("going to database")
    }

}, 3.6e6) /// every hour

//connect to socket
socket.on('connect', function(){
    if(socket.connect){
  console.log("Client connected")
  console.log(socket)
}
});

// Recieve Temperature and Humidity from sensor.
socket.on('dhtpage', function (data) {

    if (socket.connected){

  var temp = document.querySelector("#temp");
  var hum = document.querySelector("#hum");

  tempFah =  (Number(data.temp)*1.8) + 32 
  
  tempFah.toFixed(1)

  temp.textContent= tempFah.toFixed(1) + '°F' /// convert Celius to Fahrenheit *should be done on rpi_client instead 
  hum.textContent = data.hum  + '%'
}else{
    //nothing
}
     

  })

  



//// Daily Avg Chart.
var dailyChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: [{
            label: 'Daily Temperature',
            data: [tempAvgDaily[1].textContent, tempAvgDaily[3].textContent, tempAvgDaily[5].textContent, tempAvgDaily[7].textContent, tempAvgDaily[9].textContent, tempAvgDaily[11].textContent, tempAvgDaily[13].textContent, tempAvgDaily[13].textContent
        
        
        ], //// add db data here
            backgroundColor: [
                'rgba(113, 142, 3, 0.5)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

///weekly chart
var weeklyChart = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: ['Week 13','Week 14', 'Week 15', 'Week 16', 'Week 17', 'Week 18', 'Week 19'], // *change week dynamiclly
        datasets: [{
            label: 'Weekly Temperature',
            data: [ tempAvgWeekly[1].textContent, 
                    tempAvgWeekly[3].textContent, 
                    tempAvgWeekly[5].textContent, 
                    tempAvgWeekly[7].textContent, 
                    tempAvgWeekly[9].textContent, 
                    tempAvgWeekly[11].textContent, 
                    tempAvgWeekly[13].textContent, 
                    tempAvgWeekly[15].textContent, 
        
        ], //// add db data here
            backgroundColor: [
                'rgba(214, 224, 214, 0.5)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});


//Monthly Chart

var monthlyChart = new Chart(ctx3, {
    type: 'line',
    data: {
        labels: ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug','Sep','Oct','Nov','Dec'],
        datasets: [{
            label: 'Monthly Temperature',
            data: [tempAvgMonthly[1].textContent, 
                    tempAvgMonthly[3].textContent, 
                    tempAvgMonthly[5].textContent, 
                    tempAvgMonthly[7].textContent, 
                    tempAvgMonthly[9].textContent, 
                    tempAvgMonthly[11].textContent, 
                    tempAvgMonthly[13].textContent,
                    tempAvgMonthly[15].textContent,
                    tempAvgMonthly[17].textContent,
                    tempAvgMonthly[19].textContent,
                    tempAvgMonthly[21].textContent,
                    tempAvgMonthly[23].textContent,
       
            ],
            backgroundColor: [
                'rgba(0, 166, 191, 0.5)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
