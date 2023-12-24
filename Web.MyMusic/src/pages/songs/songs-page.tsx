import { ReactElement, useContext, useReducer } from "react";
import {
    Box,
    Fab,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { Add, Shuffle } from "@mui/icons-material";
import { AudioPlayerContext } from "@mymusic/shared/contexts";
import {
    AudioPlayerContextConfig,
    AudioPlayerInfo,
    CollectionResponse,
    Color,
    SongResponse,
    SongSearchRequest,
} from "@mymusic/shared/types";
import { useLocalStorage, useSearch } from "@mymusic/shared/hooks";
import { SongRowDetail, SongTitleSearch } from "./components";

function searchRequestReducer(
    state: SongSearchRequest,
    action: { property: string; payload: string }
): SongSearchRequest {
    switch (action.property) {
        case "sortBy":
            return {
                ...state,
                sortBy: action.payload,
            };

        case "title":
            return {
                ...state,
                title: action.payload,
            };
        default:
            return state;
    }
}

export const SongsPage = (): ReactElement => {
    const { audioPlayerDispatch } =
        useContext<AudioPlayerContextConfig>(AudioPlayerContext);
    const [cacheTitle, _] = useLocalStorage<string>("search", "");
    const [searchRequestState, searchRequestDispatch] = useReducer(
        searchRequestReducer,
        { title: cacheTitle, sortBy: "title:asc" } as SongSearchRequest
    );
    const collection: CollectionResponse<SongResponse> =
        useSearch(searchRequestState);

    const playRandomSong = (songs: SongResponse[]): void => {
        const random: number = Math.floor(Math.random() * songs.length);
        audioPlayerDispatch({
            property: ["id", "path"],
            payload: {
                id: songs[random].id,
                path: songs[random].path,
            } as AudioPlayerInfo,
        });
    };

    return (
        <Box>
            <Box
                sx={{
                    display: "grid",
                    alignItems: "center",
                    gridTemplateColumns: "1fr 1fr",
                    padding: 1.5,
                }}
            >
                <div style={{ display: "flex", gap: "12px" }}>
                    <Fab
                        sx={{
                            backgroundColor: Color.BlueMarguerite,
                            "&:hover": {
                                backgroundColor: Color.BlueMarguerite,
                            },
                        }}
                        aria-label="add"
                    >
                        <Add sx={{ color: Color.White }} />
                    </Fab>
                    <Fab
                        onClick={() => playRandomSong(collection.list)}
                        sx={{
                            backgroundColor: Color.NeonPink,
                            "&:hover": {
                                backgroundColor: Color.NeonPink,
                            },
                        }}
                        aria-label="shuffle songs"
                    >
                        <Shuffle sx={{ color: Color.White }} />
                    </Fab>
                </div>
                <SongTitleSearch
                    searchRequestDispatch={searchRequestDispatch}
                />
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: "320px" }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="left">Title</TableCell>
                            <TableCell align="left">Artist</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {collection.list.map(
                            (song: SongResponse, index: number) => (
                                <SongRowDetail
                                    key={song.id}
                                    config={{
                                        id: song.id,
                                        path: song.path,
                                        title: song.title,
                                        artist: song.artist,
                                        length: song.length,
                                        isFavorite: song.isFavorite,
                                        index: index,
                                    }}
                                />
                            )
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};
