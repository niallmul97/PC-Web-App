let mongoose = require('mongoose');

let BuildSchema = new mongoose.Schema({
    title: {type: String, default: "Unnamed Build"},
    cost: Number,
    upvotes: {type: Number, default: 0},
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