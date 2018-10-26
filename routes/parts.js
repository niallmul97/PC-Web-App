let parts = require('../models/parts');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

var Parts = require('../models/parts');
var mongodbUri = 'mongodb://niallmul97:Password123@ds127375.mlab.com:27375/buildsdb';

mongoose.connect(mongodbUri);

let db = mongoose.connection;

db.on('error', function (err) {
    console.log('Unable to Connect to [' +db.name+']', err);
});

db.once('open', function () {
    console.log('Successfully Connected tp ['+db.name+']')
});

function getByValue(array, id){
    var result = array.filter(function(obj){return obj.id == id;});
    return result? result[0]: null;
}

router.findAll = (req, res)=> {

    res.setHeader('Content-type', 'application/json');

    Parts.find(function(err, parts){
        if(err)
            res.send(err)
        else
        res.send(JSON.stringify(parts,null,5));
    });
}

router.findOne = (req, res) =>{

    res.setHeader('Content-Type', 'application/json');

    Parts.find({"_id": req.params.id}, function (err, parts) {
        if(err)
            res.send(err);
        else
            res.send(JSON.stringify(parts,null,5));
    });
}

router.fuzzySearch = (req, res) =>{

    res.setHeader('Content-Type', 'application/json');
    let subStr = req.params.title.toUpperCase()
    let fuzzy = [];
    Parts.find(function(err, parts){
        if(err)
            res.send(err)
        else
            for(let i = 0; i < parts.length; i++){
                if(parts[i].title.toUpperCase().includes(subStr)){
                    fuzzy.push(parts[i])
                }
            }
            res.send(JSON.stringify(fuzzy,null,5))
    });
}

router.addPart = (req, res) =>{
    res.setHeader('Content-Type', 'application/json');

    let part = new Parts();

    part.title = req.body.title;
    part.type = req.body.type;
    part.vram = req.body.vram;
    part.speed = req.body.speed;
    part.cores = req.body.cores;
    part.storage = req.body.storage;

    Parts.find(function(err, parts){
        if(err)
            res.send(err)
        else
            for(let i = 0; i < parts.length; i++){
                if(parts[i].title === req.body.title){
                    res.send("Part Already Exists")
                }
            }
    });

    part.save(function (err) {
        if(err)
            res.send(err)
        else
            res.send('Part added')
    });
}

router.deletePart = (req, res) =>{
    Parts.findByIdAndRemove({"_id": req.params.id}, function (err) {
        if (err)
            res.send(err)
        else
            res.send('Part deleted')
    });
}

router.findByType = (req, res) =>{

    res.setHeader('Content-Type', 'application/json');

    Parts.find({"type": req.params.type}, function (err, builds) {
        if(err)
            res.send(err);
        else
            res.send(JSON.stringify(builds,null,5));
    });
}

module.exports = router;