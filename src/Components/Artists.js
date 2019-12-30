// react
import React from 'react';

// @material-ui
import { ListItemText, List, ListItem, Collapse, Typography, Divider } from '@material-ui/core';

// @material-ui icons
import { ExpandMore, ExpandLess } from '@material-ui/icons';

export class Artists extends React.Component {
    constructor(){
        super()
        this.state = {
            musicPath: "",
            open: false,
            showSongs: false,
            visible: false,
            currentIndex: null,
            currentAlbumIndex : null
        }
    }
    handleClick = (index) =>{
        const {open} = this.state
        this.setState({
            open: !open,
            currentIndex: index
        })
    }
    handleAlbumClick = (index) => {
        const {showSongs} = this.state
        this.setState({
            showSongs: !showSongs,
            currentAlbumIndex: index
        })       
    }
    playMusic = (path) => {
        const {songFn} = this.props;
        songFn.setSongPath(path, "", true)
    }
    render(){
        const { open, currentIndex, showSongs, currentAlbumIndex} = this.state
        const {artists} = this.props
        return(
            <div>
                <List>
                    {
                        artists && artists.map((a, index) =>{
                            return(
                                <div key={index}>
                                    <ListItem key={index} button onClick={() => this.handleClick(index)}>
                                        <ListItemText primary={a.artist ? a.artist : "Unknown artist"} 
                                        secondary={
                                            <Typography>
                                                {
                                                    a.albums.length === 1 ? a.albums.length +  " album" 
                                                    : a.albums.length + " albums"
                                                }
                                            </Typography>
                                        }/>
                                        {open && (currentIndex === index) ? <ExpandLess /> : <ExpandMore />}
                                    </ListItem>
                                    <Collapse in={open && (currentIndex === index)} timeout="auto">
                                        <List>
                                        {
                                            a.albums.map((x, index) => {
                                                return(
                                                    <div key={index}>
                                                        <ListItem button onClick={() => this.handleAlbumClick(index)}>
                                                            <ListItemText primary={x.title ? x.title : "Unknown album"} 
                                                            secondary={
                                                                <Typography>
                                                                    {
                                                                        x.songs.length === 1 ? x.songs.length + " song"
                                                                        : x.songs.length + " songs"
                                                                    }
                                                                </Typography>
                                                            }
                                                            />
                                                            {
                                                                showSongs && (currentAlbumIndex === index) ? <ExpandLess/> 
                                                                : <ExpandMore/>
                                                            }
                                                        </ListItem>
                                                        <Collapse in={showSongs && (currentAlbumIndex === index)}>
                                                            <List>
                                                                {
                                                                    x.songs.map((i, index) => {
                                                                        return(
                                                                            <div key={index}>
                                                                                <ListItem 
                                                                                    button 
                                                                                    onClick={() => this.playMusic(i.path)}
                                                                                >
                                                                                    <ListItemText primary={i.title} />
                                                                                </ListItem>
                                                                                <Divider/>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </List>
                                                        </Collapse>
                                                    </div>
                                                )
                                            })
                                        }
                                        </List>
                                    </Collapse>
                                </div>
                            )
                        })
                    }
                </List>
            </div>
        )
    }
}