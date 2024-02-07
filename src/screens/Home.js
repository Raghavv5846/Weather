import { useEffect, useState } from "react"
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useWeather } from "../contextApi/WeatherContext";


export default function Home() {

    const { weather } =useWeather();


    const navigate=useNavigate()
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user) {
            console.log("user",user);
              navigate("/");
          } else {
            navigate("/Signin");
          }
        });
        return () => unsubscribe()
      }, []);
      console.log(weather);
  return (
    <>
    {weather &&<div>
    <Navbar location={weather.location.name} country={weather.location.country}/>
    <div style={{height:'15rem',padding:"25px"}} >
        <div style={{backgroundColor:"whitesmoke",height:'10rem',display:"flex",justifyContent:"space-between"}} className="shadow-md">
            <div style={{padding:'10px'}}>
                <div style={{fontSize:'4em',fontFamily:"fantasy"}} className="px-8">{weather.current.feelslike_c}°C</div>
                <div style={{fontSize:'2em',fontFamily:"sans-serif"}} className="px-8">{weather.current.condition.text}</div>
            </div>
        <div style={{paddingRight:"6em",paddingTop:"1em"}}><img src={weather.current.condition.icon} width={100}/></div>
        </div>
    </div>
    <h2 className="text-3xl px-8 py-4 font-medium text-center">3 days forecast</h2>
    <div className="grid grid-cols-3" style={{paddingLeft:"5rem",paddingRight:"5rem",gap:"6rem"}}>
        <div className="bg-red shadow-lg flex items-center flex-col">
            <h2 className="text-3xl py-4" style={{fontFamily:"fantasy"}}>{weather.forecast.forecastday[0].date}</h2>
            <img src={weather.forecast.forecastday[0].day.condition.icon} style={{height:"15rem"}}/>
            <p className="text-3xl py-4" style={{fontFamily:"fantasy"}}>{weather.forecast.forecastday[0].day.mintemp_c}°C/{weather.forecast.forecastday[0].day.maxtemp_c}°C</p>
        </div>
        <div className="bg-red shadow-lg flex items-center flex-col">
            <h2 className="text-3xl py-4" style={{fontFamily:"fantasy"}}>{weather.forecast.forecastday[1].date}</h2>
            <img src={weather.forecast.forecastday[1].day.condition.icon} style={{height:"15rem"}}/>
            <p className="text-3xl py-4" style={{fontFamily:"fantasy"}}>{weather.forecast.forecastday[1].day.mintemp_c}°C/{weather.forecast.forecastday[0].day.maxtemp_c}°C</p>
        </div>
        <div className="bg-red shadow-lg flex items-center flex-col">
            <h2 className="text-3xl py-4" style={{fontFamily:"fantasy"}}>{weather.forecast.forecastday[2].date}</h2>
            <img src={weather.forecast.forecastday[2].day.condition.icon} style={{height:"15rem"}}/>
            <p className="text-3xl py-4" style={{fontFamily:"fantasy"}}>{weather.forecast.forecastday[2].day.mintemp_c}°C/{weather.forecast.forecastday[0].day.maxtemp_c}°C</p>
        </div>
        
    </div>
    </div>
    }
    </>
  )
}

