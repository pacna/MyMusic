// react
import { ChangeEvent, useEffect, useState } from 'react';

// material
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

// types
import { SearchDialogConfig } from './types';
import { SearchMusicRequest, MusicResponse } from '../services/types/api';

// third party
import { useDispatch } from 'react-redux';

// others
import { setSongData } from '../redux/reducers/song-data-slice';

// services
import { MusicApiService } from '../services/music-api.service';

// functions
import { debounce } from './helpers/functions';

export const SearchDialog = (props: SearchDialogConfig): JSX.Element => {
    const { open, closeSearchDialog } = props;
    const [ isSearchDialogOpen, setSearchDialogOpen ] = useState<boolean>(open);
    const [ songs, setSongs ] = useState<MusicResponse[]>([] as MusicResponse[]);
    const service = new MusicApiService()
    const dispatch = useDispatch(); 

    const handleClose = (): void => {
        closeSearchDialog();
        setSearchDialogOpen(!open);
    }

    const handleSearchInput = debounce((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => searchMusic({ title: event.target.value} as SearchMusicRequest));

    const setSongPath = (path: string, id: string, visible: boolean): void => {
        dispatch(setSongData({ path: path, id: id, visible: visible}));
    }

    const playMusic = (path: string, id: string): void => {
        setSongPath(path, id, true)
    }

    const searchMusic = async(request: SearchMusicRequest = {} as SearchMusicRequest): Promise<void> => {
        setSongs(await service.searchMusic(request));
    }

    useEffect(() => {
        searchMusic();
    }, []);

    return(
        <Dialog
            open={isSearchDialogOpen}
            onClose={handleClose}
            fullWidth={true}
            maxWidth = {'md'}
        >
            <DialogTitle>Search</DialogTitle>
            <DialogContent>
                <TextField label="Songs" fullWidth margin="dense" onChange={handleSearchInput}/>
                    <List>
                        {
                            songs?.map((song: MusicResponse, index: number)  => {
                                return(
                                    <div key={index}>
                                        <ListItem button onClick={() => playMusic(song.path, song.id)}>
                                            <ListItemText primary={song.title} />
                                        </ListItem>
                                        <Divider />
                                    </div>  
                                )
                            })
                        }
                    </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">Close</Button>
            </DialogActions>
        </Dialog>
    )
}