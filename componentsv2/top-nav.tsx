import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search'
import React from "react"

export const TopNav = (): JSX.Element => {
    return(
        <AppBar position="static">
            <Toolbar>
                <Grid container alignItems="center">
                    <Grid item xs={2} >
                        <IconButton style={{color: "white"}}>
                            <MenuIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6" style={{color: "white"}}>
                            Music Library
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <IconButton style={{color: "white", float: "right"}}>
                            <SearchIcon />
                        </IconButton>                               
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}