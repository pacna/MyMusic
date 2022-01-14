// react
import { Component, SyntheticEvent } from 'react';

// @mui
import { Tabs, Tab, AppBar, Fab } from '@mui/material';

// @mui icons
import { Shuffle } from '@mui/icons-material';

// components
import { Songs } from './songs'
import { Artists } from './artists';
import { ReactAudioPlayer } from './audio-player';
import { TabPanel } from './tab-panel';

// types
import { MainContentProps, MainContentStates } from './types/main-content.interface';
import { SongResponse } from './types/responses/song-response.interface';
import { TABS } from './types/tabs.enum';

export class MainContent extends Component<MainContentProps, MainContentStates>{
    constructor(props: MainContentProps){
        super(props)
        this.state = {
            currentTab: TABS.SONGS,
            soundWave: false
        }
    }

    changeTab = (evt: SyntheticEvent<Element, Event>, tabIndex: number): void => {
        this.setState({
            currentTab: tabIndex
        })
    }

    playRandomSong = (songs: Array<SongResponse>): void => {
        const {songFn} = this.props;
        let random = Math.floor(Math.random() * songs.length)
        songFn.setSongPath(songs[random].path, songs[random]._id, true);
    }

    showSoundWave = (): void => {
        this.setState({
            soundWave: true
        })
    }

    hideSoundWave = (): void => {
        this.setState({
            soundWave: false
        })
    }

    render(): JSX.Element {        
        const { currentTab, soundWave } = this.state
        const { SONGS, ARTISTS} = TABS;
        const {songs, artists, songFn} = this.props
        return(
            <div>
                <TabPanel value={currentTab} index={SONGS}>
                    <Songs songs={songs} songFn={songFn} soundWave={soundWave}/>
                </TabPanel>
                <TabPanel value={currentTab} index={ARTISTS}>
                    <Artists artists={artists} songFn={songFn}/>
                </TabPanel>
                <Fab onClick={() => this.playRandomSong(songs)} color="secondary" style={{position:"fixed", right: "1.5vw", bottom: "8vw"}}>
                    <Shuffle />
                </Fab>
                <ReactAudioPlayer 
                    src={songFn.getSongPath().path}
                    showSoundWave={this.showSoundWave}
                    hideSoundWave={this.hideSoundWave}
                />
            </div>
        )
    }
}