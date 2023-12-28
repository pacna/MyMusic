import {
    MouseEvent,
    ReactElement,
    Suspense,
    lazy,
    useContext,
    useEffect,
    useState,
} from "react";
import {
    Favorite,
    FavoriteBorder,
    MoreHoriz,
    PlayArrow,
} from "@mui/icons-material";
import {
    Box,
    IconButton,
    Menu,
    MenuItem,
    TableCell,
    TableRow,
} from "@mui/material";
import {
    AudioPlayerContextConfig,
    AudioPlayerInfo,
    Color,
} from "@shared/types";
import { IMusicApiService } from "@shared/services";
import { AudioPlayerContext, ServiceApiContext } from "@shared/contexts";
import wavePath from "../assets/wave.gif";
import { SongRowDetailConfig } from "../types/song-row-detail-config";

const SongManagementModal = lazy(() => import("./song-management-modal"));
const SongRemovalModal = lazy(() => import("./song-removal-modal"));

export const SongRowDetail = (props: {
    config: SongRowDetailConfig;
    forceCollectionUpdate: () => void;
}): ReactElement => {
    const { id, path, title, artist, length, isFavorite, index } = props.config;
    const [menuAnchorElement, setMenuAnchorElement] =
        useState<null | HTMLElement>(null);
    const [toggleManagement, setToggleManagement] = useState<boolean>(false);
    const [toggleRemoval, setToggleRemoval] = useState<boolean>(false);
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

    const handleOpenMenu = (evt: MouseEvent<HTMLButtonElement>): void => {
        evt.stopPropagation();
        setMenuAnchorElement(evt.currentTarget);
    };

    const closeManagementModal = (): void => {
        setToggleManagement(false);
        props.forceCollectionUpdate();
    };

    const closeRemovalModal = (): void => {
        setToggleRemoval(false);
        props.forceCollectionUpdate();
    };

    useEffect((): void => {
        setFavorite(isFavorite);
    }, [isFavorite]);

    return (
        <>
            <Suspense>
                <SongRemovalModal
                    id={id}
                    title={title}
                    open={toggleRemoval}
                    closeModal={closeRemovalModal}
                />
            </Suspense>
            <Suspense>
                <SongManagementModal
                    id={id}
                    open={toggleManagement}
                    closeModal={closeManagementModal}
                />
            </Suspense>
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
                    <Box
                        sx={{
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
                        <IconButton onClick={handleOpenMenu}>
                            <MoreHoriz sx={{ color: Color.Black }} />
                        </IconButton>
                    </Box>
                </TableCell>
            </TableRow>
            <Menu
                anchorEl={menuAnchorElement}
                open={Boolean(menuAnchorElement)}
                onClose={() => setMenuAnchorElement(null)}
            >
                <MenuItem
                    onClick={() => setToggleManagement(true)}
                    sx={{ color: Color.BlueMarguerite }}
                >
                    Edit
                </MenuItem>
                <MenuItem
                    onClick={() => setToggleRemoval(true)}
                    sx={{ color: Color.Red }}
                >
                    Delete
                </MenuItem>
            </Menu>
        </>
    );
};
