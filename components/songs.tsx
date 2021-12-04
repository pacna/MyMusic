// react
import { Component } from 'react';

// @mui
import { List } from '@mui/material';

// types
import { SongsProps, SongsStates } from './types/songs.interface';
import { SongResponse } from './types/responses/song-response.interface';

// components
import { Song } from './song';

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
        )
    }
}