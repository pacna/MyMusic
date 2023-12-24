import { ReactElement, useContext, useState } from "react";
import {
    Favorite,
    FavoriteBorder,
    MoreHoriz,
    PlayArrow,
} from "@mui/icons-material";
import { IconButton, TableCell, TableRow } from "@mui/material";
import {
    AudioPlayerContextConfig,
    AudioPlayerInfo,
    Color,
} from "@mymusic/shared/types/local";
import { IMusicApiService } from "@mymusic/shared/services/imusic-api.service";
import {
    AudioPlayerContext,
    ServiceApiContext,
} from "@mymusic/shared/contexts";
import wavePath from "../assets/wave.gif";
import { SongRowDetailConfig } from "../types/song-row-detail-config";

export const SongRowDetail = (props: {
    config: SongRowDetailConfig;
}): ReactElement => {
    const { id, path, title, artist, length, isFavorite, index } = props.config;
    const [hovered, setHovered] = useState<boolean>(false);
    const [favorite, setFavorite] = useState<boolean>(isFavorite);
    const service: IMusicApiService =
        useContext<IMusicApiService>(ServiceApiContext);
    const { audioPlayerState, audioPlayerDispatch } =
        useContext<AudioPlayerContextConfig>(AudioPlayerContext);

    const playSong = (): void => {
        audioPlayerDispatch({
            property: ["id", "visible", "path"],
            payload: { id, visible: true, path } as AudioPlayerInfo,
        });
    };

    const toggleFavorite = async (): Promise<void> => {
        const [_, error] = await service.updateFavoriteSong(id, {
            isFavorite: !favorite,
        });

        if (error != null) {
            console.error(error);
            return;
        }

        setFavorite(!favorite);
    };

    const displayWave = (): ReactElement => {
        return (
            audioPlayerState.id === id &&
            audioPlayerState.visible && (
                <img height="35px" src={wavePath} alt="sound wave" />
            )
        );
    };

    const displayDuration = (length: number): string => {
        const remainingSecs: number = length % 60;
        return `${Math.floor(length / 60)}:${
            remainingSecs < 10 ? "0" + remainingSecs : remainingSecs
        }`;
    };

    return (
        <TableRow
            onMouseOver={() => setHovered(true)}
            onMouseOut={() => setHovered(false)}
        >
            <TableCell>
                {hovered ? (
                    <IconButton onClick={playSong}>
                        <PlayArrow sx={{ color: Color.Black }} />
                    </IconButton>
                ) : (
                    index + 1
                )}
            </TableCell>
            <TableCell align="left">{title}</TableCell>
            <TableCell align="left">{artist}</TableCell>
            <TableCell
                align="right"
                sx={{
                    display: "flex",
                }}
            >
                <div
                    style={{
                        display: "inherit",
                        alignItems: "center",
                        gap: "8px",
                    }}
                >
                    {displayWave()}
                    <IconButton onClick={toggleFavorite}>
                        {favorite ? (
                            <Favorite sx={{ color: Color.Black }} />
                        ) : (
                            <FavoriteBorder sx={{ color: Color.Black }} />
                        )}
                    </IconButton>
                    {displayDuration(length)}
                    <IconButton>
                        <MoreHoriz sx={{ color: Color.Black }} />
                    </IconButton>
                </div>
            </TableCell>
        </TableRow>
    );
};
