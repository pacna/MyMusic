// react
import { useEffect, useState } from 'react'

// material
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
import { MusicResponse, SearchMusicRequest } from '../services/types/api';
import { FavoritesDialogConfig } from './types/configs/favorites-dialog-config';

// third party
import { useDispatch } from 'react-redux';

// others
import { setSongData } from '../reducers/song-data-slice';

// services
import { MusicApiService } from '../services/music-api.service';

export const FavoritesDialog = (props: FavoritesDialogConfig): JSX.Element => {
    const { open, closeFavDialog } = props;
    const [ isFavDialogOpen, setIsFavDialogOpen ] = useState<boolean>(open);
    const [favorites, setFavorites] = useState<MusicResponse[]>([]);
    const dispatch = useDispatch();
    const service = new MusicApiService();

    const handleClose = (): void => {
        closeFavDialog();
        setIsFavDialogOpen(!isFavDialogOpen);
    }

    const setSongPath = (path: string, id: string, visible: boolean): void => {
        dispatch(setSongData({path: path, id: id, visible: visible}));
    }

    const playMusic = (id: string, music: MusicResponse[]): void => {
        const song: MusicResponse = music.find((x: MusicResponse) => x.id === id);
        setSongPath(song.path, song.id, true);
    }

    const searchMusic = async(): Promise<void> =>  {
        const request: SearchMusicRequest = {
            isFavorite: true
        } as SearchMusicRequest

        setFavorites(await service.searchMusic(request));
    }

    useEffect(() => {
        searchMusic();
    }, [])

    return(
        <Dialog
            open={isFavDialogOpen}
            onClose={handleClose}
            fullWidth={true}
            maxWidth = {'md'}
        >
            <DialogTitle>Favorites</DialogTitle>
            <DialogContent>
                    <List>
                        {
                            favorites?.map((favorite: MusicResponse)=> {
                                return(
                                    <div key={favorite.id}>
                                        <ListItem button onClick={()=> playMusic(favorite.id, favorites)}>
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