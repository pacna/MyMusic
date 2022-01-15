// @mui
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

// @mui icons
import { ExpandMore } from '@mui/icons-material';

// types
import { Album, SongResponse, ArtistResponse, SongData } from '../../components/types';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { setSongData } from '../../reducers/song-data-slice';
import { ReactAudioPlayer } from '../../componentsv2/react-audio-player';

export default function Artists (props: { artists: Array<ArtistResponse>}): JSX.Element {
    const songData = useSelector((state: RootStateOrAny) => state.songData.value);
    const dispatch = useDispatch();
    const { artists } = props;

    const playMusic = (path: string): void => {
        setSongPath(path, "", true)
    }

    const setSongPath = (path: string, id: string, visible: boolean): void => {
        dispatch(setSongData({ path: path, id: id, visible: visible } as SongData))
    }

    const displayArtist = (artist: string): string => {
        return artist ? artist : "Unknown artist";
    }

    const displayNumberOfAlbums = (albums: Album[]): string => {
        return albums.length > 1 ? `${albums.length} albums` : "1 album";
    }

    return(
        <div>
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
                                                            <List style={{width: "100%"}} key={index}>
                                                                <ListItem 
                                                                    button
                                                                    onClick={() => playMusic(song.path)}>
                                                                    <ListItemText 
                                                                        primary={song.title}
                                                                        secondary={album.songs.length > 1 
                                                                                    ? `${album.songs} songs`
                                                                                    : "1 song"}
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
        </div>
	)
}

// This function gets called at build time on server-side.
export async function getStaticProps(): Promise<{ props: { artists }}> {
  const artists = await (await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API}/artists`)).json();
  return {
    props: {
      artists
    }
  }
}