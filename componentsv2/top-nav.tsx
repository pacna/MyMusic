import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search'
import React from "react"
import { useDispatch } from "react-redux";
import { openDrawer } from "../reducers/toggle-drawer-slice";
import { openSearch } from "../reducers/toggle-search-slice";

export const TopNav = (): JSX.Element => {
    const dispatch = useDispatch();

    const showDrawer = (): void => {
        dispatch(openDrawer());
    }

    const openSearchDialog = (): void => {
        dispatch(openSearch());
    }
    
    return(
        <AppBar position="static">
            <Toolbar>
                <Grid container alignItems="center">
                    <Grid item xs={2} >
                        <IconButton onClick={showDrawer} style={{color: "white"}}>
                            <MenuIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6" style={{color: "white"}}>
                            Music Library
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <IconButton onClick={openSearchDialog} style={{color: "white", float: "right"}}>
                            <SearchIcon />
                        </IconButton>                               
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}