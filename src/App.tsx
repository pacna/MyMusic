// react
import { Component } from 'react';

// styles
import './App.css';

// components
import { TopNav } from './components/TopNav';

// interfaces
import { AppProps, AppStates, SongData } from './interfaces';

export class App extends Component<AppProps, AppStates> {
  constructor(props: AppProps){
    super(props)
    this.state = {
        artists: [],
        songs:[],
        songData: {} as SongData
    }
  }

  componentDidMount(): void {
    this.fetchSongs();
    this.fetchArtists();
  }

  setSongPath = (path: string, id: string, visible: boolean): void => {
    this.setState({
        songData: {
            path: path,
            id: id,
            visible: visible
        }
    })
  }

  getSongPath = (): SongData => {
    return this.state.songData
  }

  private fetchSongs(): void {
    fetch(`${process.env.REACT_APP_API}/songs`)
        .then((response: Response) => response.json())
        .catch(error => console.error("ERROR ", error))
        .then(json => this.setState({
            songs: json
        }))
  }

  private fetchArtists(): void {
    fetch(`${process.env.REACT_APP_API}/artists`)
        .then((response: Response) => response.json())
        .catch(error => console.error("ERROR ", error))
        .then(json => this.setState({
            artists: json
        }))
  }

  render(): JSX.Element {
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
