// react
import React from 'react';

// components
import { TopNav } from './Components/TopNav'

export class App extends React.Component {
    constructor(){
        super()
        this.state = {
            artists: [],
            songs:[],
            songData: {}
        }
    }
    componentDidMount() {
        fetch(`${process.env.REACT_APP_API}/songs`)
            .then(response => response.json())
            .catch(error => console.error("ERROR ", error))
            .then(json => this.setState({
                songs: json
            }))

        fetch(`${process.env.REACT_APP_API}/artists`)
            .then(response => response.json())
            .catch(error => console.error("ERROR ", error))
            .then(json => this.setState({
                artists: json
            }))
    }
    setSongPath = (path, id, visible) => {
        this.setState({
            songData: {
                path: path,
                id: id,
                visible: visible
            }
        })
    }
    getSongPath = () => {
        return this.state.songData
    }
    render() {
        const {songs, artists} = this.state
        return (
            <TopNav 
                songs={songs} 
                artists={artists}
                songFn={{getSongPath: this.getSongPath, setSongPath: this.setSongPath}}
            />
        );
    }
}