const mongoose = require('mongoose')
const { Schema } = mongoose;

const astroDataSchema = new Schema({
  date:  String,
  explanation:String,
  media_type:String,
  service_version:String,
  title:String,
  url:String,
});

const AstroData = mongoose.model('AstroData', astroDataSchema);
module.exports = AstroData