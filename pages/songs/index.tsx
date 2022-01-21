// react
import React, { useEffect, useState } from 'react';

// material
import { Fab, List } from '@mui/material';
import { Shuffle } from "@mui/icons-material";

// types
import { SongResponse } from "../../components/types/api";
import { SongData } from "../../components/types";

// third party
import { useDispatch } from "react-redux";
import axios, { AxiosResponse } from 'axios';

// others
import { Song } from '../../components/song';
import { setSongData } from '../../reducers/song-data-slice';

// styles
import classes from '../../styles/songs.module.scss';

export default function Songs(): JSX.Element {
    const [songs, setSongs] = useState([] as Array<SongResponse>);
    const dispatch = useDispatch();

    const playRandomSong = (songs: Array<SongResponse>): void => {
        const random = Math.floor(Math.random() * songs.length);
        setSongPath(songs[random].path, songs[random]._id, true);
    }

    const setSongPath = (path: string, id: string, visible: boolean): void => {
        dispatch(setSongData({ path: path, id: id, visible: visible } as SongData))
    }

    const getSongs = (): void => {
        axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_API}/songs`)
        .then((response: AxiosResponse) => response.data)
        .catch((error: Error) => console.error(error))
        .then((result: Array<SongResponse>) => setSongs(result));
    }

    useEffect(() => {
        getSongs();
    }, [])

    return (
        <div>
            <List>
                {
                    songs?.map((song: SongResponse) => {
                        return(
                            <Song
                                id={song._id}  
                                song={song}
                                key={song._id} // to handle warning error "list should have a unique 'key' prop."
                            />              
                        )
                    })
                }
            </List>
            <Fab onClick={() => playRandomSong(songs)} color="secondary" className={classes.fab}>
                <Shuffle />
            </Fab>
        </div>
    )
}
