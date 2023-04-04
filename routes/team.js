const express = require('express');
const router = express.Router();
const Team = require('../models/Team');
const { body, validationResult } = require('express-validator');
var mongodb = require('mongodb');

// ROUTE 1: Get All the teams using: GET "/api/team/fetchall"
router.get('/fetchall', async (req, res) => {
    try {
        const teams = await Team.find();
        res.json(teams)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// ROUTE 2: Get All the players from specific team using teamid using: GET "/api/team/players/:teamid"
router.get('/players/:teamid', async (req, res) => {
    try {
        const teams = await Team.find({teamid : req.params.teamid},{players:1,_id:0},);
        res.json(teams)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// ROUTE 3: Get All the images of all teams using :  GET "/api/team/images"
router.get('/images', async (req, res) => {
    try {
        //img : 1 ,name :1 means field we want and _id :0 means field we donot want
        const teams = await  Team.aggregate([{$project : {img:1,name:1,_id:0}}]);
       
        res.json(teams)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.put('/add/:id', async (req, res) => {
    try {
        const {name} = req.body;
        //img : 1 ,name :1 means field we want and _id :0 means field we donot want
        const teams = await  Team.updateOne({teamid:req.params.id},{ $addToSet : { players:name } });
       
        res.json(teams)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


router.put('/delete', async (req, res) => {
    try {
        //empty all players array from all teams 
      
        const teams = await  Team.updateMany({},{ $set: { players:[]} });
       
        res.json(teams)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


router.put('/undopick/:id', async (req, res) => {
    try {
        //empty all players array from all teams 
      
        const teams = await  Team.updateOne({teamid:req.params.id},{ $pop: { players:1} });
       const resteam= await Team.findOne({teamid:req.params.id});
        res.json(resteam)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})





module.exports = router;