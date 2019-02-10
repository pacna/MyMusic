const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const Songs = require("./Schemas/songs")
const Artists = require('./Schemas/artists');
const dbName = 'mongodb://localhost:27017/music';
const bodyParser = require('body-parser');

console.log(dbName)
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
mongoose.connect(dbName);
var db = mongoose.connection;
app.get('/api/songs', (req, res) => {
    Songs.getSongs(function(error, data){
        if (error) throw error
        res.json(data)
    })
});
app.get('/api/artists', (req, res) => {
    Artists.getArtists(function(error, data){
        if(error) throw error
        res.json(data);
    })
})
app.put('/api/songs/update/:id', (req, res) => {
    var id = req.params.id;
    var data = req.body;
    console.log("SONGS BODY ", data)
    console.log("SONGS ID ", id)
    Songs.updateSong({_id: id}, data, function(error, data){
        if (error) throw error
        res.json(data);
    })
})

console.log("Listening on port", port)
app.listen(port);