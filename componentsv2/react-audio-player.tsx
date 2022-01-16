// @mui
import { ClassNameMap } from '@mui/material/styles';

// third party
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useDispatch } from 'react-redux';

// styles
import { audioPlayerUseStyles } from '../components/styles/audio-player.style';

// types
import { AudioPlayerProps } from '../components/types';
import { showSoundWave, hideSoundWave } from '../reducers/toggle-soundwave-slice';
 
export const ReactAudioPlayer = (props: AudioPlayerProps): JSX.Element => {
    const { src } = props;
    const classes: ClassNameMap = audioPlayerUseStyles();
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