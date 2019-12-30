import React from 'react';
import TopNav from './Components/TopNav'
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
    setSongPath = (path, index, visible) => {
        this.setState({
            songData: {
                path: path,
                index: index,
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
            <div>
                <TopNav songs={songs} artists={artists} songFn={{getSongPath: this.getSongPath, setSongPath: this.setSongPath}}></TopNav>
            </div>
        );
    }
}