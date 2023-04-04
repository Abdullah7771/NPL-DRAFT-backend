const mongoose = require('mongoose');
const { Schema } = mongoose;

//Schema or model created for Player (Works as Table in SQL)
const PlayerSchema = new Schema({

    playerid:{
        type: Number,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true,
    },
    captain:{
        type: Boolean,
        required: false
    },
    teamid:{
        type: Number,
    },
  });

  //first argument must be same of that  existing collection of database which you want
  // otherwise new collection created
  const Player = mongoose.model('players', PlayerSchema);
  module.exports = Player;