const mongoose = require('mongoose')
const connectionURI = process.env.DB_CONNECTION_URI

mongoose.set("debug", true); 
mongoose.connect(connectionURI,{
  useUnifiedTopology:true,
  useNewUrlParser:true
},(err,connected)=>{
  if(err){
    throw err
  }
  console.log('Mongodb Connection Successful')
})
