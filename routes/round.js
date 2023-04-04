const express = require('express');
const router = express.Router();
const Round = require('../models/Round');
const { body, validationResult } = require('express-validator');
var mongodb = require('mongodb');


// ROUTE 1: Get All the rounds using: GET "/api/rounds/fetchall"
router.get('/fetchall', async (req, res) => {
    try {
        
        const round = await Round.aggregate([{ $sort : { round : 1,pick:1 } }]);
        res.json(round)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// ROUTE 1: Get the round using number as params  : GET "/api/rounds/:round"
router.get('/:round', async (req, res) => {
    try {
        let rounds = await Round.find({round : req.params.round},{_id:0});
        if (!rounds) { return res.status(404).send("Not Found") }
        res.json(rounds)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})




module.exports = router