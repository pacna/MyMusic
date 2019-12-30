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
        const {a} = this.props
        this.setState({
            isFav: a.favorite
        })
    }
    playMusic = (path, index) => {
        const {songFn} = this.props;
        songFn.setSongPath(path, index, true)
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
        const { a, index, songFn } = this.props
        const {isFav} = this.state
        return(
            <div>
                <ListItem button onClick={() => this.playMusic(a.path, index)}>
                    <ListItemText primary={a.title} 
                    secondary={
                        <Typography style={{display:"flex", alignItems:"center", justifyContent: "space-between"}}>
                            {a.artist ? a.artist : "Unknown artist"}
                            <span style={{display:"flex", alignItems:"center", justifyContent: "space-between"}}>
                                {
                                    songFn.getSongPath().index === index ? <img src='/sound_wave.gif' alt="sound_waive" style={{height:"35px", width: "35px"}}/> 
                                    : ""
                                }
                                <IconButton onClick={(evt) => this.changeFavorites(evt, a._id)}>
                                    {
                                        (isFav ) ? <Favorite /> : <FavoriteBorder />
                                    }
                                </IconButton>
                                {a.length}
                            </span>
                        </Typography>
                    }/>
                </ListItem>
                <Divider />
            </div> 
        )
    }
}