import {
    ReactElement,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
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
import { IMusicApiService } from "@mymusic/services/imusic-api.service";
import { ServiceApiContext } from "@mymusic/contexts";
import {
    CollectionResponse,
    Color,
    SongResponse,
    SongSearchRequest,
} from "@mymusic/types";
import { useLocalStorage } from "@mymusic/hooks";
import { SongRowDetail, SongTitleSearch } from "./components";

export const SongsPage = (): ReactElement => {
    const service: IMusicApiService =
        useContext<IMusicApiService>(ServiceApiContext);
    const [songs, setSongs] = useState<SongResponse[]>([]);
    const [cacheTitle, _] = useLocalStorage<string, string>("search", "");

    const searchAndSetSongs = useCallback(
        async (request: SongSearchRequest) => {
            const [collection, _]: [CollectionResponse<SongResponse>, Error] =
                await service.searchSongs(request);
            setSongs(collection.list);
        },
        [service]
    );

    useEffect((): void => {
        searchAndSetSongs({
            title: cacheTitle,
            sortBy: "title:asc",
        } as SongSearchRequest);
    }, [searchAndSetSongs]);

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
                    <Fab sx={{ backgroundColor: Color.BlueMarguerite }}>
                        <Add sx={{ color: Color.White }} />
                    </Fab>
                    <Fab sx={{ backgroundColor: Color.NeonPink }}>
                        <Shuffle sx={{ color: Color.White }} />
                    </Fab>
                </div>
                <SongTitleSearch searchAndSetSongs={searchAndSetSongs} />
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
                        {songs.map((song: SongResponse, index: number) => (
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
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};
