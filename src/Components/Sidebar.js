// react
import React from 'react';

// @material-ui
import {
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    makeStyles
} from '@material-ui/core';

// @material-ui icons
import { LibraryMusic, FavoriteBorder } from '@material-ui/icons';

// components
import { FavoritesDialog } from './FavoritesDialog';

const styles = {
    list: {
      width: 240,
    },
    header: {
        backgroundColor: '#DBD7D6'
    },
    color: '#FF2C5C'
};

const useStyles = makeStyles(() => styles);

export const Sidebar = props => {

    const { toggle, closeDrawer, closeFavDialog, openFavDialog, favOpen, songFn} = props;
    const classes = useStyles();

    return(
        <Drawer open={toggle} onClose={closeDrawer}>
            <div className={classes.list}>
                <List>
                    <ListItem className={classes.header}>
                        <ListItemText primary={
                            <Typography style={
                                {color: styles.color, 
                                fontSize: "15px", 
                                fontWeight: "bold"}
                            }>
                                General
                            </Typography> 
                        }/>
                    </ListItem>
                    <ListItem button onClick={closeDrawer}>
                        <ListItemIcon>
                            <LibraryMusic />
                        </ListItemIcon>
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
                                {color: styles.color, 
                                fontSize: "15px", 
                                fontWeight: "bold"}
                            }>
                                My List
                            </Typography> 
                        }/>
                    </ListItem>
                    <ListItem button onClick={openFavDialog}>
                        <ListItemIcon>
                            <FavoriteBorder />
                        </ListItemIcon>
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
                    favOpen && <FavoritesDialog songFn={songFn} open={favOpen} closeFavDialog={closeFavDialog}/>
                }
            </div>
        </Drawer>
    )
}