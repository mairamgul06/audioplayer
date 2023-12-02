import React, { useState, useContext, useEffect } from 'react'
import style from './playBar.module.scss'
import { PlayArrow, Pause, ArrowBack } from '@mui/icons-material'
import { IconButton, Slider } from '@mui/material'
import { AudioContext } from '../context/AudioContext'
import durationMS from '../utils/durationMS'

export default function PlayBar() {
    const [open, setOpen] = useState(false);
    const { currentTrak, playing, handlePlay } = useContext(AudioContext);
    const { image, duration, description } = currentTrak;

    const formatDuration = durationMS(duration);
    return (
        <div className={style.playbar}>
            <div className={style.border} onClick={() => setOpen(!open)}><img src={image} alt="playbar" /></div>
            {open && (
                <Open closeModal={setOpen} />
            )}
            <span onClick={() => setOpen(!open)}>{description}</span>
            <IconButton onClick={() => handlePlay(currentTrak)}>
                {playing ? <Pause sx={{ color: '#fff', fontSize: 30 }} /> : <PlayArrow sx={{ color: '#fff', fontSize: 30 }} />}
            </IconButton>
            <TimeControls />
            <span>{formatDuration}</span>
        </div>
    )
}





function Open({ closeModal }) {
    const { currentTrak } = useContext(AudioContext);
    const { image, title, description } = currentTrak;
    return (
        <div className={style.playlist}>
            <div className={style.open} >
                <IconButton sx={{position: 'absolute', left: '10px', top: '10px'}} onClick={() => closeModal(false)} >
                <ArrowBack /> 
                </IconButton>
                <div className={style.logo}>
                <img src={image} alt="playbar" />
                </div>
                <p>singer: {title}</p>
                <p>song: {description}</p>
            </div>

        </div>
    )
}

function TimeControls() {


    const [times, setTimes] = useState(0);
    const { currentTrak, audio } = useContext(AudioContext);
    const { duration } = currentTrak;

    const formatTime = durationMS(times);

    const sliderTime = Math.round((times / duration) * 100);

    const handleCurrenTime = (_, value) => {
        const time = Math.round((value / 100) * duration);

        setTimes(time);
        audio.currentTime = time;
    }
    useEffect(() => {
        const timeInterval = setInterval(() => {
            setTimes(audio.currentTime);
        }, 1000);

        return () => {
            clearInterval(timeInterval);
        };
    }, []);

    return (
        <>
            <span>{formatTime}</span>

            <Slider
                sx={{ width: '60%', color: '#fff' }}
                step={1} min={0} max={100}
                value={sliderTime}
                onChange={handleCurrenTime}
            />
        </>
    )
}
