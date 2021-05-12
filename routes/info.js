"use strict";

const express = require("express");
let router = express.Router();

const os = require('os');

let hostname = os.hostname();
let homedir = os.homedir();

router
    .get("/",(req,res) => {
        res.send('This is the info directory')
    })

router
    .get("/hostdetails",(req,res) => {
        res.send(`Host Name: ${hostname} `)
    })


module.exports = router;