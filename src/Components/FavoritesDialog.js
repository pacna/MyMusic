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
            songs: []
        }
    }
    componentDidMount(){
        const { open, songs } = this.props
        this.setState({
            open: open,
            songs: songs && songs.filter(a => a.favorite !== false).map( x => {
                return x;
            })
        })
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
        return(
            <div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth={true}
                    maxWidth = {'sm'}
                    onExited={closeFavDialog}
                >
                    <DialogTitle>Favorites</DialogTitle>
                    <DialogContent>
                            <List>
                                {
                                    this.state.songs && this.state.songs.map((a)=> {
                                        return(
                                            <div key={a._id}>
                                                <ListItem button onClick={()=> this.playMusic(a.title, this.props.songs)}>
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