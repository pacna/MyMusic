// react
import React from 'react';

// @material-ui
import { 
    ListItemText, 
    List, 
    ListItem,
    Typography, 
    Divider, 
    ExpansionPanel, 
    ExpansionPanelSummary,
    ExpansionPanelDetails
} from '@material-ui/core';

// @material-ui icons
import { ExpandMore } from '@material-ui/icons';

export const Artists = props => {
    
    const playMusic = path => {
        const {songFn} = props;
        songFn.setSongPath(path, "", true)
    }

    const {artists} = props

    return(
        <div style={{marginBottom: '12vh'}}>
            {
                artists && artists.map((artist, index) => {
                    return(
                        <ExpansionPanel key={index}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMore />}>
                                    <Typography>
                                        {artist.artist ? artist.artist + " " : "Unknown artist "}
                                        {
                                            artist.albums.length > 1 ? `${artist.albums.length} albums` : "1 album"
                                        }
                                    </Typography>
                            </ExpansionPanelSummary>
                            {
                                artist.albums.map((album, index) => {
                                    return(
                                        <ExpansionPanel key={index}>
                                            <ExpansionPanelSummary
                                                expandIcon={<ExpandMore />}>
                                                    <Typography>
                                                        {album.title ? album.title : "Unknown album"}
                                                    </Typography>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails>
                                                {
                                                    album.songs.map((song, index) => {
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
                                            </ExpansionPanelDetails>
                                        </ExpansionPanel>
                                    )
                                })
                            }
                        </ExpansionPanel>
                    )
                })
            }
        </div>
    )
}