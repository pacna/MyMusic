import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Songs from './Songs'
import Artists from './Artists';
import Fab from '@material-ui/core/Fab';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import { ReactAudioPlayer } from './AudioPlayer';

const TABS = {
    SONGS: 0,
    ARTISTS: 1
}

class TabsNav extends React.Component{
    constructor(){
        super()
        this.state = {
            currentTab: 0 
        }
    }
    changeTab = (evt, newValue) => {
        this.setState({
            currentTab: newValue
        })
    }
    playRandomSong = (songs) =>{
        const {songFn} = this.props;
        let random = Math.floor(Math.random() * songs.length)
        songFn.setSongPath(songs[random].path, random, true);

    }
    render(){        
        const {currentTab} = this.state
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
                {currentTab === SONGS && <Songs songs={songs} songFn={songFn}/>}
                {currentTab === ARTISTS && <Artists artists={artists} songFn={songFn}/>}
                <div>                    
                    <Fab onClick={() => this.playRandomSong(songs)} color="secondary" style={{position:"fixed", right: "1.5vw", bottom: "8vw"}}>
                        <ShuffleIcon />
                    </Fab>
                </div>
                <div>
                    <ReactAudioPlayer src={songFn.getSongPath().path}/>
                </div>
            </div>
        )
    }
}
export default TabsNav