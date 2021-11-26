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
import { Favorite, FavoritesDialogProps, FavoritesDialogStates } from '../interfaces/FavoritesDialog.interface';
import { SongResponse } from '../interfaces';


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

    playMusic = (title: string, songs: Array<SongResponse>): void => {
        const {songFn} = this.props;
        songs.forEach(song => {
            if(song.title === title){
                songFn.setSongPath(song.path, song._id, true);
            }
        })
    }

    private fetchFavorites(open: boolean): void {
        fetch(`${process.env.REACT_APP_API}/songs/favorites`)
            .then(response => response.json())
            .catch(error => console.error('ERROR', error))
            .then(json => this.setState({
                open: open,
                favorites: json
            }))
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
                                    favorites && favorites.map((a: Favorite)=> {
                                        return(
                                            <div key={a._id}>
                                                <ListItem button onClick={()=> this.playMusic(a.title, favorites)}>
                                                    <ListItemText primary={a.title}/>
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