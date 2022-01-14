// react
import { Component, MouseEvent } from 'react'

// @mui
import { Typography, ListItem, ListItemText, Divider, IconButton } from '@mui/material';

// @mui icons
import { FavoriteBorder, Favorite } from '@mui/icons-material';

// types
import { SongProps, SongStates } from './types/song.interface';

// third party
import axios, { AxiosResponse } from 'axios';

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
        evt.stopPropagation();
        this.updateFavorite(id);
    }

    updateFavorite(id: string): void {
        const { isFav } = this.state;
        axios.put(`${process.env.NEXT_PUBLIC_REACT_APP_API}/songs/favorite/update/${id}`, {
            favorite: !isFav
        })
        .then((response: AxiosResponse) => response.data)
        .catch(error => console.error(error))
        .then(() => {
            this.setState({
                isFav: !isFav
            })
        })
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
                                    songFn?.getSongPath().id === id && soundWave ? <img src='/sound_wave.gif' alt="sound_waive" style={{height:"35px", width: "35px"}}/> 
                                    : ""
                                }
                                <IconButton onClick={(evt: MouseEvent) => this.changeFavorites(evt, song._id)}>
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