// react
import React from 'react';

// others
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
 
export const ReactAudioPlayer = props => {
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