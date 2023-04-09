require('dotenv').config();
const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors') 
const path = require('path');

connectToMongo();
const app = express()
const port = process.env.PORT || 5000 ;

app.use(cors())
app.use(express.json())

// Available Routes
//One Route for each  (Player,Team,Round)
app.use('/api/player', require('./routes/player'));
app.use('/api/team', require('./routes/team'));
app.use('/api/round', require('./routes/round'));


// if(process.env.NODE_ENV=='production'){
//   const path=require('path');
//   app.get('/',(req,res)=>{
//     app.use(express.static(path.resolve(__dirname,'frontend','build' )))
//     res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
//   })
// }else{
//   module.exports=require('./dev');
// }

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

app.get('/api/*', (req, res) => {
  res.status(404).send({ message: 'API endpoint not found' });
});




app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});



// if ( process.env.NODE_ENV == "production"){

//   app.use(express.static("frontend/build"));

//   const path = require("path");

//   app.get("*", (req, res) => {

//       res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));

//   }


app.listen(port, () => {
  console.log(`NPL Draft backend listening at ${port}`)
})