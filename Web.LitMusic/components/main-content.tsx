// react
import React, { Fragment, ReactElement } from "react";

// third party
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";

// styles
import classes from './../styles/main-content.module.scss';

// others
import { closeDrawer } from "../redux/reducers/toggle-drawer-slice";
import { Sidebar } from "./sidebar";
import { ReactAudioPlayer } from "./react-audio-player"

export const MainContent = (props: { children: ReactElement}): JSX.Element => {
    const toggleDrawer = useSelector((state: RootStateOrAny) => state.toggleDrawer.value);
    const dispatch = useDispatch();
    const songData = useSelector((state: RootStateOrAny) => state.songData.value);
    const { children } = props;

    const hideDrawer = (): void => {
        dispatch(closeDrawer());
    }

    return (
        <div className={classes.mainContent}>
            <Sidebar
                    toggle={toggleDrawer}
                    closeDrawer={hideDrawer}
            />
            <Fragment> { children } </Fragment>
            <ReactAudioPlayer
                src={songData.path} 
            />
        </div>
    )
}