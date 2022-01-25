// react
import { useEffect, useState } from 'react';

// material
import { 
    ListItemText, 
    List, 
    ListItem,
    Typography, 
    Divider, 
    AccordionSummary, 
    AccordionDetails,
    Accordion
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

// types
import { Album, SongResponse, ArtistResponse, SongData } from '../../components/types';

// third party
import { useDispatch } from 'react-redux';
import axios, { AxiosResponse } from 'axios';

// others
import { setSongData } from '../../reducers/song-data-slice';
import { LoadingContent } from '../../components/loading-content';

export default function Artists(): JSX.Element {
    const [artists, setArtists] = useState([] as Array<ArtistResponse>);
    const dispatch = useDispatch();

    const playMusic = (path: string): void => {
        setSongPath(path, "", true)
    }

    const setSongPath = (path: string, id: string, visible: boolean): void => {
        dispatch(setSongData({ path: path, id: id, visible: visible } as SongData))
    }

    const displayArtist = (artist: string): string => {
        return artist ? artist : "Unknown artist";
    }

    const displayNumberOfAlbums = (albums: Array<Album>): string => {
        return albums.length > 1 ? `${albums.length} albums` : "1 album";
    }

    const displayNumberOfSongs = (songs: Array<SongResponse>): string => {
        return songs.length > 1 ? `${songs} songs` : "1 song"
    }

    const getArtists = (): void => {
        axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_API}/artists`)
        .then((response: AxiosResponse) => response.data)
        .catch((error: Error) => console.error(error))
        .then((result: Array<ArtistResponse>) => setArtists(result));
    }

    const isReady = (): boolean => {
        return artists?.length > 0;
    }

    useEffect(() => {
        getArtists();
    }, [])

    return(
        <LoadingContent isReady={isReady()}>
            {
                artists?.map((artist: ArtistResponse, index: number) => {
                    return(
                        <Accordion key={index}>
                            <AccordionSummary
                                expandIcon={<ExpandMore />}>
                                    <Typography>
                                        {displayArtist(artist.artist) + " " + displayNumberOfAlbums(artist.albums)}
                                    </Typography>
                            </AccordionSummary>
                            {
                                artist.albums.map((album: Album, index: number) => {
                                    return(
                                        <Accordion key={index}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMore />}>
                                                    <Typography>
                                                        {album.title ? album.title : "Unknown album"}
                                                    </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                {
                                                    album.songs.map((song: SongResponse, index: number) => {
                                                        return(
                                                            <List key={index}>
                                                                <ListItem 
                                                                    button
                                                                    onClick={() => playMusic(song.path)}>
                                                                    <ListItemText 
                                                                        primary={song.title}
                                                                        secondary={displayNumberOfSongs(album.songs)}
                                                                        />
                                                                </ListItem>
                                                                <Divider/>
                                                            </List>
                                                        )
                                                    })
                                                }
                                            </AccordionDetails>
                                        </Accordion>
                                    )
                                })
                            }
                        </Accordion>
                    )
                })
            }
        </LoadingContent>
	)
}