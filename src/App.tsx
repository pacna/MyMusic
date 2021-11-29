// react
import { Component } from 'react';

// styles
import './App.css';

// components
import { TopNav } from './components/TopNav';
import { MainContent } from './components/MainContent';
import { SearchDialog } from './components/SearchDialog';

// third party
import axios, { AxiosResponse } from 'axios';

// types
import { AppProps, AppStates, ArtistResponse, SongData, SongFn, SongResponse } from './types';

export class App extends Component<AppProps, AppStates> {
  constructor(props: AppProps){
    super(props)
    this.state = {
        artists: [],
        songs:[],
        songData: {} as SongData,
        searchOpen: false
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

  openSearchDialog = (): void => {
    this.setState({
        searchOpen: true
    })
  }

  closeSearchDialog = (): void => {
    this.setState({
        searchOpen: false
    })
  }

  private fetchSongs(): void {
    axios.get(`${process.env.REACT_APP_API}/songs`)
        .then(((response: AxiosResponse) => response.data))
        .catch(error => console.error(error))
        .then((json: Array<SongResponse>) => {
          this.setState({
            songs: json
          })
        })
  }

  private fetchArtists(): void {
    axios.get(`${process.env.REACT_APP_API}/artists`)
        .then(((response: AxiosResponse) => response.data))
        .catch(error => console.error(error))
        .then((json: Array<ArtistResponse>) => {
          this.setState({
            artists: json
          })
        })
  }

  private createSongFnObj(): SongFn {
    return {
      getSongPath: this.getSongPath,
      setSongPath: this.setSongPath,
      openSearchDialog: this.openSearchDialog
    }
  }

  render(): JSX.Element {
    const { songs, artists, searchOpen } = this.state

    return (
      <div>
        <TopNav 
            songs={songs} 
            artists={artists}
            songFn={this.createSongFnObj()}
        />
        <MainContent 
          songs={songs} 
          artists={artists} 
          songFn={this.createSongFnObj()}
          />
          {
            searchOpen &&
            <SearchDialog 
              songFn={this.createSongFnObj()} 
              open={searchOpen} 
              closeSearchDialog={this.closeSearchDialog} 
              songs={songs}
              />
          }
      </div>
    );
  }
}
