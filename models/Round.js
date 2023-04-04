const mongoose = require('mongoose');
const { Schema } = mongoose;
//Schema or model created for Round (Works as Table in SQL)
const RoundSchema = new Schema({
    round:{
        type: Number,
        required: true
    },
    pick:{
        type: String,
        required: true
    },
    teamid:{
        type: Number,
        required: true
    },
    img:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teams'
    }
  });

  //first argument must be same of that  existing collection of database which you want
  // otherwise new collection created
  module.exports = mongoose.model('rounds', RoundSchema);