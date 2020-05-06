module.exports = function(app, passport, db, io) {


      // show the Home Page
  app.get('/', function(req, res) {
       res.render('index.ejs')
  });

      //get homepage when user login ---> gets temp and hum
  app.get('/profile', isLoggedIn, function(req, res) {


        io.sockets.on ('connection', newConnection)
        io.sockets.setMaxListeners(0)

        function newConnection(socket){

            console.log('new connection'+ socket.id)
      
              socket.on('dht', function (data){
               // console.log(data)
                io.emit('dhtpage', data)
          
              })                
        }
      db.collection('device_temp').find().toArray((err, result) => {
        if (err) return console.log(err)
        
            res.render('profile.ejs', { 
              user: req.user,
              data: result,
        
             
            
            })

      })
  });

      //get device manager page
  app.get('/devices', isLoggedIn, function(req, res) {
    db.collection('device_temp').find().toArray((err, result) => {
      if (err) return console.log(err)
    
      res.render('devices.ejs', { 
        user: req.user,
        data: result
      })
     
  })
  })

  //add new device id and device_name from form
  app.post('/devices', (req, res) => {   
    db.collection('device_temp').save({usr:req.user.local.email, device_id:req.body.device_id, device_name:req.body.device_name, data_collection: [], daily_avg: [], weekly_avg: [] , monthly_avg:[] }, (err, result) => {
      if (err) return console.log(err)
      console.log('saved to database')
      res.redirect('/devices')
    })

  })

  // deletes devices
  app.delete('/devices', (req, res) => {   
    console.log(req.body.device_id)
        db.collection('device_temp').findOneAndDelete({ usr: req.body.usr, device_id: req.body.device_id }, (err, result) => {
          if (err) return res.send(500, err)
          console.log('Message deleted!')
          res.redirect('/devices')
        })
   
   })

  //snapshot current data on Dom and save to database
  app.put('/snapshot', (req, res) => {  

    console.log("saving to database")

    db.collection('device_temp').updateOne(
      
      {device_id: req.body.device_id},
  
      { $push: {data_collection: req.body.temp} },
      
      function (err, result) {
      if (err) return console.log(err)
  
    })
  
 
  })

  // show the login form
  app.get('/login', function(req, res) {
      res.render('login.ejs', { message: req.flash('loginMessage') })
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
      successRedirect : '/profile', // redirect to the secure profile section
      failureRedirect : '/login', // redirect back to the signup page if there is an error
      failureFlash : true // allow flash messages
  }));

  // show the signup form
  app.get('/signup', function(req, res) {
      res.render('signup.ejs', { message: req.flash('signupMessage') })
  });

  // process the signup form
  app.post('/signup', setUp , passport.authenticate('local-signup', {
      successRedirect : '/profile', // redirect to the secure profile section
      failureRedirect : '/signup', // redirect back to the signup page if there is an error
      failureFlash : true // allow flash messages
  }))

    function setUp (req, res , next) {
      db.collection('device_temp').save({usr:req.body.email, device_id: "12345", device_name:"home", data_collection: [], daily_avg: ["70.8", "79.8", "80.5", "81.8"," 78.3", "76.1", "89.1"], weekly_avg: ["56.7", "45.8", "42.2", "45.6", "36.1", "56.7", "60.3"] , monthly_avg:["32.1", "38.6", "40.3", "42.5", "56.6", "75.8", "81.2", "85.7", "72.3", "54.5", "40.2", "37.1"] }, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
         next()
      })}

    // unlink local account 
  app.get('/unlink/local', isLoggedIn, function(req, res) {
      var user            = req.user
      user.local.email    = undefined
      user.local.password = undefined
      user.save(function(err) {
          res.redirect('/profile')
      });
  });


  // route middleware to ensure user is logged in
  function isLoggedIn(req, res, next) {
      if (req.isAuthenticated())
          return next()

      res.redirect('/')
}



///// timers for data anaylsis ///


//////   gets the days data (data_collection) and save to a day_avg   ///////

// setInterval(() => {

// get db collection (data_collection), get array
// find the avg of those values 
//save that value in to (day_avg)
//delete values in data_collection

// db.collection('device_temp').distinct( "data_collection", { device_id: "12345"})

//         .then(function(arr) {
//           //console.log(arr);   //*Note to self* arr returns array of non repeating values

//         let  sum = arr.reduce((total,num)=>{ return (Number(total) + Number(num)) })

//         console.log(sum /arr.length)

//         db.collection('device_temp').updateOne(
      
//           {device_id: '12345'},
      
//           { $push: {testarr: sum /arr.length} },  ///*change to daily avg instead of testarr
          
//           function (err, result) {
//           if (err) return console.log(err)
      
//         })
  
//         })
  
// }, 8.64e7); /// 24-hour period --> 8.64e7



// ////// weekly SnapShot////

// setInterval(() => {
  
//   db.collection('device_temp').distinct( "day_avg", { device_id: "12345"})
  
//           .then(function(arr) {
//             //console.log(arr);   //*Note to self* arr returns array of non repeating values
  
//           let  sum = arr.reduce((total,num)=>{ return (Number(total) + Number(num)) })
  
//           console.log(sum /arr.length)
  
//           db.collection('device_temp').updateOne(
        
//             {device_id: '12345'},
        
//             { $push: {testarrWeek: sum /arr.length} },  ///*change to weekly_avg instead of testarrWeekly
            
//             function (err, result) {
//             if (err) return console.log(err)
        
//           })
    
//           })
    
//   }, 8.64e7 * 7); /// 7-day period


//   /////Monthly SnapShot///

//   setInterval(() => {
  
//     db.collection('device_temp').distinct( "data_collection", { device_id: "12345"})
    
//             .then(function(arr) {
//               //console.log(arr);   //*Note to self* arr returns array of non repeating values
    
//             let  sum = arr.reduce((total,num)=>{ return (Number(total) + Number(num)) })
    
//             console.log(sum /arr.length)
    
//             db.collection('device_temp').updateOne(
          
//               {device_id: '12345'},
          
//               { $push: {testarrMonthly: sum /arr.length} },  ///*change to monthly_temp instead of testarrMonthly
              
//               function (err, result) {
//               if (err) return console.log(err)
          
//             })
      
//             })
      
//     }, 8.64e7 * 30); /// 30-day period  -----> Note:* moment.js  would be ideal for scheduling

}
