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
        const {songs, songFn} = this.props;
        return(
            <div style={{marginBottom: '12vh'}}>
                <List>
                    {
                        songs && songs.map((a,index) => {
                            return(
                                <Song songFn={songFn} index={index} showGif={showGif} a={a} key={a._id}/>              
                            )
                        })
                    }
                </List>
            </div>
        )
    }
}