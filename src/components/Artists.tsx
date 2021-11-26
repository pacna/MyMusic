// react
import React from 'react';

// @material-ui
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

// @material-ui icons
import { ExpandMore } from '@mui/icons-material';
import { ArtistsProps } from '../interfaces/Artists.interface';
import { Album, ArtistResponse, SongResponse } from '../interfaces/App.interface';

export const Artists = (props: ArtistsProps) => {
    
    const playMusic = (path: string): void => {
        const {songFn} = props;
        songFn.setSongPath(path, "", true)
    }

    const {artists} = props

    return(
        <div style={{marginBottom: '12vh'}}>
            {
                artists && artists.map((artist: ArtistResponse, index: number) => {
                    return(
                        <Accordion key={index}>
                            <AccordionSummary
                                expandIcon={<ExpandMore />}>
                                    <Typography>
                                        {artist.artist ? artist.artist + " " : "Unknown artist "}
                                        {
                                            artist.albums.length > 1 ? `${artist.albums.length} albums` : "1 album"
                                        }
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