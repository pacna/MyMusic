// react
import React, { SyntheticEvent, useEffect, useState } from "react"

// material
import { AppBar, Tabs, Tab } from "@mui/material"

// next
import { NextRouter, useRouter } from "next/router";

// types
import { TABS } from "./types";

export const MusicTabs = (): JSX.Element => {
    const [tab, setTab] = useState<TABS>(TABS.SONGS)
    const router: NextRouter = useRouter();

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
        
        setTab(tabIndex);
    }

    const changeTabOnMount = (): void => {
        if (router.pathname === '/songs') {
            setTab(TABS.SONGS);
        } else {
            setTab(TABS.ARTISTS);
        }
    }

    useEffect(() => {
        changeTabOnMount();
    }, [])

    return(
        <AppBar position="static">
            <Tabs textColor="inherit" value={tab} onChange={changeTab} variant="fullWidth" indicatorColor="secondary">
                <Tab label="Songs" />
                <Tab label="Artists" />
            </Tabs>
        </AppBar>
    )
}