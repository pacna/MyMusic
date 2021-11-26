// react
import { ChangeEvent, Component } from 'react';

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
} from '@mui/material';
import { SearchDialogProps, SearchDialogStates } from '../interfaces/SearchDialog.interface';

export class SearchDialog extends Component<SearchDialogProps, Partial<SearchDialogStates>>{
    constructor(props:SearchDialogProps) {
        super(props)

        this.state = {
            open: false,
            input: ''
        }
    }

    componentDidMount(): void {
        const { open } = this.props;
        this.setState({
            open: open
        })
    }

    handleClose = (): void =>{
        const { open, closeSearchDialog } = this.props;
        closeSearchDialog()

        this.setState({
            open: !open
        })

    }
    handleInput = (params: string) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        this.setState({
            [params]: (event.target).value
        })
    }

    playMusic = (path: string, id: string): void => {
        const {songFn} = this.props;
        songFn.setSongPath(path, id, true)
    }

    render(): JSX.Element {
        const {songs} = this.props;
        const {input} = this.state
        return(
            <div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth={true}
                    maxWidth = {'md'}
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