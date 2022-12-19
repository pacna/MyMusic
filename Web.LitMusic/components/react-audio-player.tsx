// Third party
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useDispatch } from "react-redux";

// Types
import { AudioPlayerConfig } from "./types/configs/audio-player-config";

// Styles
import classes from "../styles/react-audio-player.module.scss";

// Others
import {
    showSoundWave,
    hideSoundWave,
} from "@litmusic/redux/reducers/toggle-soundwave-slice";

export const ReactAudioPlayer = ({ src }: AudioPlayerConfig): JSX.Element => {
    const dispatch = useDispatch();

    return (
        <div className={classes.audioPlayerContainer}>
            <AudioPlayer
                showFilledVolume={true}
                autoPlay
                src={src}
                onPlay={() => dispatch(showSoundWave())}
                onPause={() => dispatch(hideSoundWave())}
            />
        </div>
    );
};
