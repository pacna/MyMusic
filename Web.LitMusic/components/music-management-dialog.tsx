// React
import { ChangeEvent, useState, useEffect } from "react";

// Material
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    TextField,
    FormGroup,
    Checkbox,
    FormControlLabel,
} from "@mui/material";

// Types
import { MusicManagementDialogConfig, MusicManagementGroup } from "./types";
import {
    AddMusicRequest,
    UpdateMusicRequest,
    MusicResponse,
} from "../services/types/api";

// Third party
import { AxiosResponse } from "axios";

// Styles
import coreClasses from "./../styles/core.module.scss";
import classes from "./../styles/music-management.module.scss";

// Others
import { MusicApiService } from "@litmusic/services/music-api.service";
import { isEmpty } from "./helpers/functions";

export const MusicManagementDialog = (
    props: MusicManagementDialogConfig
): JSX.Element => {
    const { toggle, musicId, closeMusicManagementDialog } = props;
    const [isMusicManagementDialogOpen, setMusicManagementDialogOpen] =
        useState<boolean>(toggle);
    const [musicManagementGroup, setMusicManagementGroup] =
        useState<MusicManagementGroup>({
            title: "",
            album: "",
            artist: "",
            durationInMins: 0,
            durationInSecs: 0,
            path: "",
            isFavorite: false,
        } as MusicManagementGroup);

    const service = new MusicApiService();

    const handleClose = (hasSubmitted: boolean = false): void => {
        setMusicManagementDialogOpen(!toggle);
        closeMusicManagementDialog(hasSubmitted);
    };

    const handleTitleChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void => {
        setMusicManagementGroup(
            Object.assign({}, musicManagementGroup, {
                title: event.target.value,
            })
        );
    };

    const handleAlbumChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void => {
        setMusicManagementGroup(
            Object.assign({}, musicManagementGroup, {
                album: event.target.value,
            })
        );
    };

    const handleArtistChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void => {
        setMusicManagementGroup(
            Object.assign({}, musicManagementGroup, {
                artist: event.target.value,
            })
        );
    };

    const handleDurationInMinsChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void => {
        setMusicManagementGroup(
            Object.assign({}, musicManagementGroup, {
                durationInMins: event.target.value,
            })
        );
    };

    const handleDurationInSecsChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void => {
        setMusicManagementGroup(
            Object.assign({}, musicManagementGroup, {
                durationInSecs: event.target.value,
            })
        );
    };

    const handlePathChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void => {
        setMusicManagementGroup(
            Object.assign({}, musicManagementGroup, {
                path: event.target.value,
            })
        );
    };

    const handleIsFavoriteChange = (
        event: ChangeEvent<HTMLInputElement>
    ): void => {
        setMusicManagementGroup(
            Object.assign({}, musicManagementGroup, {
                isFavorite: event.target.checked,
            })
        );
    };

    const createRequest = (): AddMusicRequest | UpdateMusicRequest => {
        if (musicId) {
            return {
                title: musicManagementGroup.title,
                album: musicManagementGroup.album,
                artist: musicManagementGroup.artist,
                length: calculateLength(
                    musicManagementGroup.durationInMins,
                    musicManagementGroup.durationInSecs
                ),
                path: musicManagementGroup.path,
            } as UpdateMusicRequest;
        }

        return {
            title: musicManagementGroup.title,
            album: musicManagementGroup.album,
            artist: musicManagementGroup.artist,
            length: calculateLength(
                musicManagementGroup.durationInMins,
                musicManagementGroup.durationInSecs
            ),
            path: musicManagementGroup.path,
            isFavorite: musicManagementGroup.isFavorite,
        } as AddMusicRequest;
    };

    const handleSubmit = (): void => {
        if (isValid()) {
            if (musicId) {
                const request: UpdateMusicRequest = createRequest();
                service
                    .updateMusic(musicId, request)
                    .then((response: AxiosResponse) => response.data)
                    .catch((error) => console.error(error))
                    .then(() => {
                        handleClose(true);
                    });
            } else {
                const request: AddMusicRequest =
                    createRequest() as AddMusicRequest;
                service
                    .addMusic(request)
                    .then((response: AxiosResponse) => response.data)
                    .catch((error) => console.error(error))
                    .then(() => {
                        handleClose(true);
                    });
            }
        }
    };

    const isValid = (): boolean => {
        const { title, album, artist, durationInMins, durationInSecs, path } =
            musicManagementGroup;
        return (
            !isEmpty(title) &&
            !isEmpty(album) &&
            !isEmpty(artist) &&
            (durationInMins > 0 || durationInSecs > 0) &&
            !isEmpty(path)
        );
    };

    const calculateLength = (
        durationInMins: number,
        durationInSecs: number
    ): number => {
        return durationInMins * 60 + durationInSecs;
    };

    const displayMusicManagementTitleText = (): string => {
        return musicId ? "Edit Music" : "Add Music";
    };

    const toggleDisplayingFavoriteCheckbox = (): JSX.Element | void => {
        if (musicId) {
            return;
        }

        return (
            <FormGroup className={coreClasses.mt24}>
                <FormControlLabel
                    control={
                        <Checkbox
                            required
                            checked={musicManagementGroup.isFavorite}
                            onChange={handleIsFavoriteChange}
                        />
                    }
                    label="Favorite"
                />
            </FormGroup>
        );
    };

    const getExistingMusic = async (): Promise<void> => {
        if (musicId) {
            const result: MusicResponse = await service.getMusic(musicId);
            setMusicManagementGroup(
                Object.assign({}, musicManagementGroup, {
                    title: result.title,
                    album: result.album,
                    artist: result.artist,
                    durationInMins: Math.floor(result.length / 60),
                    durationInSecs: result.length % 60,
                    path: result.path,
                    isFavorite: result.isFavorite,
                })
            );
        }
    };

    useEffect(() => {
        getExistingMusic();
    }, []);

    // Add <> </> to get around "This JSX tag's 'children' prop expects a single child of type 'Element | undefined', but multiple children were provided"
    return (
        <Dialog
            open={isMusicManagementDialogOpen}
            onClose={handleClose}
            fullWidth={true}
        >
            <DialogTitle>{displayMusicManagementTitleText()}</DialogTitle>
            <DialogContent>
                <>
                    <TextField
                        margin="normal"
                        label="Title"
                        required
                        fullWidth
                        variant="outlined"
                        onChange={handleTitleChange}
                        value={musicManagementGroup.title}
                    />
                    <TextField
                        margin="normal"
                        label="Album"
                        required
                        fullWidth
                        variant="outlined"
                        onChange={handleAlbumChange}
                        value={musicManagementGroup.album}
                    />
                    <TextField
                        margin="normal"
                        label="Artist"
                        fullWidth
                        variant="outlined"
                        onChange={handleArtistChange}
                        value={musicManagementGroup.artist}
                    />
                    <div className={classes.durationContainer}>
                        <TextField
                            margin="normal"
                            label="Minutes"
                            required
                            fullWidth
                            type="number"
                            variant="outlined"
                            inputProps={{ min: 0, max: 59 }}
                            onChange={handleDurationInMinsChange}
                            value={musicManagementGroup.durationInMins}
                        />
                        <TextField
                            margin="normal"
                            label="Seconds"
                            required
                            fullWidth
                            type="number"
                            variant="outlined"
                            onChange={handleDurationInSecsChange}
                            inputProps={{ min: 0, max: 59 }}
                            value={musicManagementGroup.durationInSecs}
                        />
                    </div>
                    <TextField
                        margin="normal"
                        label="Path"
                        required
                        fullWidth
                        variant="outlined"
                        onChange={handlePathChange}
                        value={musicManagementGroup.path}
                    />
                    {toggleDisplayingFavoriteCheckbox()}
                </>
            </DialogContent>
            <DialogActions>
                <Button color="secondary" onClick={() => handleClose()}>
                    Close
                </Button>
                <Button color="primary" onClick={handleSubmit}>
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};
