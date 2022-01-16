// react
import { useEffect, useState } from 'react'

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

// types
import { FavoriteResponse, SongResponse } from '../components/types/responses';
import { useDispatch } from 'react-redux';
import { setSongData } from '../reducers/song-data-slice';
import axios, { AxiosResponse } from 'axios';

export const FavoritesDialog = (props: { open: boolean, closeFavDialog: () => void}): JSX.Element => {
    const { open, closeFavDialog } = props;
    const [ isFavDialogOpen, setIsFavDialogOpen ] = useState(open);
    const [favorites, setFavorites] = useState([]);
    const dispatch = useDispatch();

    const handleClose = (): void => {
        closeFavDialog();
        setIsFavDialogOpen(!isFavDialogOpen);

    }

    const setSongPath = (path: string, id: string, visible: boolean): void => {
        dispatch(setSongData({path: path, id: id, visible: visible}));
    }

    const playMusic = (title: string, songs: SongResponse[]): void => {
        songs.forEach((song: SongResponse) => {
            if(song.title === title){
                setSongPath(song.path, song._id, true);
                return;
            }
        })
    }

    const getFavorites = (): void =>  {
        axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_API}/songs/favorites`)
        .then((response: AxiosResponse) => response.data)
        .catch((error: Error) => console.error(error))
        .then((result: Array<FavoriteResponse>) => setFavorites(result));
    }

    useEffect(() => {
        getFavorites();
    }, [])

    return(
        <Dialog
            open={isFavDialogOpen}
            onClose={handleClose}
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
                                        <ListItem button onClick={()=> playMusic(favorite.title, favorites)}>
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
                <Button onClick={handleClose} color="primary">Close</Button>
            </DialogActions>
        </Dialog>
    )
}