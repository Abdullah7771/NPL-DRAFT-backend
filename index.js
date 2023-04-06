const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors') 

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

app.listen(port, () => {
  console.log(`NPL Draft backend listening at ${port}`)
})