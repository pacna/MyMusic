import React from 'react';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import { Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

class Artists extends React.Component {
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
        console.log(index);
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
                                        <ListItemText primary={a.artist} 
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
                                                        <ListItem button onClick={() => this.handleAlbumClick(index)} style={{marginLeft: "10px"}}>
                                                            <ListItemText primary={x.name} 
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
                                                                showSongs && (currentAlbumIndex === index) ? <ExpandLess style={{marginRight: "25px"}} /> 
                                                                : <ExpandMore  style={{marginRight: "25px"}}/>
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
                                                                                    style={{marginLeft: "20px"}}
                                                                                >
                                                                                    <ListItemText primary={i.name} />
                                                                                </ListItem>
                                                                                <Divider  style={{marginLeft: "35px", marginRight: "70px"}}/>
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
export default Artists