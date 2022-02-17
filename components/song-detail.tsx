// react
import React, {useState, MouseEvent } from "react"

// material
import { Typography, ListItem, ListItemText, Divider, IconButton, Menu, MenuItem } from '@mui/material';
import { FavoriteBorder, Favorite, MoreHoriz } from '@mui/icons-material';

// types
import { SongDetailConfig } from './types/configs/song-detail-config';
import { UpdateMusicFavoriteRequest } from "../services/types/api";

// styles
import classes from "../styles/song-detail.module.scss";
import coreClasses from "../styles/core.module.scss";

// others
import { setSongData } from "../reducers/song-data-slice";

// third party
import { AxiosResponse } from 'axios';
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";

// services
import { MusicApiService } from "../services/music-api.service";

export const SongDetail = (props: SongDetailConfig): JSX.Element => {
    const { song, id, openEditMenu, searchMusic } = props;
    const [menuAnchorElement, setMenuAnchorElement ] = useState<null | HTMLElement>(null);
    const isOpen: boolean = Boolean(menuAnchorElement);
    const service = new MusicApiService();

    const songData = useSelector((state: RootStateOrAny) => state.songData.value);
    const dispatch = useDispatch();
    const [isFav, setIsFav ] = useState<boolean>(song.isFavorite);

    const playMusic = (path: string, id: string): void => {
        setSongPath(path, id, true)
    }

    const changeFavorites = (evt: MouseEvent, id: string): void  => {
        evt.stopPropagation();

        const request: UpdateMusicFavoriteRequest = {
            isFavorite: !isFav
        };

        updateFavoriteMusic(id, request);
    }

    const handleOpenMenu = (evt: MouseEvent<HTMLButtonElement>): void => {
        evt.stopPropagation();
        setMenuAnchorElement(evt.currentTarget);
    }

    const handleCloseMenu = (): void => {
        setMenuAnchorElement(null);
    }

    const handleEditMenu = (id: string): void => {
        openEditMenu(id);
    }

    const handleDeleteMenu = (id: string): void => {
        service.removeMusic(id)
        .then((response: AxiosResponse) => response.data)
        .catch(error => console.error(error))
        .then(() => {
            searchMusic();
        })
    }

    const setSongPath = (path: string, id: string, visible: boolean): void => {
        dispatch(setSongData({path: path, id: id, visible: visible}))
    }

    const updateFavoriteMusic = (id: string, request: UpdateMusicFavoriteRequest): void => {
        service.updateFavoriteMusic(id, request)
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
                            <IconButton
                                color="primary"
                                className={coreClasses.ml8} 
                                onClick={handleOpenMenu}>
                                {
                                    <MoreHoriz />
                                }
                            </IconButton>
                        </span>
                    </Typography>
                }/>
            </ListItem>
            <Divider />
            <Menu 
                open={isOpen}
                onClose={handleCloseMenu}
                anchorEl={menuAnchorElement}

                >
                <MenuItem onClick={() => handleEditMenu(song.id)} divider={true} className={classes.editText}>
                    Edit
                </MenuItem>
                <MenuItem onClick={() => handleDeleteMenu(song.id)} className={classes.removeText}>
                    Delete
                </MenuItem>
            </Menu>
        </div> 
    )
}