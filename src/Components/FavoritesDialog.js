import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';


class FavoritesDialog extends React.Component{
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
        songs.forEach((x, index) => {
            if(x.title === title){
                songFn.setSongPath(x.path, index, true);
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
export default FavoritesDialog