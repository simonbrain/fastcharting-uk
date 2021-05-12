"use strict";

const express = require("express");
let router = express.Router();
const axios = require('axios');
const Ajv = require('ajv')

const ajv = new Ajv()

const schema = { 
    type: "object",
    properties: {
      venue: {
        "type": "string",
        "description": "venue"
      },
      instrument: {
        "type": "string",
        "description": "instrument"
      },
      frequency: {
        "type": "string",
        "description": "frequency"
      },
      period: {
        "type": "string",
        "description": "period"
      }
    },
    required: ["venue", "instrument", "frequency", "period"],
    additionalProperties: false
}

const { auth, requiresAuth } = require('express-openid-connect');
router.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    issuerBaseURL: 'https://dev-2k06-6q4.us.auth0.com',
    baseURL: 'http://localhost:8000',
    clientID: 'kYIdnc6K6FeqTi9lRDaG3aG9baA8wVG7',
    secret: 'jkdjhbdwfjbhbekqwjbfjkbjhfbhjberjhjhlrrhjlehjlrbbljkvfrblkjbljkvkbljvef'
  })
);

router
    .get("/", requiresAuth(), (req,res) => {
        //console.log(JSON.stringify(req.query))
        let data_json = JSON.stringify(req.query)
        let data = req.query
        // Validate data
        const validate = ajv.compile(schema)
        const valid = validate(data)
        if (!valid) console.log(validate.errors)
        else console.log(valid)
        const venue = req.query.venue
        //console.log(venue)
        const instrument = req.query.instrument
        //console.log(instrument)
        const frequency = req.query.frequency
        //console.log(frequency)
        const period = req.query.period
        //console.log(period)
        const getData = async ()=> {
            try {
                const response = await axios.get(
                    `http://localhost:8001?venue=${venue}&instrument=${instrument}&frequency=${frequency}&period=${period}`
                    ).then(resp => {
                        res.send(resp.data)
                    })
                //let result = res.json(response.data)
                //console.log('res',result)
            }
            catch (error) {
                console.log(error)
            }
        }
        
        let data_request = getData()
        //console.log(data_request)
        //res.send(data_request)
        //res.send('Query sent was: '+ data_json)
    })

router
.get("/test/:id",(req,res) => {
    res.send('Param sent was: '+ req.params.id)
})

//router
    //.get("/lse",(req,res) => {
           // const getLonData = async() => {
                //try {
                    //const response = await axios.get(
                       // 'http://storage.cloud.google.com/charting-lon-bucket/lse/test_lse.json?authuser=2'
                       //'http://storage.cloud.google.com/charting-lon-bucket/lse/test_lse.json'
                    //)
                    //res.send(response.data)
                    //console.log(response)
                //}
                //catch (error){
                    //console.log(error)
                //}
            //}
            //getLonData()
        //res.send('This is the lse directory')
        //res.send()
    //})


module.exports = router;

