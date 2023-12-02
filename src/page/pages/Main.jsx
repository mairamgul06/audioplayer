import React, {useState} from 'react'
import style from './main.module.scss'
import tracks from '../../assets/tracks'
import {Input} from '@mui/material'
import Tracks from './Tracks'


const runSearch = (query) =>{
    if(!query){
        return tracks;
    }
    const lowerCaseQuery = query.toLowerCase();

    return tracks.filter((track)=>
        track.title.toLowerCase().includes(lowerCaseQuery) ||
        track.description.toLowerCase().includes(lowerCaseQuery)
    );
}
function Main() {
    const [traks, setTraks] = useState(tracks);
    const handleChange = (event) => {
        const fountTracks = runSearch(event.target.value);
        setTraks(fountTracks);
    }
  return (
    <div className={style.main}>
        <Input  className={style.input} placeholder='Search music' onChange={handleChange}  />
        <div className={style.wrapper}>
        {traks.map((track)=>(
            <Tracks key={track.id} {...track}/>
        ))}
        </div>
    </div>
  )
}

export default Main