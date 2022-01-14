// react
import {Component } from 'react';

// @mui
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

// @mui icons
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search'

// types
import { TopNavProps, TopNavStates } from './types';

// components
import { Sidebar } from './sidebar';

export class TopNav extends Component<TopNavProps, TopNavStates>{
    constructor(props: TopNavProps){
        super(props)

        this.state = {
            toggle: false,
            favOpen: false
        }
    }

    toggleDrawer = (): void => {
        this.setState({
            toggle: true
        })
    }
    
    closeDrawer = (): void => {
        this.setState({
            toggle: false
        })
    }

    openFavDialog = (): void => {
        this.setState({
            favOpen: true
        })
    }

    closeFavDialog = (): void => {
        this.setState({
            favOpen: false
        })
    }

    render(): JSX.Element {
        const {toggle, favOpen} = this.state
        const { songFn } = this.props;
        return(
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Grid container alignItems="center">
                            <Grid item xs={2} >
                                <IconButton onClick={this.toggleDrawer} style={{color: "white"}}>
                                    <MenuIcon />
                                </IconButton>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="h6" style={{color: "white"}}>
                                    Music Library
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <IconButton onClick={songFn?.openSearchDialog} style={{color: "white", float: "right"}}>
                                    <SearchIcon />
                                </IconButton>                               
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <Sidebar
                    toggle={toggle}
                    closeDrawer={this.closeDrawer}
                    closeFavDialog={this.closeFavDialog}
                    openFavDialog={this.openFavDialog}
                    favOpen={favOpen}
                    songFn={songFn}
                />
            </div>
        )
    }
}