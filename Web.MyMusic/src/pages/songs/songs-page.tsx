import {
    ReactElement,
    Suspense,
    lazy,
    useContext,
    useReducer,
    useState,
} from "react";
import {
    Box,
    Fab,
    Pagination,
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
    Color,
    SongResponse,
    SongSearchRequest,
} from "@mymusic/shared/types";
import { useLocalStorage, useSearch } from "@mymusic/shared/hooks";
import { SongRowDetail, SongTitleSearch } from "./components";

const SongManagementModal = lazy(
    () => import("./components/song-management-modal")
);

function searchRequestReducer(
    state: SongSearchRequest,
    action: { property: string; payload: string | number }
): SongSearchRequest {
    switch (action.property) {
        case "sortBy":
            return {
                ...state,
                sortBy: action.payload as string,
            };

        case "title":
            return {
                ...state,
                title: action.payload as string,
            };
        case "idx":
            return {
                ...state,
                idx: action.payload as number,
            };
        case "qty": {
            return {
                ...state,
                qty: action.payload as number,
            };
        }
        default:
            return state;
    }
}

export const SongsPage = (): ReactElement => {
    const { audioPlayerDispatch } =
        useContext<AudioPlayerContextConfig>(AudioPlayerContext);
    const [cacheTitle, _] = useLocalStorage<string>("search", "");
    const [toggleManagement, setToggleManagement] = useState<boolean>(false);
    const [searchRequestState, searchRequestDispatch] = useReducer(
        searchRequestReducer,
        {
            title: cacheTitle,
            sortBy: "title:asc",
            idx: 0,
            qty: 10,
        } as SongSearchRequest
    );
    const [collection, forceCollectionUpdate] = useSearch(searchRequestState);

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

    const closeManagementModal = (): void => {
        setToggleManagement(false);
        forceCollectionUpdate();
    };

    const handlePagination = (_: any, value: number): void => {
        searchRequestDispatch({
            property: "idx",
            payload: (value - 1) * searchRequestState.qty,
        });
    };

    return (
        <>
            <Suspense>
                <SongManagementModal
                    open={toggleManagement}
                    closeModal={closeManagementModal}
                />
            </Suspense>
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
                            onClick={() => setToggleManagement(true)}
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
                                        forceCollectionUpdate={
                                            forceCollectionUpdate
                                        }
                                    />
                                )
                            )}
                        </TableBody>
                    </Table>
                    <Pagination
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            paddingTop: "1em",
                            paddingBlock: "1em",
                        }}
                        onChange={handlePagination}
                        count={Math.ceil(
                            collection.total / searchRequestState.qty
                        )}
                        showFirstButton
                        showLastButton
                    ></Pagination>
                </TableContainer>
            </Box>
        </>
    );
};
