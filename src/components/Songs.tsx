// react
import { Component } from 'react';

// @mui
import { List } from '@mui/material';

// components
import { SongsProps, SongsStates } from '../interfaces/Songs.interface';
import { SongResponse } from '../interfaces';
import { Song } from './Song';

export class Songs extends Component<SongsProps, SongsStates>{
    constructor(props: SongsProps){
        super(props)
        this.state = {
            musicPath: "",
            visible: false,
            showGif: "",
        }
    }
    render(): JSX.Element {
        const {showGif} = this.state
        const {songs, songFn, soundWave} = this.props;
        return(
            <div style={{marginBottom: '12vh'}}>
                <List>
                    {
                        songs && songs.map((song: SongResponse) => {
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