// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


//handling parameter dynamically by using ":" aftrer specified route 
//The question mark allows for more flexible routing and ensuring that your server can handle requests with or without the timestamp parameter.
app.get("/api/:timestamp?", function (req, res) {
  const value = req.params.timestamp
  var utc_date, unix_date;

  if(!value) {
    const current_date = new Date();
    utc_date = current_date.toUTCString();
    unix_time = current_date.getTime();
  }

  else if(!isNaN(value)){
    const timestampInt = parseInt(value);
    //If it's a 10-digit number, it's likely in seconds, convert to milliseconds
    if (timestampInt.length === 10) {
      var to_convert = new Date(timestampInt * 1000);
    } else {
      // Otherwise, treat it as milliseconds
      var to_convert = new Date(timestampInt);
    }

    if(isNaN(to_convert.getTime())){
      res.json({ error : "Invalid Date" });
    }
    utc_date = to_convert.toUTCString();
    unix_time = to_convert.getTime();
  }  
  else {
    //converting YYYY-MM-DD to unix
    var new_form = new Date(value);
    if(isNaN(new_form.getTime())){
      res.json({ error : "Invalid Date" });
    }
    unix_time = new_form.getTime(); 
    //converting YYYY-MM-DD to UTC
    utc_date = new_form.toUTCString();
  }
  res.json({unix: unix_time, utc: utc_date});

});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
