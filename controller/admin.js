const con = require('../database/connection');
var moment = require('moment');
const mongoose = require('mongoose');
require('../model/event');
const eventModel = mongoose.model('event')

module.exports.index=async(req,res)=>{
    const events =await eventModel.find({}); 
    res.render('index', { title: 'All Events', events :events });
}

module.exports.addGet=(req,res)=>{
    res.render('addEvent', { title: 'Add Event' });
}

module.exports.addPost=async(req,res)=>{
    const event = new eventModel();
    event.name = req.body.name;
    event.date = req.body.date;
    event.image='';
    if (req.files && Object.keys(req.files).length != 0) {
  
        event.image = req.files.image.name;
        /*=====================================*/
        var dir = "./public/images/"+event.image;
        sampleFile = req.files.image;
        sampleFile.mv(dir, function(err) {
            if (err)
                return res.status(500).send(err);
        });
        /*=====================================*/
       }
   await event.save();
   res.redirect('/');
}

module.exports.editGet=async(req,res)=>{
    var id = req.params.id;
    const event =await eventModel.findOne({_id:id});
    date = moment(event.date).format('YYYY-MM-DD');    
    // console.log(event.date);
    res.render('editEvent', { title: 'Update Event', event:event,date:date });
}

module.exports.updatePost=async(req,res)=>{
    var id = req.params.id;
        image = '';
    if (req.files && Object.keys(req.files).length != 0) {
  
        image = req.files.image.name;
        /*=====================================*/
        var dir = "./public/images/"+image;
        sampleFile = req.files.image;
        sampleFile.mv(dir, function(err) {
            if (err)
                return res.status(500).send(err);
        });
        /*=====================================*/
        await eventModel.findByIdAndUpdate({
            _id:id
        },{
            name: req.body.name,
            date: req.body.date,
            image: image
        });
       }
       else{
        await eventModel.findByIdAndUpdate({
            _id:id
        },{
            name: req.body.name,
            date: req.body.date,            
        });
       }

 

   res.redirect('/');
}

module.exports.delete=async(req,res,next)=>{
     var id = req.params.id;
     console.log(id);
     const event =await eventModel.findByIdAndRemove({_id:id})
     next();
}