// third party
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

// interfaces
import { AudioPlayerProps } from '../types';
 
export const ReactAudioPlayer = (props: AudioPlayerProps) => {
    const { src, showSoundWave, hideSoundWave } = props;
    
    return(
        <div style={{position: "fixed", bottom: "0", width: "100%"}}>
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