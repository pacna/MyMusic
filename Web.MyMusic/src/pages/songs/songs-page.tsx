import { ReactElement, useContext, useEffect, useState } from "react";
import { IMusicApiService } from "../../services/imusic-api.service";
import { ServiceApiContext } from "../../contexts";
import { CollectionResponse, SongResponse } from "../../types";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { AccessTime } from "@mui/icons-material";
import { SongRowDetail } from "./song-row-detail";

export const SongsPage = (): ReactElement => {
    const service: IMusicApiService =
        useContext<IMusicApiService>(ServiceApiContext);
    const [songs, setSongs] = useState<SongResponse[]>([]);

    useEffect((): void => {
        const searchAndSetSongs = async () => {
            const [collection, _]: [CollectionResponse<SongResponse>, Error] =
                await service.searchSongs();
            setSongs(collection.list);
        };

        searchAndSetSongs();
    }, [service]);
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: "320px" }}>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell align="left">Title</TableCell>
                        <TableCell align="left">Album</TableCell>
                        <TableCell align="right">
                            <AccessTime />
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {songs.map((song: SongResponse, index: number) => (
                        <SongRowDetail
                            key={song.id}
                            title={song.title}
                            artist={song.artist}
                            length={song.length}
                            index={index}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
