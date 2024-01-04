import React, {useEffect, useState} from 'react';
import axios, {Axios} from "axios";
import {Search} from "@mui/icons-material";
import drizzle from "./assets/drizzle.png";
import clouds from "./assets/clouds.png";
import humadity from "./assets/humadity.png";
import wind from "./assets/wind.png";
import rain from "./assets/rain.png";
import mist from "./assets/mist.png";

function App() {

    const [name,setName]=useState('')

    const [data,setData]=useState({
        celcius:10,
        name:'London',
        huminity:10,
        speed:2,
        image:clouds
    })


    const handleCliked = () =>{
        if (name !== ""){
            const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=feaee58308a02f3823ee57c15d6b1e21&unit=metric`
            axios.get(apiUrl)
                .then(res=>{

                    let  imagePath="";
                    if (res.data.weather[0].main=="Clouds"){
                        imagePath=clouds;
                    }else if (res.data.weather[0].main=="Clear"){
                        imagePath=clouds
                    }else if (res.data.weather[0].main=="Rain") {
                        imagePath = rain
                    }else if (res.data.weather[0].main=="Mist"){
                        imagePath=mist
                    }else if (res.data.weather[0].main=="Drizzle") {
                        imagePath = drizzle
                    }else {
                        imagePath=clouds
                    }



                    setData({...data,celcius:res.data.main.temp,name:res.data.name,huminity: res.data.main.humidity,speed: res.data.wind.speed,image:imagePath})
                })
                .catch(err => console.log(err))
        }
    }


    return (
    <div className='w-screen h-screen flex flex-row items-center justify-center bg-slate-200'>
        <div className='w-[30vw] h-[65vh] bg-gradient-to-r from-blue-300 to-blue-400 rounded-2xl'>

            <div className='text-center p-4 flex flex-row gap-3 justify-center'>
                <input type='text' className='py-3 px-6 w-[400px] text-lg rounded-3xl border border-gray-200  text-gray-600
            placeholder:text-gray-400 focus:outline-none bg-white-600/100 shadow-md' placeholder='Enter your location'
                       onChange={e => setName(e.target.value)}
                />

                <button onClick={handleCliked} className='p-4 rounded-full shadow-md bg-white'><Search></Search></button>
            </div>

            <div className='w-full flex flex-col justify-center items-center'>
                <img src={data.image}/>
                <span className='text-6xl font-bold'>{Math.round(data.celcius)}°C</span>
                <span className='text-6xl '>{data.name}</span>
            </div>

            <div className='flex flex-row justify-between mt-[14vw] px-12'>
                <div className='flex flex-row gap-3'>
                    <img src={humadity} className='w-12 h-14'/>
                    <div className='flex flex-col'>
                        <span className='text-xl font-bold'>Huminity</span>
                        <span className='text-lg font-bold'>{Math.round(data.huminity)}</span>
                    </div>
                </div>

                <div className='flex flex-row gap-2'>
                    <img src={wind} className='w-12 h-14'/>
                    <div className='flex flex-col'>
                        <span  className='text-xl font-bold'>Wind</span>
                        <span  className='text-xl font-bold'>{Math.round(data.speed)}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default App;
