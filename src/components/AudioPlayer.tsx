// @mui
import { ClassNameMap } from '@mui/material/styles';

// third party
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

// styles
import { audioPlayerUseStyles } from '../styles/AudioPlayer.style';

// types
import { AudioPlayerProps } from '../types';
 
export const ReactAudioPlayer = (props: AudioPlayerProps) => {
    const { src, showSoundWave, hideSoundWave } = props;
    const classes: ClassNameMap = audioPlayerUseStyles();
    
    return(
        <div className={classes.audioPlayerContainer}>
            <AudioPlayer
                autoPlay
                src={src}
                onPlay={
                    () => showSoundWave()
                }
                onPause={
                    () => hideSoundWave()
                }
            />
        </div>
    )
}