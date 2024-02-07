import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

const weatherContext = createContext();

export const useWeather = () => {
    const context = useContext(weatherContext);
    if (!context) {
      throw new Error('useWeather must be used within a WeatherProvider');
    }
    return context;
  };
  
export const WeatherContext = ({ children }) => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    try {
    let url=`http://api.weatherapi.com/v1/forecast.json?key=6d07d616f2254545999110000221507&q=${latitude},${longitude}&days=4
    `;
    let data=await fetch(url);

    let parsed=await data.json();

    console.log("parsed",parsed);
      setWeather(parsed);
    } catch (error) {
      console.error(error);
    }
  };
  const logOut = async () => {
    try {
    await signOut(auth);
    } catch (err){
      console.error(err);
    }
  };
  useEffect(() => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {

          setLatitude((position.coords.latitude).toString());
          setLongitude((position.coords.longitude).toString());
  
          console.log("Latitude: ", latitude);
          console.log("Longitude: ", longitude);
          
        }, function (error) {
          console.error("Error getting location: " + error.message);
        });
      } else {
        console.error("Geolocation is not supported by this browser");
      }

    console.log(weather);
  }, [latitude,longitude]);
  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      getWeather();
    }
  }, [latitude,longitude]);

  return (
    <weatherContext.Provider value={{ weather,logOut }}>
      {children}
    </weatherContext.Provider>
  );
};

