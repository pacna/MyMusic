import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    InputLabel,
    OutlinedInput,
    styled,
    Checkbox,
    Button,
    DialogActions,
} from "@mui/material";
import {
    IMusicApiService,
    ServiceApiContext,
    SongPutRequest,
    SongResponse,
    StyledPrimaryButton,
} from "@mymusic/shared";
import {
    ChangeEvent,
    ReactElement,
    useContext,
    useEffect,
    useReducer,
} from "react";

function managementReducer(
    state: SongPutRequest,
    action: {
        property: string | string[];
        payload: string | boolean | number | SongPutRequest;
    }
) {
    if (Array.isArray(action.property)) {
        return {
            ...state,
            ...Object.fromEntries(
                action.property.map((p: string) => [
                    p,
                    (action.payload as SongPutRequest)[p],
                ])
            ),
        };
    }

    switch (action.property) {
        case "title":
            return {
                ...state,
                title: action.payload as string,
            };
        case "artist":
            return {
                ...state,
                artist: action.payload as string,
            };
        case "path":
            return {
                ...state,
                path: action.payload as string,
            };
        case "album":
            return {
                ...state,
                album: action.payload as string,
            };
        case "isFavorite":
            return {
                ...state,
                isFavorite: action.payload as boolean,
            };
        case "length":
            return {
                ...state,
                length: action.payload as number,
            };
        default:
            return state;
    }
}

const StyledFormControl = styled(FormControl)({
    width: "100%",
});

export default function SongManagementModal({
    id,
    open,
    closeModal,
}: {
    id?: string;
    open: boolean;
    closeModal: () => void;
}): ReactElement {
    const [managementState, managementDispatch] = useReducer(
        managementReducer,
        { isFavorite: false } as SongPutRequest
    );
    const service: IMusicApiService =
        useContext<IMusicApiService>(ServiceApiContext);

    const isEdit = (): boolean => {
        return !!id;
    };
    const displayTitleText = (): string => {
        return isEdit() ? "Edit Song" : "Add Song";
    };

    const handleInput = (
        property: string,
        evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void => {
        managementDispatch({ property, payload: evt.target.value });
    };

    const handleSubmit = async (): Promise<void> => {
        const response: Promise<[SongResponse, Error]> = !isEdit()
            ? service.createSong(managementState)
            : service.updateSong(id, managementState);

        const [_, err] = await response;

        if (err != null) {
            console.error(`Unable to ${isEdit() ? "Edit" : "Add"} song`, err);
            return;
        }

        closeModal();
    };

    const handleCloseDialog = (): void => {
        if (!isEdit()) {
            managementDispatch({
                property: [
                    "title",
                    "artist",
                    "path",
                    "album",
                    "isFavorite",
                    "length",
                ],
                payload: { isFavorite: false } as SongPutRequest,
            });
        }
        closeModal();
    };

    const isValid = (): boolean => {
        const isNotEmpty = (input: string): boolean => {
            return input?.length > 0;
        };
        return (
            isNotEmpty(managementState.title) &&
            isNotEmpty(managementState.album) &&
            isNotEmpty(managementState.artist) &&
            isNotEmpty(managementState.path)
        );
    };

    useEffect((): void => {
        (async () => {
            if (isEdit()) {
                const [response, _] = await service.getSong(id);
                managementDispatch({
                    property: [
                        "title",
                        "artist",
                        "path",
                        "album",
                        "isFavorite",
                        "length",
                    ],
                    payload: response,
                });
            }
        })();
    }, []);

    return (
        <Dialog open={open} fullWidth={true} onClose={handleCloseDialog}>
            <DialogTitle>{displayTitleText()}</DialogTitle>
            <DialogContent>
                <Box
                    component="form"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                    }}
                >
                    <StyledFormControl required sx={{ marginTop: "20px" }}>
                        <InputLabel htmlFor="title">Title</InputLabel>
                        <OutlinedInput
                            defaultValue={managementState.title}
                            id="title"
                            label="Title"
                            onChange={(
                                evt: ChangeEvent<
                                    HTMLInputElement | HTMLTextAreaElement
                                >
                            ) => handleInput("title", evt)}
                        />
                    </StyledFormControl>
                    <StyledFormControl required>
                        <InputLabel>Artist</InputLabel>
                        <OutlinedInput
                            defaultValue={managementState.artist}
                            label="Artist"
                            onChange={(
                                evt: ChangeEvent<
                                    HTMLInputElement | HTMLTextAreaElement
                                >
                            ) => handleInput("artist", evt)}
                        />
                    </StyledFormControl>
                    <StyledFormControl required>
                        <InputLabel>Album</InputLabel>
                        <OutlinedInput
                            defaultValue={managementState.album}
                            label="Album"
                            onChange={(
                                evt: ChangeEvent<
                                    HTMLInputElement | HTMLTextAreaElement
                                >
                            ) => handleInput("album", evt)}
                        />
                    </StyledFormControl>
                    <StyledFormControl required>
                        <InputLabel>URL</InputLabel>
                        <OutlinedInput
                            defaultValue={managementState.path}
                            label="URL"
                            onChange={(
                                evt: ChangeEvent<
                                    HTMLInputElement | HTMLTextAreaElement
                                >
                            ) => handleInput("path", evt)}
                        />
                    </StyledFormControl>
                    <FormControlLabel
                        sx={{
                            display: "inherit",
                            justifyContent: "flex-end",
                            pointerEvents: "none",
                        }}
                        label="Favorite"
                        control={
                            <Checkbox
                                sx={{ pointerEvents: "auto" }}
                                onChange={(
                                    evt: ChangeEvent<HTMLInputElement>
                                ) =>
                                    managementDispatch({
                                        property: "isFavorite",
                                        payload: evt.target.checked,
                                    })
                                }
                                defaultChecked={managementState.isFavorite}
                            />
                        }
                    />
                </Box>
            </DialogContent>
            <DialogActions sx={{ marginTop: "20px" }}>
                <Button onClick={handleCloseDialog}>Close</Button>
                <StyledPrimaryButton
                    onClick={handleSubmit}
                    type="submit"
                    disabled={!isValid()}
                >
                    Submit
                </StyledPrimaryButton>
            </DialogActions>
        </Dialog>
    );
}
