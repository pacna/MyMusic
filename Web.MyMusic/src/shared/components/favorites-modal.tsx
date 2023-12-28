import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    List,
    ListItemButton,
    ListItemText,
    Typography,
} from "@mui/material";
import { ReactElement, useContext } from "react";
import { SongResponse, SongSearchRequest } from "../types/api";
import { useSearch } from "../hooks/use-search";
import { AudioPlayerContextConfig, AudioPlayerInfo } from "../types/local";
import { AudioPlayerContext } from "../contexts/audio-player-context";
import { StyledPrimaryButton } from "./styled-buttons";

// this needs the export default to lazy load. weird
export default function FavoritesModal({
    open,
    closeModal,
}: {
    open: boolean;
    closeModal: () => void;
}): ReactElement {
    const { audioPlayerDispatch } =
        useContext<AudioPlayerContextConfig>(AudioPlayerContext);
    const [collection, _] = useSearch({
        sortBy: "title:asc",
        isFavorite: true,
    } as SongSearchRequest);

    const renderSongs = (): ReactElement => {
        if (collection.total == 0) {
            return (
                <Typography variant="body1" sx={{ fontSize: "1em" }}>
                    No songs
                </Typography>
            );
        }

        return (
            <List>
                {collection.list.map((song: SongResponse) => {
                    return (
                        <ListItemButton
                            key={song.id}
                            onClick={() =>
                                audioPlayerDispatch({
                                    property: ["id", "path"],
                                    payload: {
                                        id: song.id,
                                        path: song.path,
                                    } as AudioPlayerInfo,
                                })
                            }
                        >
                            <ListItemText primary={song.title} />
                        </ListItemButton>
                    );
                })}
            </List>
        );
    };
    return (
        <Dialog open={open} onClose={closeModal} fullWidth={true}>
            <DialogTitle>Favorites</DialogTitle>
            <DialogContent> {renderSongs()}</DialogContent>
            <DialogActions>
                <StyledPrimaryButton onClick={closeModal}>
                    Close
                </StyledPrimaryButton>
            </DialogActions>
        </Dialog>
    );
}
