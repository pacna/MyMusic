const mongoose = require('mongoose');

//schema for artists
const artistsSchema = mongoose.Schema({
    artist: String,
    albums: Array
})

const Artists = module.exports = mongoose.model("artists", artistsSchema)

module.exports.getArtists = function(callback, limit){
    Artists.find(callback).limit(limit)
}