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
import { ArtistsProps } from './types/artists.interface';
import { Album, SongResponse, ArtistResponse } from './types/responses';

export const Artists = (props: ArtistsProps): JSX.Element => {
    
    const playMusic = (path: string): void => {
        const {songFn} = props;
        songFn.setSongPath(path, "", true)
    }

    const displayArtist = (artist: string): string => {
        return artist ? artist : "Unknown artist";
    }

    const displayNumberOfAlbums = (albums: Album[]): string => {
        return albums.length > 1 ? `${albums.length} albums` : "1 album";
    }

    const { artists } = props

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