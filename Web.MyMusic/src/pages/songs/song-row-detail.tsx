import { PlayArrow } from "@mui/icons-material";
import { TableCell, TableRow, styled } from "@mui/material";
import { ReactElement, useState } from "react";
import { SongRowDetailConfig } from "./types/song-row-detail-config";

const StyledPlayArrow = styled(PlayArrow)({
    "&:hover": {
        cursor: "pointer",
    },
});

export const SongRowDetail = ({
    title,
    artist,
    length,
    index,
}: SongRowDetailConfig): ReactElement => {
    const [hovered, setHovered] = useState<boolean>(false);

    const playSong = (): void => {
        console.log("hi");
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
                {hovered ? <StyledPlayArrow onClick={playSong} /> : index + 1}
            </TableCell>
            <TableCell align="left">{title}</TableCell>
            <TableCell align="left">{artist}</TableCell>
            <TableCell align="right"> {displayDuration(length)}</TableCell>
        </TableRow>
    );
};
