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
import { SongData, Artist, Album, AlbumSong } from '../../components/types';
import { SearchMusicRequest, MusicResponse } from '../../services/types/api';

// third party
import { useDispatch } from 'react-redux';

// others
import { setSongData } from '../../reducers/song-data-slice';
import { LoadingContent } from '../../components/loading-content';

// services
import { MusicApiService } from '../../services/music-api.service';

export default function ArtistsPage(): JSX.Element {
    const [artists, setArtists] = useState<Artist[]>([] as Artist[]);
    const dispatch = useDispatch();
    const service = new MusicApiService();

    const playMusic = (path: string): void => {
        setSongPath(path, "", true)
    }

    const setSongPath = (path: string, id: string, visible: boolean): void => {
        dispatch(setSongData({ path: path, id: id, visible: visible } as SongData))
    }

    const displayNumberOfAlbums = (albums: Album[]): string => {
        return albums.length > 1 ? `${albums.length} albums` : "1 album";
    }

    const displayNumberOfSongs = (songs: AlbumSong[]): string => {
        return songs.length > 1 ? `${songs} songs` : "1 song"
    }

    const searchMusic = async(): Promise<void> => {
        const request: SearchMusicRequest = {
            sortBy: 'artist:asc'
        } as SearchMusicRequest;

        createViewModelForArtists(await service.searchMusic(request))
    }

    const createViewModelForArtists = (response: MusicResponse[]): void => {
        const artistsVM: Artist[] = response?.reduce((artists: Artist[], music: MusicResponse) => {
            const findArtistNameIndex: number = artists.findIndex((x: Artist) => x.name.toLowerCase() === music.artist);
            if(hasValidIndex(findArtistNameIndex)) {
                const locatedArtist: Artist = artists[findArtistNameIndex];
                const findAlbumNameIndex: number = locatedArtist.albums.findIndex((x: Album) => x.title.toLowerCase() === music.album);
                if (hasValidIndex(findAlbumNameIndex)) {
                    locatedArtist.albums[findAlbumNameIndex].songs.push(convertToAlbumSong(music.title, music.path))
                } else {
                    locatedArtist?.albums.push(convertToAlbum(music.album, music.title, music.path))
                }
            } else {
                artists.push(convertToArtist(music));
            }

            return artists;
        }, [] as Artist[]);

        setArtists(artistsVM);
    }

    const hasValidIndex = (index: number): boolean => {
        return index !== -1;
    }

    const convertToAlbumSong = (title: string, path: string): AlbumSong => {
        return {
            title: title,
            path: path
        } as AlbumSong
    }

    const convertToAlbum = (albumName: string, title: string, path: string): Album => {
        return {
            title: albumName,
            songs: [convertToAlbumSong(title, path)]
        }
    }

    const convertToArtist = (music: MusicResponse): Artist => {
        return {
            name: music.artist,
            albums: [convertToAlbum(music.album, music.title, music.path)]
        }
    }

    const isReady = (): boolean => {
        return artists?.length > 0;
    }

    useEffect(() => {
        searchMusic();
    }, [])

    return(
        <LoadingContent isReady={isReady()}>
            {
                artists?.map((artist: Artist, index: number) => {
                    return(
                        <Accordion key={index}>
                            <AccordionSummary
                                expandIcon={<ExpandMore />}>
                                    <Typography>
                                        {artist.name + " " + displayNumberOfAlbums(artist.albums)}
                                    </Typography>
                            </AccordionSummary>
                            {
                                artist.albums.map((album: Album, index: number) => {
                                    return(
                                        <Accordion key={index}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMore />}>
                                                    <Typography>
                                                        {album.title + " " + displayNumberOfSongs(album.songs)}
                                                    </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                {
                                                    album.songs.map((song: AlbumSong, index: number) => {
                                                        return(
                                                            <List key={index}>
                                                                <ListItem 
                                                                    button
                                                                    onClick={() => playMusic(song.path)}>
                                                                    <ListItemText 
                                                                        primary={song.title}
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