import React, { Fragment, ReactElement } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import { Sidebar } from "../components/sidebar";
import { ReactAudioPlayer } from "./react-audio-player"

export const MainContent = (props: { children: ReactElement}): JSX.Element => {
    const songData = useSelector((state: RootStateOrAny) => state.songData.value);
    const { children } = props;

    return (
        <div>
            <Sidebar
                    toggle={null}
                    closeDrawer={null}
                    songFn={null} 
            />
            <Fragment> { children } </Fragment>
            <ReactAudioPlayer
                src={songData.path} 
                showSoundWave={() => {
                    return;
                }}
                hideSoundWave={() => {
                    return;
                }}  
            />
        </div>
    )
}