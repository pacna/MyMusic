// react
import React from 'react';

// @material-ui
import { 
    AppBar,
    Toolbar,
    Typography,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Grid,
    withStyles
} from '@material-ui/core';

// @material-ui icons
import { Menu, LibraryMusic, FavoriteBorder, Search } from '@material-ui/icons';

// components
import { SearchDialog } from './SearchDialog'
import { FavoritesDialog } from './FavoritesDialog';
import { TabsNav } from './TabsNav'

const styles = {
    list: {
      width: 240,
    },
    header: {
        backgroundColor: '#DBD7D6'
    },
    color:{
        red: '#FF2C5C'
    }
};

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
        const classes = withStyles(styles);
        return(
            <div>
                <AppBar position="static">
                    <Toolbar style={{paddingLeft: "0px"}}>
                        <Grid container spacing={24} alignItems="center">
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
                <Drawer open={toggle} onClose={this.closeDrawer}>
                    <div className={classes.list}>
                        <List>
                            <ListItem className={classes.header}>
                                <ListItemText primary={
                                    <Typography style={
                                        {color: styles.color.red, 
                                        fontSize: "15px", 
                                        fontWeight: "bold"}
                                    }>
                                        General
                                    </Typography> 
                                }/>
                            </ListItem>
                            <ListItem button onClick={this.closeDrawer}>
                                <LibraryMusic />
                                <ListItemText primary={
                                    <Typography style={
                                        {color: "black", 
                                        fontSize: "15px"}
                                    }>
                                        Music Library
                                    </Typography> 
                                }/>
                            </ListItem>
                            <ListItem className={classes.header}>
                                <ListItemText primary={
                                    <Typography style={
                                        {color: styles.color.red, 
                                        fontSize: "15px", 
                                        fontWeight: "bold"}
                                    }>
                                        My List
                                    </Typography> 
                                }/>
                            </ListItem>
                            <ListItem button onClick={this.openFavDialog}>
                                <FavoriteBorder />
                                <ListItemText primary={
                                    <Typography style={
                                        {color: "black", 
                                        fontSize: "15px"}
                                    }>
                                        Favorites
                                    </Typography> 
                                }/>
                            </ListItem>
                        </List>
                        {
                            favOpen && <FavoritesDialog songFn={songFn} open={favOpen} closeFavDialog={this.closeFavDialog} songs={songs}/>
                        }
                    </div>
                </Drawer>
            </div>
        )
    }
}