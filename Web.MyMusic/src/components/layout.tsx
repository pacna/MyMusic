import { ReactElement, useReducer } from "react";
import { AudioPlayer } from "./audio-player";
import { NavSidebar } from "./nav-sidebar";
import { AudioPlayerContext } from "../contexts/audio-player-context";
import { AudioPlayerInfo } from "../types/local";

function audioPlayerReducer(
    state: AudioPlayerInfo,
    action: {
        property: string | string[];
        payload: string | boolean | AudioPlayerInfo;
    }
): AudioPlayerInfo {
    if (Array.isArray(action.property)) {
        let id: string;
        let visible: boolean;
        let path: string;

        for (const p of action.property) {
            if (p === "id") {
                id = (action.payload as AudioPlayerInfo).id;
            }

            if (p === "visible") {
                visible = (action.payload as AudioPlayerInfo).visible;
            }

            if (p === "path") {
                path = (action.payload as AudioPlayerInfo).path;
            }
        }

        id ??= state.id;
        visible ??= state.visible;
        path ??= state.path;

        return {
            id,
            visible,
            path,
        };
    }

    switch (action.property) {
        case "id":
            return {
                ...state,
                id: action.payload as string,
            };
        case "visible":
            return {
                ...state,
                visible: action.payload as boolean,
            };
        case "path":
            return {
                ...state,
                path: action.payload as string,
            };
        default:
            return state;
    }
}

export const Layout = ({
    children,
}: {
    children: ReactElement[] | ReactElement;
}): ReactElement => {
    const [audioPlayerState, audioPlayerDispatch] = useReducer(
        audioPlayerReducer,
        {} as AudioPlayerInfo
    );

    return (
        <AudioPlayerContext.Provider
            value={{ audioPlayerState, audioPlayerDispatch }}
        >
            <NavSidebar />
            <main>{children}</main>
            <AudioPlayer />
        </AudioPlayerContext.Provider>
    );
};
