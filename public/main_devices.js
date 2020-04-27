var socket = io.connect('http://192.168.1.153:8180');

const device_status = document.querySelectorAll(".dot")

const trash = document.querySelectorAll(".trash-btn")

Array.from(trash).forEach(function(element) {
  //console.log(element)
      element.addEventListener('click', function(){
        const usr = this.parentNode.childNodes[3].innerText
        const device_id = this.parentNode.childNodes[5].innerText

        console.log(device_id)
        console.log(usr)
        fetch('/devices', {
              method: 'delete',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                    usr: usr,
                device_id: device_id
              })
            })
            window.location.reload(true)

       })

    
});
// connect to socket io.
socket.on('connect', function(){
  console.log("Client connected")
  //console.log(socket)
});



//get online status of devices
  socket.on('dhtpage', function(data){
    if (socket.connected){   

    Array.from(device_status).forEach(function(e) { 
      if (data.device_id === e.parentNode.childNodes[3].innerText ){

        e.parentNode.childNodes[5].style.backgroundColor = 'green'
      }
    })
    } 
  })


  

