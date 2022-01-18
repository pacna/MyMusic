// third party
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useDispatch } from 'react-redux';

// styles
import classes from '../styles/react-audio-player.module.scss';

// types
import { AudioPlayerProps } from './types';

// others
import { showSoundWave, hideSoundWave } from '../reducers/toggle-soundwave-slice';
 
export const ReactAudioPlayer = (props: AudioPlayerProps): JSX.Element => {
    const { src } = props;
    const dispatch = useDispatch();

    return(
        <div className={classes.audioPlayerContainer}>
            <AudioPlayer
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