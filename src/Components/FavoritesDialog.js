// react
import React from 'react'

// @material-ui
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
} from '@material-ui/core';


export class FavoritesDialog extends React.Component{
    constructor(){
        super()
        this.state = {
            open: false,
            favorites: []
        }
    }
    componentDidMount(){
        const { open } = this.props
        fetch(`${process.env.REACT_APP_API}/songs/favorites`)
            .then(response => response.json())
            .catch(error => console.error('ERROR', error))
            .then(json => this.setState({
                open: open,
                favorites: json
            }))
    }
    handleClose = () => {
        const { open } = this.props
        this.setState({
            open: !open
        })
    }
    playMusic = (title, songs) => {
        const {songFn} = this.props;
        songs.forEach(song => {
            if(song.title === title){
                songFn.setSongPath(song.path, song._id, true);
            }
        })
    }
    render(){
        const { closeFavDialog} = this.props;
        const { open, favorites} = this.state;
        return(
            <div>
                <Dialog
                    open={open}
                    onClose={this.handleClose}
                    fullWidth={true}
                    maxWidth = {'sm'}
                    onExited={closeFavDialog}
                >
                    <DialogTitle>Favorites</DialogTitle>
                    <DialogContent>
                            <List>
                                {
                                    favorites && favorites.map((a)=> {
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