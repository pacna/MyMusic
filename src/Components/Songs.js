// react
import React from 'react';

// @material-ui
import { List } from '@material-ui/core';

// components
import { Song } from './Song'

export class Songs extends React.Component{
    constructor(){
        super()
        this.state = {
            musicPath: "",
            visible: false,
            showGif: "",
        }
    }
    render(){
        const {showGif} = this.state
        const {songs, songFn, soundWave} = this.props;
        return(
            <div style={{marginBottom: '12vh'}}>
                <List>
                    {
                        songs && songs.map(song => {
                            return(
                                <Song 
                                    songFn={songFn} 
                                    id={song._id} 
                                    showGif={showGif} 
                                    song={song}
                                    soundWave={soundWave}
                                    key={song._id}
                                />              
                            )
                        })
                    }
                </List>
            </div>
        )
    }
}