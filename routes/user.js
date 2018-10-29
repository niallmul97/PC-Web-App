let User = require('../models/user');
let Builds = require('../models/builds');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

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

//Method that creates a new user and saves it to the database
router.addUser = (req, res) =>{
    res.setHeader('Content-Type', 'application/json');

    const user = new User();

    user.email = req.body.email;
    user.setPassword(req.body.password);

    user.save(function (err) {
        if(err)
            res.send(err)
        else
            res.send('User added')
    });
}

//Method that deletes a user from the database
router.deleteUser = (req, res) =>{
    User.findByIdAndRemove({"_id": req.params.id}, function (err) {
        if (err)
            res.send(err)
        else
            res.send('User deleted')
    });
}

//Method that finds all users
router.findAll = (req, res)=> {

    res.setHeader('Content-type', 'application/json');

    User.find(function(err, user){
        if(err)
            res.send(err)
        else
            res.send(JSON.stringify(user,null,5));
    });
}

//Method that finds one particular user by id
router.findOne = (req, res) =>{

    res.setHeader('Content-Type', 'application/json');

    User.find({"_id": req.params.id}, function (err, user) {
        if(err)
            res.send(err);
        else
            res.send(JSON.stringify(user,null,5));
    });
}

//Method that finds all builds created by a particular user
router.findUserBuilds = (req, res) =>{

    res.setHeader('Content-Type', 'application/json');

    Builds.find({"userId": req.params.userId}, function (err, builds) {
        if(err)
            res.send(err);
        else
            res.send(JSON.stringify(builds,null,5));
    });
}

//Method that allows the user to update their email
router.updateEmail = (req, res) =>{
    res.setHeader('Content-Type', 'application/json');
    User.findById(req.params.userId, function (err, user) {
        if(err)
            res.send(err);
        else{
            User.findByIdAndUpdate(req.params.userId, {email : req.params.newEmail}, function (err, user) {
                if(err)
                    res.send(err);
                else
                    res.send(JSON.stringify("Email Updated"))
            });
        }
    });
};

module.exports = router;