import { SongResponse } from "../../components/types/responses";
import { Fab, List } from '@mui/material';
import { Song } from './../../componentsv2/song';
import React from 'react';
import { SongData, SongFn } from "../../components/types";
import { Shuffle } from "@mui/icons-material";
import { setSongData } from '../../reducers/song-data-slice';
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
// third party
import axios, { AxiosResponse } from 'axios';

export default function Songs (props: { songs: Array<SongResponse> }): JSX.Element {
    const { songs } = props;
    const songData = useSelector((state: RootStateOrAny) => state.songData.value);
    const toggleSoundWave = useSelector((state: RootStateOrAny) => state.toggleSoundWave.value);
    const dispatch = useDispatch();

    const playRandomSong = (songs: Array<SongResponse>): void => {
        const random = Math.floor(Math.random() * songs.length);
        setSongPath(songs[random].path, songs[random]._id, true);
    }

    const setSongPath = (path: string, id: string, visible: boolean): void => {
        dispatch(setSongData({ path: path, id: id, visible: visible } as SongData))
    }

    const getSongPath = (): SongData => {
        return songData;
    }

    const createSongFnObj = (): SongFn => {
        return {
            getSongPath: getSongPath,
            setSongPath: setSongPath,
            openSearchDialog: null
        }
  }

    return (
        <div>
            <List>
                {
                    songs?.map((song: SongResponse) => {
                        return(
                            <Song 
                                songFn={createSongFnObj()} 
                                id={song._id}  
                                song={song}
                                soundWave={toggleSoundWave}
                                key={song._id}
                            />              
                        )
                    })
                }
            </List>
            <Fab onClick={() => playRandomSong(songs)} color="secondary" style={{position:"fixed", right: "1.5vw", bottom: "8vw"}}>
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
