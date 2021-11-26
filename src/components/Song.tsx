// react
import { Component, MouseEvent } from 'react'

// @material-ui
import { Typography, ListItem, ListItemText, Divider, IconButton } from '@mui/material';

// @material-ui icons
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import { SongProps, SongStates } from '../interfaces/Song.interface';

export class Song extends Component<SongProps, SongStates>{
    constructor(props: SongProps){
        super(props)
        this.state ={
            isFav: false
        }
    }

    componentDidMount(): void {
        const {song} = this.props
        this.setState({
            isFav: song.favorite
        })
    }

    playMusic = (path: string, id: string): void => {
        const {songFn} = this.props;
        songFn.setSongPath(path, id, true)
    }

    changeFavorites = (evt: MouseEvent, id: string): void  => {
        const {isFav} = this.state;
        evt.stopPropagation();
        fetch(`${process.env.REACT_APP_API}/songs/favorite/update/${id}`, {
            method: "PUT",
            body: JSON.stringify({favorite: !isFav}),
            headers:{
                "Content-Type": "application/json"
            }
        })
        .then((response: Response) => response.json())
        .then(() => 
            this.setState({
                isFav: !isFav
            })
        )
        .catch(error => console.error("ERROR ", error))
        
        
    }

    render(): JSX.Element {
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