import { SongResponse } from "../../components/types/responses";
import { List } from '@mui/material';
import { Song } from './../../components/song';
import React, { 
    useState,
} from 'react';
import { SongData, SongFn } from "../../components/types";

export default function Songs (songsResponse: { songs: Array<SongResponse> }): JSX.Element {
    const { songs } = songsResponse;
    const [shouldShowSoundWave, setShouldShowSoundWave] = useState(false);
    const [ songData, setSongData ] = useState({} as SongData);

    const showSoundWave = (): void => {
        setShouldShowSoundWave(true);
    }

    const hideSoundWave = (): void => {
        setShouldShowSoundWave(false);
    }

    const setSongPath = (path: string, id: string, visible: boolean): void => {
        setSongData({ path: path, id: id, visible: visible } as SongData)
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
        <List>
            {
                songs?.map((song: SongResponse) => {
                    return(
                        <Song 
                            songFn={createSongFnObj()} 
                            id={song._id}  
                            song={song}
                            soundWave={shouldShowSoundWave}
                            key={song._id}
                        />              
                    )
                })
            }
        </List>
    )
}

// This function gets called at build time on server-side.
export async function getStaticProps(): Promise<{ props: { songs }}> {

  const songs = await (await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API}/songs`)).json();
  return {
    props: {
      songs
    }
  }
}
