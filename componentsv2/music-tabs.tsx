import { AppBar, Tabs, Tab } from "@mui/material"
import { useRouter } from "next/router";
import React, { SyntheticEvent } from "react"
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { TABS } from "../components/types";
import {
    changeToDifferentTab
} from '../reducers/tab-slice';

export const MusicTabs = (): JSX.Element => {
    const tab = useSelector((state: RootStateOrAny) => state.tab.value);
    const dispatch = useDispatch();
    const router = useRouter();

    const changeTab = (evt: SyntheticEvent<Element, Event>, tabIndex: number): void => {
        switch(tabIndex)
        {
            case TABS.SONGS:
                router.push('/songs');
                break;
            case TABS.ARTISTS:
                router.push('/artists');
                break;
            default:
                console.error('Unable to find route index', tabIndex);
                break;
        }

        dispatch(changeToDifferentTab(tabIndex))
    }

    return(
        <AppBar position="static">
            <Tabs textColor="inherit" value={tab} onChange={changeTab} variant="fullWidth" indicatorColor="secondary">
                <Tab label="Songs" />
                <Tab label="Artists" />
            </Tabs>
        </AppBar>
    )
}