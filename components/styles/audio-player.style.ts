// styles
import { ClassNameMap, Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';

export const audioPlayerUseStyles: (props?: any) => ClassNameMap = makeStyles((theme: Theme) => createStyles({
    audioPlayerContainer: {
        position: 'fixed',
        bottom: '0',
        width: '100%'
    }
}));