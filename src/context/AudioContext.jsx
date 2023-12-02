import { createContext, useState } from "react";
import tracks from '../assets/tracks'

const audio = new Audio();
export const AudioContext = createContext({});

const AudioProvider = ({children})=>{
    const [currentTrak, setCurrentTrak] = useState(tracks[0]);
    const [playing, setPlaying] = useState(false);
 

    const handlePlay = (track)=>{

        if(currentTrak.id !== track.id){
            setCurrentTrak(track);
            setPlaying(true);

            audio.src = track.src;
            audio.currentTime = 0;
            audio.play();
            return;
        }
        if(playing){
            audio.pause();
            setPlaying(false)
        }else{
            audio.play();
            setPlaying(true)
        }
    };
    const value = { currentTrak, playing, handlePlay, audio }
    
    return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
}

export default AudioProvider;