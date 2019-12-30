// react
import React from 'react'

// @material-ui
import { Typography, ListItem, ListItemText, Divider, IconButton } from '@material-ui/core';

// @material-ui icons
import { FavoriteBorder, Favorite } from '@material-ui/icons';

export class Song extends React.Component{
    constructor(){
        super()
        this.state ={
            isFav: false
        }
    }
    componentDidMount(){
        const {song} = this.props
        this.setState({
            isFav: song.favorite
        })
    }
    playMusic = (path, id) => {
        const {songFn} = this.props;
        songFn.setSongPath(path, id, true)
    }
    changeFavorites = (evt, id) => {
        const {isFav} = this.state;
        evt.stopPropagation();
        fetch(`${process.env.REACT_APP_API}/songs/favorite/update/${id}`, {
            method: "PUT",
            body: JSON.stringify({favorite: !isFav}),
            headers:{
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(() => 
            this.setState({
                isFav: !isFav
            })
        )
        .catch(error => console.error("ERROR ", error))
        
        
    }
    render(){
        const { song, id, soundWave, songFn } = this.props
        const {isFav} = this.state
        return(
            <div>
                <ListItem button onClick={() => this.playMusic(song.path, song._id)}>
                    <ListItemText primary={song.title} 
                    secondary={
                        <Typography style={{display:"flex", alignItems:"center", justifyContent: "space-between"}}>
                            {song.artist ? song.artist : "Unknown artist"}
                            <span style={{display:"flex", alignItems:"center", justifyContent: "space-between"}}>
                                {
                                    songFn.getSongPath().id === id && soundWave ? <img src='/sound_wave.gif' alt="sound_waive" style={{height:"35px", width: "35px"}}/> 
                                    : ""
                                }
                                <IconButton onClick={(evt) => this.changeFavorites(evt, song._id)}>
                                    {
                                        (isFav ) ? <Favorite /> : <FavoriteBorder />
                                    }
                                </IconButton>
                                {song.length}
                            </span>
                        </Typography>
                    }/>
                </ListItem>
                <Divider />
            </div> 
        )
    }
}