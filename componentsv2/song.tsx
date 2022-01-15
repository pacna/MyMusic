// react
import React, {useState, MouseEvent } from "react"

// @mui
import { Typography, ListItem, ListItemText, Divider, IconButton } from '@mui/material';

// @mui icons
import { FavoriteBorder, Favorite } from '@mui/icons-material';

// types
import { SongProps } from '../components/types/song.interface';

// third party
import axios, { AxiosResponse } from 'axios';

export const Song = (props: SongProps): JSX.Element => {
    const { song, id, soundWave, songFn } = props;
    const [isFav, setIsFav ] = useState(song.favorite);

    const playMusic = (path: string, id: string): void => {
        const {songFn} = props;
        songFn.setSongPath(path, id, true)
    }

    const changeFavorites = (evt: MouseEvent, id: string): void  => {
        evt.stopPropagation();
        updateFavorite(id);
    }

    const updateFavorite = (id: string): void => {
        axios.put(`${process.env.NEXT_PUBLIC_REACT_APP_API}/songs/favorite/update/${id}`, {
            favorite: !isFav
        })
        .then((response: AxiosResponse) => response.data)
        .catch(error => console.error(error))
        .then(() => {
            setIsFav(!isFav);
        })
    }

    return(
        <div>
            <ListItem button onClick={() => playMusic(song.path, song._id)}>
                <ListItemText primary={song.title} 
                secondary={
                    <Typography style={{display:"flex", alignItems:"center", justifyContent: "space-between"}}>
                        {song.artist ? song.artist : "Unknown artist"}
                        <span style={{display:"flex", alignItems:"center", justifyContent: "space-between"}}>
                            {
                                songFn?.getSongPath().id === id && soundWave ? <img src='/sound_wave.gif' alt="sound_waive" style={{height:"35px", width: "35px"}}/> 
                                : ""
                            }
                            <IconButton onClick={(evt: MouseEvent) => changeFavorites(evt, song._id)}>
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