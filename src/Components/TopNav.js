// react
import React from 'react';

// @material-ui
import { 
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Grid
} from '@material-ui/core';

// @material-ui icons
import { Menu, Search } from '@material-ui/icons';

// components
import { SearchDialog } from './SearchDialog';
import { TabsNav } from './TabsNav';
import { Sidebar } from './Sidebar';

export class TopNav extends React.Component{
    constructor(){
        super()
        this.state = {
            toggle: false,
            searchOpen: false,
            favOpen: false
        }
    }
    toggleDrawer = ()=> {
        this.setState({
            toggle: true
        })
    }
    closeDrawer = () => {
        this.setState({
            toggle: false
        })
    }
    openFavDialog = () => {
        this.setState({
            favOpen: true
        })
    }
    closeFavDialog = () => {
        this.setState({
            favOpen: false
        })
    }
    openSearchDialog = () => {
        this.setState({
            searchOpen: true
        })
    }
    closeSearchDialog = () => {
        this.setState({
            searchOpen: false
        })
    }
    render(){
        const {toggle, searchOpen, favOpen} = this.state
        const { songs, artists, songFn } = this.props;
        return(
            <div>
                <AppBar position="static">
                    <Toolbar style={{paddingLeft: "0px"}}>
                        <Grid container spacing={6} alignItems="center">
                            <Grid item xs={1} >
                                <IconButton onClick={this.toggleDrawer} style={{color: "white"}}>
                                    <Menu />
                                </IconButton>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="h6" style={{color: "white"}}>
                                    Music Library
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <IconButton onClick={this.openSearchDialog} style={{color: "white", float: "right"}}>
                                    <Search />
                                </IconButton>                               
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <TabsNav songs={songs} artists={artists} songFn={songFn}/>
                {
                    searchOpen && <SearchDialog songFn={songFn} open={searchOpen} closeSearchDialog={this.closeSearchDialog} songs={songs}/>
                }
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