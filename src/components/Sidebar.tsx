// @mui
import {
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Box
} from '@mui/material';

// @mui icons
import { LibraryMusic, FavoriteBorder } from '@mui/icons-material';

import { makeStyles } from '@mui/styles';
import { SidebarProps } from '../interfaces/Sidebar.interface';

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

const useStyles: any = makeStyles({styles});

export const Sidebar = (props: SidebarProps): JSX.Element => {

    const { toggle, closeDrawer, closeFavDialog, openFavDialog, favOpen, songFn} = props;
    const classes = useStyles();

    return(
        <Drawer open={toggle} onClose={closeDrawer}>
            <Box sx={styles.list}>
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
            </Box>
        </Drawer>
    )
}