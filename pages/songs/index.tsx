// react
import React from 'react';

// material
import { Fab, List } from '@mui/material';
import { Shuffle } from "@mui/icons-material";

// types
import { SongResponse } from "../../components/types/api";
import { SongData, SongsProps } from "../../components/types";

// third party
import { useDispatch } from "react-redux";
import axios from 'axios';

// others
import { Song } from '../../components/song';
import { setSongData } from '../../reducers/song-data-slice';

// styles
import classes from '../../styles/songs.module.scss';

export default function Songs (props: SongsProps): JSX.Element {
    const { songs } = props;
    const dispatch = useDispatch();

    const playRandomSong = (songs: Array<SongResponse>): void => {
        const random = Math.floor(Math.random() * songs.length);
        setSongPath(songs[random].path, songs[random]._id, true);
    }

    const setSongPath = (path: string, id: string, visible: boolean): void => {
        dispatch(setSongData({ path: path, id: id, visible: visible } as SongData))
    }

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

// This function gets called at build time on server-side.
export async function getStaticProps(): Promise<{ props: { songs }}> {
    const songs = await (await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_API}/songs`)).data;
    return {
        props: {
        songs
        }
    }
}
