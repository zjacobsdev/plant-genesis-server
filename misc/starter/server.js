//Plant Vital Starter API - *evenually routes.js

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
// <socket.io> server require package and setup


var db, collection;

const url = "  ";
const dbName = " ";

app.listen(3000, () => {
    MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public')) 

//get homepage when user login ---> gets temp and humidity
app.get('/homepage', isLoggedIn, function(req, res) {
    if(req.user.local.email){
      db.collection('device_temp').find().toArray((err, result) => {
        if (err) return console.log(err)
        
        //<socket.io> ---> live temp/hum data stream ????????
        
        
      /*  res.render('home.ejs', { //currently index.html
          user: req.user,
          data: result
        })*/
      })
    }
  });


//get device manager page
app.get('/devices', isLoggedIn, function(req, res) {
if(req.user.local.email){
    db.collection('device_temp').find().toArray((err, result) => {
    if (err) return console.log(err)

  //<socket.io> live device status 

    
   /*  res.render('home.ejs', { //currently index.html
          user: req.user,
          data: result
        })*/
    })
}
});


//add new device id and device_name from form
app.post('/devices', (req, res) => {  
    
 if(req.user.local.email){
  db.collection('device_temp').save({device_id:req.body.device_id, device_name:req.body.device_name }, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
  })
}
})

// deletes devices
app.delete('/devices', (req, res) => {
    
if(req.user.local.email){
    db.collection('device_temp').findOneAndDelete({ device_id:req.body.device_id }, (err, result) => {
      if (err) return res.send(500, err)
      res.send('Message deleted!')
    })
    }
  })

//change device name
app.put('/devices', (req, res) => {  
    if(req.user.local.email){
    
    // user input checking ---> req.body.name_change
    
  db.collection('device_temp').findOneAndUpdate({device_id:req.body.device_id }, (err, result) => {
      $set{
      device_name: req.body.name_change     
          
      }
    if (err) return console.log(err)
    console.log('saved to database')
  })
}
})

//




/////////////////////Log In/ User Authetication//////////////////////////////

// get login page
app.get('/login', function(req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage') }); //currently login.html
});

//logout
app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
});

// process the login form
app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile', 
    failureRedirect : '/login', 
    failureFlash : true 
}));



