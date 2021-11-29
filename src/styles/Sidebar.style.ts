// styles
import { primaryRed, primaryGray, plainBlack } from './color';
import { ClassNameMap, Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';

export const sideBarUseStyles: (props?: any) => ClassNameMap = makeStyles((theme: Theme) => createStyles({
    list: {
        width: 240,
    },
    header: {
        backgroundColor: primaryGray
    },
    headerText: {
        color: primaryRed,
        fontSize: '16px',
        fontWeight: 'bold'
    },
    secondaryHeaderText: {
        color: plainBlack,
        fontSize: '16px'
    }
}));