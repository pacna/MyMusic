// third party
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useDispatch } from 'react-redux';

// styles
import classes from '../styles/react-audio-player.module.scss';

// types
import { AudioPlayerConfig } from './types/configs/audio-player-config';

// others
import { showSoundWave, hideSoundWave } from '../redux/reducers/toggle-soundwave-slice';
 
export const ReactAudioPlayer = (props: AudioPlayerConfig): JSX.Element => {
    const { src } = props;
    const dispatch = useDispatch();

    return(
        <div className={classes.audioPlayerContainer}>
            <AudioPlayer
                showFilledVolume={true}
                autoPlay
                src={src}
                onPlay={
                    () => dispatch(showSoundWave())
                }
                onPause={
                    () => dispatch(hideSoundWave())
                }
            />
        </div>
    )
}