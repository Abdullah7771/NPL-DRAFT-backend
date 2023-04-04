const mongoose = require('mongoose');
const { Schema } = mongoose;
//Schema or model created for Team (Works as Table in SQL)
const TeamSchema = new Schema({
    teamid:{
        type: Number,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    img:
    {
        data: Buffer,
        contentType: String
    },
    players:{
        type:Array
    } 
  });


  //first argument must be same of that  existing collection of database which you want
  // otherwise new collection created
  module.exports = mongoose.model('teams', TeamSchema);