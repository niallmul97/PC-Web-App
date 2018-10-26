let mongoose = require('mongoose');

let BuildSchema = new mongoose.Schema({
    title: String,
    cost: Number,
    upvotes: Number,
    userId: {type: String, default: "Anonymous"},
    cpu: String,
    cpuId: String,
    gpu: String,
    gpuId:String,
    ram: String,
    ramId: String,
    storage: String,
    storageId: String,
    os: String,
    osId: String,
    },
    {collection:'buildsdb'});

module.exports = mongoose.model('Builds', BuildSchema);