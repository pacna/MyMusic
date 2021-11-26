// @mui
import {
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Box,
    Theme,
    ClassNameMap
} from '@mui/material';

// @mui icons
import { LibraryMusic, FavoriteBorder } from '@mui/icons-material';

// @mui styles
import { createStyles, makeStyles } from '@mui/styles';

// interfaces
import { SidebarProps } from '../interfaces/Sidebar.interface';

// components
import { FavoritesDialog } from './FavoritesDialog';

const useStyles: (props?: any) => ClassNameMap<"list" | "header"> = makeStyles((theme: Theme) => createStyles({
    list: {
        width: 240,
    },
    header: {
        backgroundColor: '#DBD7D6'
    }
}));

export const Sidebar = (props: SidebarProps): JSX.Element => {

    const { toggle, closeDrawer, closeFavDialog, openFavDialog, favOpen, songFn} = props;
    const classes: ClassNameMap<"list" | "header"> = useStyles();

    return(
        <Drawer open={toggle} onClose={closeDrawer}>
            <Box className={classes.list}>
                <List>
                    <ListItem className={classes.header}>
                        <ListItemText primary={
                            <Typography style={
                                {color: '#FF2C5C', 
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
                                {color: '#FF2C5C', 
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