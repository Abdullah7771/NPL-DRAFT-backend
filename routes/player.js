const express = require('express');
const router = express.Router();
const Player = require('../models/Player');
const Team = require('../models/Team');
const { body, validationResult } = require('express-validator');

var mongodb = require('mongodb');




// ROUTE 1: Get All the players using: GET "/api/player/fetchall"
router.get('/fetchall', async (req, res) => {
    try {
        const players = await Player.find();
        res.json(players)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})



// ROUTE 2: Get All the players using id as params using: GET "/api/player/:id"
router.get('/:id', async (req, res) => {
    // const { playerid } = req.params.id;
    const { name, type } = req.body;
    try {
        //find that player whose id is equal to id sent in params
        let player = await Player.findOne({ playerid: req.params.id });
        if (!player) { return res.status(404).send("Not Found") }
        res.json({ player });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// ROUTE 3: Get All the players sort by category using params by : GET "/api/player/type/:category"
router.get('/type/:category', async (req, res) => {
    try {

        //find that player whose type is equal to category sent in params e.g bowler,batsman etc
        let player = await Player.find({ type: req.params.category });
        if (!player) { return res.status(404).send("Not Found") }
        res.json({ player });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})



// ROUTE 4: Get All the captains : GET "/api/player/captains"
router.get('/captains', async (req, res) => {
    try {
        //find that player whose value of captain is equal to 1 
        const player = await Player.find({captain: true });
        if (!player) { return res.status(404).send("Not Found") };
        
        res.json({ player });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})





// ROUTE 5: Add a new Player using: POST "/api/player/add"
router.post('/add', async (req, res) => {
    try {
        //Post in obj body
        const { playerid, name, type} = req.body;
        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //creating new Player
        const player = new Player({
            //similar to playerid : playerid,name:name
            //which means data sent in body will be used to create new Player
            playerid, name, type
        })
        //saving new player
        const savedPlayer = await player.save()

        res.json(savedPlayer)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// ROUTE 6: Update an existing Player using: PUT "/api/player/update"
router.put('/update/:id', async (req, res) => {

    //Post in obj body
    const { playerid, name, type } = req.body;
    try {
        // Create a newPlayer object
        const newPlayer = {};
        //what he wants to update and what he doesn't want to update
        //if true and exists in body then only update it
        //update with new player obj with data sent acc to obj body
        if (playerid) { newPlayer.playerid = playerid };
        if (name) { newPlayer.name = name };
        if (type) { newPlayer.type = type };

        // Find the player to be updated through params and update it according to new player obj
        let player = await Player.findOneAndUpdate({ playerid: req.params.id }, { $set: newPlayer }, { new: true });
        if (!player) { return res.status(404).send("Not Found") }
        res.json({ player });


    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// // ROUTE 7: Delete an existing Player using id  using: DELETE "/api/player/delete/:id". Login required
router.delete('/delete/:id', async (req, res) => {
    try {
        // Find the player to be delete and delete it
        let player = await Player.findOneAndDelete({ playerid: req.params.id });
        if (!player) { return res.status(404).send("Not Found") }
        res.json({ "Success": "Player has been deleted", player: player });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router