'use strict';

const express = require('express');
const app = express();

const { auth, requiresAuth } = require('express-openid-connect');
//app.use(
  //auth({
    //authRequired: false,
    //auth0Logout: true,
    //issuerBaseURL: 'https://dev-2k06-6q4.us.auth0.com',
    //baseURL: 'http://34.89.4.53:8001',
    //clientID: 'rrZn0c7uzUxOwPyEAawtXQFk4aVseArM',
    //secret: 'jkdjhbdwfjbhbekqwjbfjkbjhfbhjberjhjhlrrhjlehjlrbbljkvfrblkjbljkvkbljvef'
  //})
//);

app.get('/', (req, res) => {
    const venue = req.query.venue
    //console.log(venue)
    const instrument = req.query.instrument
    //console.log(instrument)
    const frequency = req.query.frequency
    //console.log(frequency)
    const period = req.query.period
    //console.log(period)
    //path example: /lse/vod/daily/2021.json
    let pathName = __dirname + `/charting-lon-bucket/${venue}/${instrument}/${frequency}/2021.json`
    console.log(pathName)
    //res.sendFile(path.join(__dirname, '/index.html'));
    //res.status(200).send('Data Processing Service').end();
    res.sendFile(`${pathName}`)
  
});

// Start the server
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {  
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

module.exports = app;