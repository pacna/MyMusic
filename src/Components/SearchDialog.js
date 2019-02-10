import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';

class SearchDialog extends React.Component{
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
    playMusic = (path, index) => {
        const {songFn} = this.props;
        songFn.setSongPath(path, index, true)
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
                                        songs.filter(x => x.title.toLowerCase().indexOf(input.toLowerCase()) !== -1).map((a,index) => {
                                            return(
                                                <div key={index}>
                                                    <ListItem button  style={{paddingLeft: "0px"}} onClick={() => this.playMusic(a.path, index)}>
                                                        <ListItemText primary={a.title} />
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
export default SearchDialog