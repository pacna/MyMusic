import React from 'react'
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';

class Song extends React.Component{
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
    changeFavorites = (evt, id, fav) => {
        const {isFav} = this.state;
        evt.stopPropagation();
        fetch('api/songs/update/'+ id, {
            method: "PUT",
            body: JSON.stringify({favorite: !fav}),
            headers:{
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(response => console.log("IS IT SUCCESSFUL ", JSON.stringify(response)))
        .then(() => 
            this.setState({
                isFav: !isFav
            })
        )
        .catch(error => console.log("ERROR ", error))
        
        
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
                            {a.artist}
                            <span style={{display:"flex", alignItems:"center", justifyContent: "space-between"}}>
                                {
                                    songFn.getSongPath().index === index ? <img src='/sound_wave.gif' alt="sound_waive" style={{height:"35px", width: "35px"}}/> 
                                    : ""
                                }
                                <IconButton onClick={(evt) => this.changeFavorites(evt, a._id, a.favorite)}>
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
export default Song