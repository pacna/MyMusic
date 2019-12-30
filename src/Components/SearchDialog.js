// react
import React from 'react';

// @material-ui
import { 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle, 
    Button, 
    TextField,
    ListItemText,
    List,
    ListItem,
    Divider
} from '@material-ui/core';

export class SearchDialog extends React.Component{
    constructor(){
        super()
        this.state = {
            open: false,
            input: ''
        }
    }
    componentDidMount(){
        const { open } = this.props;
        this.setState({
            open: open
        })
    }
    handleClose = () =>{
        const { open } = this.props;
        this.setState({
            open: !open
        })
    }
    handleInput = params => evt => {
        this.setState({
            [params]: evt.target.value
        })
    }
    playMusic = (path, id) => {
        const {songFn} = this.props;
        songFn.setSongPath(path, id, true)
    }
    render(){
        const {closeSearchDialog, songs} = this.props;
        const {input} = this.state
        return(
            <div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth={true}
                    maxWidth = {'md'}
                    onExited={closeSearchDialog}
                >
                    <DialogTitle>Search</DialogTitle>
                    <DialogContent>
                        <TextField label="Songs" fullWidth margin="dense" onChange={this.handleInput("input")}/>
                        {
                            songs && (
                                <List>
                                    {
                                        songs.filter(song => song.title.toLowerCase().indexOf(input.toLowerCase()) !== -1).map((song, index) => {
                                            return(
                                                <div key={index}>
                                                    <ListItem button  style={{paddingLeft: "0px"}} onClick={() => this.playMusic(song.path, song._id)}>
                                                        <ListItemText primary={song.title} />
                                                    </ListItem>
                                                    <Divider />
                                                </div>  
                                            )
                                        })
                                    }
                                </List>

                            )
                        }
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}