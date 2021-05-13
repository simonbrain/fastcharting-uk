'use strict';

const express = require('express');
const app1 = express();
const app2 = express();
const axios = require('axios');
const data = require("./routes/data");
const info = require("./routes/info");

//app.use(express.static('public'));
app1.use("/data",data);
app1.use("/info",info);

const { auth, requiresAuth } = require('express-openid-connect');
app1.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    issuerBaseURL: 'https://dev-2k06-6q4.us.auth0.com',
    baseURL: 'http://34.89.4.53:8000',
    //baseURL: 'http://localhost:8000',
    clientID: 'bM0Tl72lomPAbV3YWeXTlmGTb8tMxmpH',
    secret: 'jkdjhbdwfjbhbekqwjbfjkbjhfbhjberjhjhlrrhjlehjlrbbljkvfrblkjbljkvkbljvef'
  })
);

//app.get('/', (req, res) => {
app1.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged In' : 'Logged Out')
    //res.sendFile(path.join(__dirname, '/index.html'));
    //res.status(200).send('Hello, Fastcharts!').end();
  
});

app2.get('/', (req, res) => {
  res.status(200).send('Hello from Fastcharts backend').end();

});

// Start the frontend server
const PORT1 = process.env.PORT || 8000;
app1.listen(PORT1, () => {  
  console.log(`App listening on port ${PORT1}`);
  console.log('Press Ctrl+C to quit.');
});

// Start the backend server
const PORT2 = process.env.PORT || 8001;
app2.listen(PORT2, () => {  
  console.log(`App listening on port ${PORT2}`);
  console.log('Press Ctrl+C to quit.');
});

module.exports = app1;
module.exports = app2;
