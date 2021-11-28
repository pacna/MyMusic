// react
import { Component } from 'react'

// @mui
import {
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle, 
    Button, 
    List,
    ListItem,
    ListItemText,
    Divider
} from '@mui/material';

// third party
import axios, { AxiosResponse } from 'axios';

// types
import { FavoritesDialogProps, FavoritesDialogStates } from '../types/FavoritesDialog.interface';
import { FavoriteResponse, SongResponse } from '../types/responses';


export class FavoritesDialog extends Component<FavoritesDialogProps, FavoritesDialogStates>{
    constructor(props: FavoritesDialogProps){
        super(props)
        this.state = {
            open: false,
            favorites: []
        }
    }

    componentDidMount(): void {
        const { open } = this.props
        this.fetchFavorites(open);
    }

    handleClose = (): void => {
        const { open, closeFavDialog } = this.props
        closeFavDialog();
        this.setState({
            open: !open
        })

    }

    playMusic = (title: string, songs: SongResponse[]): void => {
        const {songFn} = this.props;
        songs.forEach((song: SongResponse) => {
            if(song.title === title){
                songFn.setSongPath(song.path, song._id, true);
                return;
            }
        })
    }

    private fetchFavorites(open: boolean): void {
        axios.get(`${process.env.REACT_APP_API}/songs/favorites`)
        .then(((response: AxiosResponse) => response.data))
        .catch(error => console.error(error))
        .then((json: Array<FavoriteResponse>) => {
          this.setState({
            open: open,
            favorites: json
          })
        })
    }

    render(): JSX.Element {
        const { open, favorites} = this.state;
        return(
            <div>
                <Dialog
                    open={open}
                    onClose={this.handleClose}
                    fullWidth={true}
                    maxWidth = {'sm'}
                >
                    <DialogTitle>Favorites</DialogTitle>
                    <DialogContent>
                            <List>
                                {
                                    favorites?.map((favorite: FavoriteResponse)=> {
                                        return(
                                            <div key={favorite._id}>
                                                <ListItem button onClick={()=> this.playMusic(favorite.title, favorites)}>
                                                    <ListItemText primary={favorite.title}/>
                                                </ListItem>
                                                <Divider />
                                            </div>
                                        )
                                    })
                                }
                            </List>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}