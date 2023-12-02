import React, {useContext} from 'react'
import style from './track.module.scss'
import durationMS from '../../utils/durationMS';
import { PlayArrow, Pause } from '@mui/icons-material';
import {IconButton} from '@mui/material'
import cn from 'classnames';
import { AudioContext } from '../../context/AudioContext';
function Tracks(track) {
    const {title, image, description, duration} = track;
    const formatduration = durationMS(duration);
    const {currentTrak, handlePlay, playing} = useContext(AudioContext);
    const isCurrenTrack = currentTrak.id === track.id 
  return (
    <div className={cn(style.track, isCurrenTrack && style.play)}>
        <IconButton onClick={() => handlePlay(track)}>
         {isCurrenTrack && playing ? <Pause/> : <PlayArrow/>}
        </IconButton>
        <div className={style.border}>
        <img  src={image} alt="track" />
        </div>
        <div className={style.flex}>
           <span className={style.title}>{title}</span>
           <span className={style.description}>{description}</span>
        </div>
        <span className={style.duration}>{formatduration}</span>
    </div>
  )
}

export default Tracks