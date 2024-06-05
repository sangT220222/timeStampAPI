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
app.get("/api/:timestamp", function (req, res) {
  const value = req.params.timestamp
  const new_form = new Date (value);
  //converting YYYY-MM-DD to unix
  const unix_date = Math.floor(new_form.getTime() / 1000)  
  //converting YYYY-MM-DD to UTC
  const utc_date = new_form.toUTCString();
  res.json({unix: unix_date, utc: utc_date});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
