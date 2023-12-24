import { ReactElement, useContext } from "react";
import ReactAudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { AudioPlayerContextConfig } from "../types/local";
import { AudioPlayerContext } from "../contexts/audio-player-context";

export const AudioPlayer = (): ReactElement => {
    const { audioPlayerState, audioPlayerDispatch } =
        useContext<AudioPlayerContextConfig>(AudioPlayerContext);

    return (
        <ReactAudioPlayer
            style={{ position: "fixed", bottom: 0, width: "100%" }}
            showFilledVolume={true}
            loop={true}
            src={audioPlayerState.path}
            onPlay={() =>
                audioPlayerDispatch({ property: "visible", payload: true })
            }
            onPause={() =>
                audioPlayerDispatch({ property: "visible", payload: false })
            }
        />
    );
};
