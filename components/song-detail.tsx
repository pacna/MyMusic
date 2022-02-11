// react
import React, {useState, MouseEvent } from "react"

// material
import { Typography, ListItem, ListItemText, Divider, IconButton } from '@mui/material';
import { FavoriteBorder, Favorite } from '@mui/icons-material';

// types
import { SongDetailConfig } from './types/song-detail-config';

// styles
import classes from "../styles/song.module.scss";

// third party
import axios, { AxiosResponse } from 'axios';
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { setSongData } from "../reducers/song-data-slice";

export const SongDetail = (props: SongDetailConfig): JSX.Element => {
    const { song, id } = props;
    const songData = useSelector((state: RootStateOrAny) => state.songData.value);
    const dispatch = useDispatch();
    const [isFav, setIsFav ] = useState<boolean>(song.isFavorite);

    const playMusic = (path: string, id: string): void => {
        setSongPath(path, id, true)
    }

    const changeFavorites = (evt: MouseEvent, id: string): void  => {
        evt.stopPropagation();
        updateFavorite(id);
    }

    const setSongPath = (path: string, id: string, visible: boolean): void => {
        dispatch(setSongData({path: path, id: id, visible: visible}))
    }

    const updateFavorite = (id: string): void => {
        axios.patch(`${process.env.NEXT_PUBLIC_REACT_APP_API}/music/favorite/${id}`, {
            isFavorite: !isFav
        })
        .then((response: AxiosResponse) => response.data)
        .catch(error => console.error(error))
        .then(() => {
            setIsFav(!isFav);
        })
    }

    const displaySoundWave = (id: string): JSX.Element | void => {
        if (songData.id === id) {
            return (
                <img src='/sound_wave.gif' alt="sound_waive" className={classes.soundWave}/>
            );
        }
    }

    return(
        <div>
            <ListItem button onClick={() => playMusic(song.path, song.id)}>
                <ListItemText primary={song.title} 
                secondary={
                    <Typography className={classes.centerSpacing}>
                        { song.artist }
                        <span className={classes.centerSpacing}>
                            {
                                displaySoundWave(id)
                            }
                            <IconButton onClick={(evt: MouseEvent) => changeFavorites(evt, song.id)}>
                                {
                                    (isFav ) ? <Favorite /> : <FavoriteBorder />
                                }
                            </IconButton>
                            {song.totalDuration}
                        </span>
                    </Typography>
                }/>
            </ListItem>
            <Divider />
        </div> 
    )
}