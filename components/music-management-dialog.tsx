// react
import { ChangeEvent, useState } from 'react';

// material
import { 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle, 
    Button,
    TextField,
    FormGroup,
    Checkbox,
    FormControlLabel
} from '@mui/material';

// styles
import coreClasses from './../styles/core.module.scss';
import classes from './../styles/music-management.module.scss';

// types
import { AddMusicRequest, MusicManagementDialogConfig, MusicManagementGroup } from './types';
import axios, { AxiosResponse } from 'axios';

export const MusicManagementDialog = (props: MusicManagementDialogConfig): JSX.Element => {
    const { toggle, musicId, closeMusicManagementDialog } = props;
    const [ isMusicManagementDialogOpen, setMusicManagementDialogOpen ] = useState<boolean>(toggle);
    const [ musicManagementGroup, setMusicManagementGroup] = useState<MusicManagementGroup>({
        title: "",
        album: "",
        artist: "",
        durationInMins: 0,
        durationInSecs: 0,
        path: "",
        isFavorite: false
    } as MusicManagementGroup);


    const handleClose = (hasSubmitted: boolean = false): void => {
        setMusicManagementDialogOpen(!toggle);
        closeMusicManagementDialog(hasSubmitted);
    }

    const handleTitleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setMusicManagementGroup(Object.assign(musicManagementGroup, { title: event.target.value}));
    }

    const handleAlbumChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setMusicManagementGroup(Object.assign(musicManagementGroup, { album: event.target.value}));
    }

    const handleArtistChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setMusicManagementGroup(Object.assign(musicManagementGroup, { artist: event.target.value}));
    }

    const handleDurationInMinsChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setMusicManagementGroup(Object.assign(musicManagementGroup, { durationInMins: event.target.value}));
    }

    const handleDurationInSecsChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setMusicManagementGroup(Object.assign(musicManagementGroup, { durationInSecs: event.target.value}));
    }

    const handlePathChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setMusicManagementGroup(Object.assign(musicManagementGroup, { path: event.target.value}));
    }

    const handleIsFavoriteChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setMusicManagementGroup(Object.assign(musicManagementGroup, { isFavorite: event.target.checked}));
    }

    const handleSubmit = (): void => {
        if (isValid()) {
            const request: AddMusicRequest = {
                title: musicManagementGroup.title,
                album: musicManagementGroup.album,
                artist: musicManagementGroup.artist,
                length: calculateLength(musicManagementGroup.durationInMins, musicManagementGroup.durationInSecs),
                path: musicManagementGroup.path,
                isFavorite: musicManagementGroup.isFavorite
            };
            axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_API}/music`, request)
            .then((response: AxiosResponse) => response.data)
            .catch(error => console.error(error))
            .then(() => {
                handleClose(true);
            })
        }
    }

    const isValid = (): boolean => {
        const { title, album, artist, durationInMins, durationInSecs, path } = musicManagementGroup;
        return  !isEmpty(title) && 
                !isEmpty(album) &&
                !isEmpty(artist) &&
                (durationInMins > 0 || durationInSecs > 0) &&
                !isEmpty(path) 
    }

    const isEmpty = (value: string): boolean => {
        return value.length === 0;
    }

    const calculateLength = (durationInMins: number, durationInSecs: number): number => {
        return (durationInMins * 60) + durationInSecs;
    }


    return(
        <Dialog
            open={isMusicManagementDialogOpen}
            onClose={handleClose}
            fullWidth={true}
        >
            <DialogTitle>Add Music</DialogTitle>
            <DialogContent>
                <TextField
                    margin="normal"
                    label="Title"
                    required
                    fullWidth
                    variant="outlined"
                    onChange={handleTitleChange}
                    defaultValue={musicManagementGroup.title}
                />
                <TextField
                    margin="normal"
                    label="Album"
                    required
                    fullWidth
                    variant="outlined"
                    onChange={handleAlbumChange}
                    defaultValue={musicManagementGroup.album}
                />
                <TextField
                    margin="normal"
                    label="Artist"
                    fullWidth
                    variant="outlined"
                    onChange={handleArtistChange}
                    defaultValue={musicManagementGroup.artist}
                />
                <div className={classes.durationContainer}> 
                    <TextField
                        margin="normal"
                        label="Minutes"
                        required
                        fullWidth
                        type="number"
                        variant="outlined"
                        onChange={handleDurationInMinsChange}
                        defaultValue={musicManagementGroup.durationInMins}
                    />
                    <TextField
                        margin="normal"
                        label="Seconds"
                        required
                        fullWidth
                        type="number"
                        variant="outlined"
                        onChange={handleDurationInSecsChange}
                        defaultValue={musicManagementGroup.durationInSecs}
                    />
                </div>
                <TextField
                    margin="normal"
                    label="Path"
                    required
                    fullWidth
                    variant="outlined"
                    onChange={handlePathChange}
                    defaultValue={musicManagementGroup.path}
                />

            <FormGroup className={coreClasses.mt24}>
                <FormControlLabel control={<Checkbox required value={musicManagementGroup.isFavorite} onChange={handleIsFavoriteChange} />} label="Favorite" />
            </FormGroup>

            </DialogContent>
            <DialogActions>
                <Button color="secondary" onClick={() => handleClose()}>Close</Button>
                <Button color="primary" onClick={handleSubmit}>Submit</Button>
            </DialogActions>
        </Dialog>
    )
}