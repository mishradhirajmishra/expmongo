const mongoose = require('mongoose');

const event_schema = mongoose.Schema({
    name:String,
    date:Date,
    image:String
})

module.exports= mongoose.model('event',event_schema)