// react
import React, { useEffect, useState } from 'react';

// material
import { Box, Fab, List } from '@mui/material';
import { Shuffle, Add } from "@mui/icons-material";

// types
import { MusicResponse, SearchMusicRequest } from "../../services/types/api";
import { Song, SongData } from "../../components/types";

// third party
import { useDispatch } from "react-redux";

// components
import { SongDetail } from '../../components/song-detail';
import { LoadingContent } from '../../components/loading-content';
import { ModalManagement } from '../../components/modal-management';
import { MusicManagementDialog } from '../../components/music-management-dialog';

// reducers
import { setSongData } from '../../redux/reducers/song-data-slice';

// styles
import classes from '../../styles/songs-page.module.scss';

// services
import { MusicApiService } from '../../services/music-api.service';

export default function SongsPage(): JSX.Element {
    const [songs, setSongs] = useState<Song[]>([] as Song[]);
    const [ toggleMusicManagement, setToggleMusicManagement ] = useState<boolean>(false);
    const [ musicId, setMusicId ] = useState<string>(null);
    const dispatch = useDispatch();

    const service = new MusicApiService();

    const playRandomSong = (songs: Song[]): void => {
        const random = Math.floor(Math.random() * songs.length);
        setSongPath(songs[random].path, songs[random].id, true);
    }

    const setSongPath = (path: string, id: string, visible: boolean): void => {
        dispatch(setSongData({ path: path, id: id, visible: visible } as SongData))
    }

    const openAddMusic = (): void => {
        setMusicId(null);
        setToggleMusicManagement(true);
    }

    const openEditMenu = (id: string): void => {
        setMusicId(id);
        setToggleMusicManagement(true);
    }

    const closeMusicManagementDialog = (hasSubmitted: boolean): void => {
        if (hasSubmitted) {
            searchMusic();
        }
        setToggleMusicManagement(false);
    }

    const searchMusic = async(): Promise<void> => {
        const request: SearchMusicRequest = {
            sortBy: 'title:asc'
        } as SearchMusicRequest;

        createViewModelForSongs(await service.searchMusic(request));
    }

    const createViewModelForSongs = (response: MusicResponse[]): void => {
        const songsVM: Song[] = response?.map((x: MusicResponse) => {
            return {
                artist: x.artist,
                id: x.id,
                isFavorite: x.isFavorite,
                totalDuration: calculateTotalDuration(x.length),
                path: x.path,
                title: x.title
            } as Song
        });

        setSongs(songsVM);
    }

    const calculateTotalDuration = (length: number): string => {
        const remainingSecs: number = length % 60;
        return `${Math.floor(length / 60)}:${remainingSecs < 9 ? "0" + remainingSecs : remainingSecs}`; 
    }
    
    const isReady = (): boolean => {
        return songs?.length > 0
    }

    useEffect(() => {
        searchMusic();
    }, [])

    return (
        <LoadingContent isReady={isReady()}>
            <List>
                {
                    songs?.map((song: Song) => {
                        return(
                            <SongDetail
                                id={song.id}  
                                song={song}
                                key={song.id} // to handle warning error "list should have a unique 'key' prop."
                                openEditMenu={openEditMenu}
                                searchMusic={searchMusic}
                            />              
                        )
                    })
                }
            </List>
            <ModalManagement
                isOpen={toggleMusicManagement}
                renderComponent={
                    <MusicManagementDialog 
                    toggle={toggleMusicManagement} 
                    musicId={musicId}
                    closeMusicManagementDialog={closeMusicManagementDialog}/>}
            />
            <Box sx={{ '& > :not(style)': { m: 1 } }} className={classes.fabContainer}>
                <Fab onClick={openAddMusic} color="secondary">
                    <Add />
                </Fab>
                <Fab onClick={() => playRandomSong(songs)} className={classes.fabRandom}>
                    <Shuffle />
                </Fab>
            </Box>
        </LoadingContent>
    )
}
