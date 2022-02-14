// material
import { 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle, 
    Button
} from '@mui/material';
import { useState } from 'react';

// types
import { MusicManagementDialogConfig } from './types';

export const MusicManagementDialog = (props: MusicManagementDialogConfig): JSX.Element => {
    const { toggle, musicId, closeMusicManagementDialog } = props;
    const [ isMusicManagementDialogOpen, setMusicManagementDialogOpen ] = useState<boolean>(toggle);

    const handleClose = (): void => {
        setMusicManagementDialogOpen(!toggle);
        closeMusicManagementDialog();
    }

    return(
        <Dialog
            open={isMusicManagementDialogOpen}
            onClose={handleClose}
            fullWidth={true}
            maxWidth = {'md'}
        >
            <DialogTitle>Add Music</DialogTitle>
            <DialogContent>
                <div>HI </div>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}