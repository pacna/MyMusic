// React
import React from "react";

// Material
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

// Third party
import { useDispatch } from "react-redux";

// Types
import classes from "./../styles/top-nav.module.scss";

// Others
import { openDrawer } from "../redux/reducers/toggle-drawer-slice";
import { openSearch } from "../redux/reducers/toggle-search-slice";

export const TopNav = (): JSX.Element => {
    const dispatch = useDispatch();

    const showDrawer = (): void => {
        dispatch(openDrawer());
    };

    const openSearchDialog = (): void => {
        dispatch(openSearch());
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Grid container alignItems="center">
                    <Grid item xs={2}>
                        <IconButton
                            onClick={showDrawer}
                            className={classes.menu}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography
                            variant="h6"
                            className={classes.musicLibrary}
                        >
                            Music Library
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <IconButton
                            onClick={openSearchDialog}
                            className={classes.search}
                        >
                            <SearchIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};
