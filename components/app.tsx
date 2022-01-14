// react
import { Component } from 'react';

// styles
// import '../styles/app.css';

// components
import { TopNav } from './top-nav';
import { MainContent } from './main-content';
import { SearchDialog } from './search-dialog';

// types
import { AppProps, AppStates, SongData, SongFn } from './types';

export class App extends Component<AppProps, AppStates> {
  constructor(props: AppProps){
    super(props)
    this.state = {
        songData: {} as SongData,
        searchOpen: false
    }
  }

  componentDidMount(): void {}

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


  private createSongFnObj(): SongFn {
    return {
      getSongPath: this.getSongPath,
      setSongPath: this.setSongPath,
      openSearchDialog: this.openSearchDialog
    }
  }

  render(): JSX.Element {
    const { songs, artists } = this.props;
    const { searchOpen } = this.state

    return (
      <div>
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
