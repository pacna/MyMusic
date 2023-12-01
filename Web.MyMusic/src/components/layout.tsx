import {
    AppBar,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { ReactElement } from "react";
import { ArtistIcon } from "../icons/artist-icon";

export const Layout = (): ReactElement => {
    const drawerWidth: number = 240;

    return (
        <>
            <Drawer
                variant="permanent"
                sx={{
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                    },
                }}
            >
                <List>
                    {["Search", "Favorites", "Artist"].map(
                        (text: string, index: number) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon>
                                        {index % 2 === 0 ? (
                                            <SearchIcon
                                                sx={{ color: "white" }}
                                            />
                                        ) : (
                                            <ArtistIcon color="white" />
                                        )}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        )
                    )}
                </List>
            </Drawer>
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth + 10}px)` },
                }}
            >
                <Toolbar>
                    <Typography
                        component="h1"
                        className="grow text-center !text-xl !font-medium"
                    >
                        MyMusic
                    </Typography>
                </Toolbar>
            </AppBar>
        </>
    );
};
