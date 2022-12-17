// React
import { useState } from "react";

// Material
import {
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Box,
} from "@mui/material";
import { LibraryMusic, FavoriteBorder } from "@mui/icons-material";

// Types
import { SidebarConfig } from "./types/configs/sidebar-config";

// Styles
import classes from "../styles/search-dialog.module.scss";

// Others
import { FavoritesDialog } from "./favorites-dialog";
import { ModalManagement } from "./modal-management";

export const Sidebar = (props: SidebarConfig): JSX.Element => {
    const [isFavDialogOpen, setIsFavDialogOpen] = useState<boolean>(false);
    const { toggle, closeDrawer } = props;

    const openFavDialog = (): void => {
        setIsFavDialogOpen(true);
    };

    const closeFavDialog = (): void => {
        setIsFavDialogOpen(false);
    };

    return (
        <Drawer open={toggle} onClose={closeDrawer}>
            <Box className={classes.list}>
                <List>
                    <ListItem className={classes.header}>
                        <ListItemText
                            primary={
                                <Typography className={classes.headerText}>
                                    General
                                </Typography>
                            }
                        />
                    </ListItem>
                    <ListItem button onClick={closeDrawer}>
                        <ListItemIcon>
                            <LibraryMusic />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography
                                    className={classes.secondaryHeaderText}
                                >
                                    Music Library
                                </Typography>
                            }
                        />
                    </ListItem>
                    <ListItem className={classes.header}>
                        <ListItemText
                            primary={
                                <Typography className={classes.headerText}>
                                    My List
                                </Typography>
                            }
                        />
                    </ListItem>
                    <ListItem button onClick={openFavDialog}>
                        <ListItemIcon>
                            <FavoriteBorder />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography
                                    className={classes.secondaryHeaderText}
                                >
                                    Favorites
                                </Typography>
                            }
                        />
                    </ListItem>
                </List>
                <ModalManagement
                    isOpen={isFavDialogOpen}
                    renderComponent={
                        <FavoritesDialog
                            open={isFavDialogOpen}
                            closeFavDialog={closeFavDialog}
                        />
                    }
                />
            </Box>
        </Drawer>
    );
};
