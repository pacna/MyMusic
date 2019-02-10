const mongoose = require('mongoose');

//schema for songs
const songsSchema = mongoose.Schema({
    title: String,
    artist: String,
    length: String,
    path: String,
    favorite: Boolean
})

const Songs = module.exports = mongoose.model("songs", songsSchema)

module.exports.getSongs = function(callback, limit){
    Songs.find(callback).limit(limit)
}
module.exports.updateSong = function(query, update, callback){
    Songs.findOneAndUpdate(query, update, callback)
}
