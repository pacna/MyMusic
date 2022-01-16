// @mui
import {
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Box,
    ClassNameMap
} from '@mui/material';

// @mui icons
import { LibraryMusic, FavoriteBorder } from '@mui/icons-material';

// types
import { SidebarProps } from '../components/types/sidebar.interface';

// components
import { FavoritesDialog } from './favorites-dialog';

// styles
import { sideBarUseStyles } from './styles/sidebar.style';
import { useState } from 'react';

export const Sidebar = (props: SidebarProps): JSX.Element => {
    const [isFavDialogOpen, setIsFavDialogOpen] = useState(false);
    const { toggle, closeDrawer } = props;
    const classes: ClassNameMap = sideBarUseStyles();

    const openFavDialog = (): void => {
        setIsFavDialogOpen(true);
    }

    const closeFavDialog = (): void => {
        setIsFavDialogOpen(false);
    }

    return(
        <Drawer open={toggle} onClose={closeDrawer}>
            <Box className={classes.list}>
                <List>
                    <ListItem className={classes.header}>
                        <ListItemText primary={
                            <Typography className={classes.headerText}>
                                General
                            </Typography> 
                        }/>
                    </ListItem>
                    <ListItem button onClick={closeDrawer}>
                        <ListItemIcon>
                            <LibraryMusic />
                        </ListItemIcon>
                        <ListItemText primary={
                            <Typography className={classes.secondaryHeaderText}>
                                Music Library
                            </Typography> 
                        }/>
                    </ListItem>
                    <ListItem className={classes.header}>
                        <ListItemText primary={
                            <Typography className={classes.headerText}>
                                My List
                            </Typography> 
                        }/>
                    </ListItem>
                    <ListItem button onClick={openFavDialog}>
                        <ListItemIcon>
                            <FavoriteBorder />
                        </ListItemIcon>
                        <ListItemText primary={
                            <Typography className={classes.secondaryHeaderText}>
                                Favorites
                            </Typography> 
                        }/>
                    </ListItem>
                </List>
                {
                    isFavDialogOpen && 
                    <FavoritesDialog  
                        open={isFavDialogOpen} 
                        closeFavDialog={closeFavDialog}
                    />
                }
            </Box>
        </Drawer>
    )
}