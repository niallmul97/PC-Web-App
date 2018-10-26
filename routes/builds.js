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

function getTotalVotes(array) {
    let totalVotes = 0;
    array.forEach(function(obj) { totalVotes += obj.upvotes; });
    return totalVotes;
}

router.findAll = (req, res)=> {

    res.setHeader('Content-type', 'application/json');

    Builds.find(function(err, builds){
        if(err)
            res.send(err)
        res.send(JSON.stringify(builds,null,5));
    });
}

router.findOne = (req, res) =>{

    res.setHeader('Content-Type', 'application/json');

    Builds.find({"_id": req.params.id}, function (err, builds) {
        if(err)
            res.send(err);
        else
            res.send(JSON.stringify(builds,null,5));
    });
}

router.addBuild = (req, res) =>{
    res.setHeader('Content-Type', 'application/json');

    var build = new Builds();

    build.title = req.body.title;
    build.cost = req.body.cost;
    build.cpu = req.body.cpu;
    build.gpu = req.body.gpu;
    build.ram = req.body.ram;
    build.storage = req.body.storage;
    build.os = req.body.os;
    build.userId = req.body.userId;

    build.save(function (err) {
        if(err)
            res.send(err)
        else
            res.send('Build added')
    });
}

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

router.deleteBuild = (req, res) =>{
    Builds.findByIdAndRemove({"_id": req.params.id}, function (err) {
        if (err)
            res.send(err)
        else
            res.send('Build deleted')
    });
}

router.findTotalUpvotes = (req, res) => {
    Builds.find(function (err, builds) {
        if (err)
            res.send(err)
        else
            res.send('Total votes:' + getTotalVotes(builds))
    })
}

router.findByCost = (req, res) =>{

    res.setHeader('Content-Type', 'application/json');

    Builds.find({"cost": {$lte: ((req.params.cost)+1)}}, function (err, builds) {
        if(err)
            res.send(err);
        else
            res.send(JSON.stringify(builds,null,5));
    });
}

router.findByUser = (req, res) =>{

    res.setHeader('Content-Type', 'application/json');

    Builds.find({"userId": (req.params.userId)}, function (err, builds) {
        if(err)
            res.send(err);
        else
            res.send(JSON.stringify(builds,null,5));
    });
}

router.findByCPU = (req, res) =>{

    res.setHeader('Content-Type', 'application/json');

    Builds.find({"cpu": req.params.cpu}, function (err, builds) {
        if(err)
            res.send(err);
        else
            res.send(JSON.stringify(builds,null,5));
    });
}

router.findByGPU = (req, res) =>{

    res.setHeader('Content-Type', 'application/json');

    Builds.find({"gpu": (req.params.gpu)}, function (err, builds) {
        if(err)
            res.send(err);
        else
            res.send(JSON.stringify(builds,null,5));
    });
}

router.findByRAM = (req, res) =>{

    res.setHeader('Content-Type', 'application/json');

    Builds.find({"ram": (req.params.ram)}, function (err, builds) {
        if(err)
            res.send(err);
        else
            res.send(JSON.stringify(builds,null,5));
    });
}

router.findByStorage = (req, res) =>{

    res.setHeader('Content-Type', 'application/json');

    Builds.find({"storage": (req.params.storage)}, function (err, builds) {
        if(err)
            res.send(err);
        else
            res.send(JSON.stringify(builds,null,5));
    });
}

router.findByOs = (req, res) =>{

    res.setHeader('Content-Type', 'application/json');

    Builds.find({"os": (req.params.os)}, function (err, builds) {
        if(err)
            res.send(err);
        else
            res.send(JSON.stringify(builds,null,5));
    });
}

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