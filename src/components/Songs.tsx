// react
import { Component } from 'react';

// @mui
import { List } from '@mui/material';

// types
import { SongsProps, SongsStates } from '../types/Songs.interface';
import { SongResponse } from '../types/responses/SongResponse.interface';

// components
import { Song } from './Song';

export class Songs extends Component<SongsProps, SongsStates>{
    constructor(props: SongsProps){
        super(props)
        this.state = {
            musicPath: "",
            visible: false,
        }
    }
    render(): JSX.Element {
        const {songs, songFn, soundWave} = this.props;
        return(
            <div style={{marginBottom: '12vh'}}>
                <List>
                    {
                        songs?.map((song: SongResponse) => {
                            return(
                                <Song 
                                    songFn={songFn} 
                                    id={song._id}  
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