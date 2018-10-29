let Builds = require('../models/builds');
let Parts = require('../models/parts');
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

//Function that finds all the votes from all the builds
function getTotalVotes(array) {
    let totalVotes = 0;
    array.forEach(function(obj) { totalVotes += obj.upvotes; });
    return totalVotes;
}

//Method that finds all of the builds
router.findAll = (req, res)=> {

    res.setHeader('Content-type', 'application/json');

    Builds.find(function(err, builds){
        if(err)
            res.send(err)
        res.send(JSON.stringify(builds,null,5));
    });
}

//Method that finds one particular user based on an id
router.findOne = (req, res) =>{

    res.setHeader('Content-Type', 'application/json');

    Builds.find({"_id": req.params.id}, function (err, builds) {
        if(err)
            res.send(err);
        else
            res.send(JSON.stringify(builds,null,5));
    });
}

//Method that creates a build and adds it to the database, each build will contain a user ID to indicate which user
//the build belongs to. If the field is left empty, the user will default to anonymous.
//Each particular component as well as their id can be added upon creation or else updated later.
router.addBuild = (req, res) =>{
    res.setHeader('Content-Type', 'application/json');

    var build = new Builds();

    build.title = req.body.title;
    build.cost = req.body.cost;
    build.cpu = req.body.cpu;
    build.cpuId = req.body.cpuId;
    build.gpu = req.body.gpu;
    build.gpuId = req.body.gpuId;
    build.ram = req.body.ram;
    build.ramId = req.body.ramId;
    build.storage = req.body.storage;
    build.storageId = req.body.storageId;
    build.os = req.body.os;
    build.osId = req.body.osId;
    build.userId = req.body.userId;

    build.save(function (err) {
        if(err)
            res.send(err)
        else
            res.send('Build added')
    });
}

//Method that enables users to upvote builds
router.incrementUpvotes = (req, res) =>{
    Builds.findById({"_id": req.params.id}, function (err, build) {
            if (err)
                res.send(err)
            else {
                build.upvotes += 1;
                build.save(function (err) {
                    if (err)
                        res.send(err)
                    else
                        res.send('Build Upvoted')

                })
            }
        }

    )
}

//Method that allows a user to delete a build
router.deleteBuild = (req, res) =>{
    Builds.findByIdAndRemove({"_id": req.params.id}, function (err) {
        if (err)
            res.send(err)
        else
            res.send('Build deleted')
    });
}

//Method that gets the total upvotes of all builds
router.findTotalUpvotes = (req, res) => {
    Builds.find(function (err, builds) {
        if (err)
            res.send(err)
        else
            res.send('Total votes:' + getTotalVotes(builds))
    })
}

//Method that allows users to search for builds by cost, the search will return any build that is less than or equal
//the cost entered.
router.findByCost = (req, res) =>{

    res.setHeader('Content-Type', 'application/json');

    Builds.find({"cost": {$lte: ((req.params.cost)+1)}}, function (err, builds) {
        if(err)
            res.send(err);
        else
            res.send(JSON.stringify(builds,null,5));
    });
}

//Method that searches for all builds by a particular user.
router.findByUser = (req, res) =>{

    res.setHeader('Content-Type', 'application/json');

    Builds.find({"userId": (req.params.userId)}, function (err, builds) {
        if(err)
            res.send(err);
        else
            res.send(JSON.stringify(builds,null,5));
    });
}

//Method that allows a user to search all builds that include a particular cpu
router.findByCPU = (req, res) =>{

    res.setHeader('Content-Type', 'application/json');

    Builds.find({"cpu": req.params.cpu}, function (err, builds) {
        if(err)
            res.send(err);
        else
            res.send(JSON.stringify(builds,null,5));
    });
}

//Method that allows a user to search all builds that include a particular gpu
router.findByGPU = (req, res) =>{

    res.setHeader('Content-Type', 'application/json');

    Builds.find({"gpu": (req.params.gpu)}, function (err, builds) {
        if(err)
            res.send(err);
        else
            res.send(JSON.stringify(builds,null,5));
    });
}

//Method that allows a user to search all builds that include particular ram
router.findByRAM = (req, res) =>{

    res.setHeader('Content-Type', 'application/json');

    Builds.find({"ram": (req.params.ram)}, function (err, builds) {
        if(err)
            res.send(err);
        else
            res.send(JSON.stringify(builds,null,5));
    });
}

//Method that allows a user to search all builds that include a particular storage
router.findByStorage = (req, res) =>{

    res.setHeader('Content-Type', 'application/json');

    Builds.find({"storage": (req.params.storage)}, function (err, builds) {
        if(err)
            res.send(err);
        else
            res.send(JSON.stringify(builds,null,5));
    });
}

//Method that allows a user to search all builds that include a particular operating system
router.findByOs = (req, res) =>{

    res.setHeader('Content-Type', 'application/json');

    Builds.find({"os": (req.params.os)}, function (err, builds) {
        if(err)
            res.send(err);
        else
            res.send(JSON.stringify(builds,null,5));
    });
}

//Each of these update methods will search for a particular build by an id,
// //then will search through the list of all parts again by id, if the correct part is found, the part id will be set to
// //correct part id, and the name will be set to the correct part name.

//Method that allows a user to update the cpu of a particular build
router.updateCPU = (req, res) =>{

    res.setHeader('Content-Type', 'application/json');

    Builds.findById(req.params.buildId, function(err, build){
        if (err)
            res.send(err)
        else{
            Parts.findById(req.params.partId, function (err, part) {
                if (err){
                    res.send(err)
                }
                else{
                    if(part._id === req.params.partId, function (err) {
                        res.send(err)
                    }){
                        build.cpu = part.title;
                        build.cpuId = part._id;
                        build.save(function (err) {
                            if (err)
                                res.send(err)
                            else
                                res.send('CPU Updated')

                        })
                    }
                }
            })
        }
    })
}

//Method that allows a user to update the gpu of a particular build
router.updateGPU = (req, res) =>{

    res.setHeader('Content-Type', 'application/json');

    Builds.findById(req.params.buildId, function(err, build){
        if (err)
            res.send(err)
        else{
            Parts.findById(req.params.partId, function (err, part) {
                if (err){
                    res.send(err)
                }
                else{
                    if(part._id === req.params.partId, function (err) {
                        res.send(err)
                    }){
                        build.gpu = part.title;
                        build.gpuId = part._id;
                        build.save(function (err) {
                            if (err)
                                res.send(err)
                            else
                                res.send('GPU Updated')

                        })
                    }
                }
            })
        }
    })
}

//Method that allows a user to update the ram of a particular build
router.updateRAM = (req, res) =>{

    res.setHeader('Content-Type', 'application/json');

    Builds.findById(req.params.buildId, function(err, build){
        if (err)
            res.send(err)
        else{
            Parts.findById(req.params.partId, function (err, part) {
                if (err){
                    res.send(err)
                }
                else{
                    if(part._id === req.params.partId, function (err) {
                        res.send(err)
                    }){
                        build.ram = part.title;
                        build.ramId = part._id;
                        build.save(function (err) {
                            if (err)
                                res.send(err)
                            else
                                res.send('RAM Updated')

                        })
                    }
                }
            })
        }
    })
}

//Method that allows a user to update the storage of a particular build
router.updateStorage = (req, res) =>{

    res.setHeader('Content-Type', 'application/json');

    Builds.findById(req.params.buildId, function(err, build){
        if (err)
            res.send(err)
        else{
            Parts.findById(req.params.partId, function (err, part) {
                if (err){
                    res.send(err)
                }
                else{
                    if(part._id === req.params.partId, function (err) {
                        res.send(err)
                    }){
                        build.storage = part.title;
                        build.storageId = part._id;
                        build.save(function (err) {
                            if (err)
                                res.send(err)
                            else
                                res.send('Storage Updated')

                        })
                    }
                }
            })
        }
    })
}

//Method that allows a user to update the os of a particular build
router.updateOS = (req, res) =>{

    res.setHeader('Content-Type', 'application/json');

    Builds.findById(req.params.buildId, function(err, build){
        if (err)
            res.send(err)
        else{
            Parts.findById(req.params.partId, function (err, part) {
                if (err){
                    res.send(err)
                }
                else{
                    if(part._id === req.params.partId, function (err) {
                        res.send(err)
                    }){
                        build.os = part.title;
                        build.osId = part._id;
                        build.save(function (err) {
                            if (err)
                                res.send(err)
                            else
                                res.send('OS Updated')

                        })
                    }
                }
            })
        }
    })
}

//Method that allows a user to update the cost of a particular build
router.updateCost = (req, res) =>{

    res.setHeader('Content-Type', 'application/json');

    Builds.findById({"_id": req.params.id}, function (err, build) {
            if (err)
                res.send(err)
            else {
                Builds.findByIdAndUpdate(req.params.id, {cost : req.body.cost}, function(err, build){
                    if (err)
                        res.send(err)
                    else
                        res.send("Cost Updated");

                })
            }
        }

    )
}

//Method that allows a user to update the title of a particular build
router.updateTitle = (req, res) =>{

    res.setHeader('Content-Type', 'application/json');

    Builds.findById({"_id": req.params.id}, function (err, build) {
            if (err)
                res.send(err)
            else {
                Builds.findByIdAndUpdate(req.params.id, {title : req.body.title}, function(err, build){
                    if (err)
                        res.send(err)
                    else
                        res.send("Title Updated");

                })
            }
        }

    )
}

module.exports = router;