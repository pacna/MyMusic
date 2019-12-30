// react
import React from 'react';

// @material-ui
import { Tabs, Tab, AppBar, Fab } from '@material-ui/core';

// @material-ui icons
import { Shuffle } from '@material-ui/icons';

// components
import { Songs } from './Songs'
import { Artists } from './Artists';
import { ReactAudioPlayer } from './AudioPlayer';

const TABS = {
    SONGS: 0,
    ARTISTS: 1
}

export class TabsNav extends React.Component{
    constructor(){
        super()
        this.state = {
            currentTab: 0,
            soundWave: false
        }
    }

    changeTab = (evt, newValue) => {
        this.setState({
            currentTab: newValue
        })
    }

    playRandomSong = songs => {
        const {songFn} = this.props;
        let random = Math.floor(Math.random() * songs.length)
        songFn.setSongPath(songs[random].path, songs[random]._id, true);
    }

    showSoundWave = () => {
        this.setState({
            soundWave: true
        })
    }

    hideSoundWave = () => {
        this.setState({
            soundWave: false
        })
    }


    render(){        
        const { currentTab, soundWave } = this.state
        const { SONGS, ARTISTS} = TABS;
        const {songs, artists, songFn} = this.props
        return(
            <div>
                <AppBar position="static">
                    <Tabs value={currentTab} onChange={this.changeTab} variant="fullWidth">
                        <Tab label="Songs" />
                        <Tab label="Artists" />
                    </Tabs>
                </AppBar>
                {currentTab === SONGS && <Songs songs={songs} songFn={songFn} soundWave={soundWave}/>}
                {currentTab === ARTISTS && <Artists artists={artists} songFn={songFn}/>}
                <div>                    
                    <Fab onClick={() => this.playRandomSong(songs)} color="secondary" style={{position:"fixed", right: "1.5vw", bottom: "8vw"}}>
                        <Shuffle />
                    </Fab>
                </div>
                <div>
                    <ReactAudioPlayer 
                        src={songFn.getSongPath().path}
                        showSoundWave={this.showSoundWave}
                        hideSoundWave={this.hideSoundWave}
                    />
                </div>
            </div>
        )
    }
}