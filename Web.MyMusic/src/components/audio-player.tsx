import { ReactElement } from "react";
import ReactAudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

export const AudioPlayer = (): ReactElement => {
    return (
        <ReactAudioPlayer
            style={{ position: "fixed", bottom: 0, width: "100%" }}
            showFilledVolume={true}
            autoPlay
        />
    );
};
