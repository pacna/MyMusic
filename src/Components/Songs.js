import React from 'react';
import List from '@material-ui/core/List';
import Song from './Song'

class Songs extends React.Component{
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
            <div>
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
export default Songs