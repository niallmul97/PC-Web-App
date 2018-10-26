let mongoose = require('mongoose');

let PartsSchema = new mongoose.Schema({
        title: String,
        type: String,
        vram: String,
        speed: String,
        cores: Number,
        storage: String,
    },
    {collection:'partsdb'});

module.exports = mongoose.model('Parts', PartsSchema);