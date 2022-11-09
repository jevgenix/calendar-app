import React from "react";
import styles from "../../styles/Home.module.css";
import { useState, useEffect } from "react";
import { getWeather, Weather } from "../../types";

const Key = process.env.NEXT_PUBLIC_WEATHER_KEY;

const MainPageWeather = () => {
  const [data, setData] = useState<Weather | undefined>(undefined);
  const [useLat, setLat] = useState<number>();
  const [useLon, setLon] = useState<number>();

  useEffect(() => {
    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      if (result.state === "granted") {
        navigator.geolocation.getCurrentPosition((position) => {
          setLat(position.coords.latitude);
          setLon(position.coords.longitude);
          console.log(position.coords.latitude);
          console.log(position.coords.longitude);
        });
      } else {
        setLat(60);
        setLon(25);
      }
    });
  }, []);

  const getWeather = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${useLat}&lon=${useLon}&appid=${Key}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  };

  if (data === undefined) {
    return (
      <div className={styles.widget}>
        <button onClick={getWeather} className={styles.weatherBtn}>
          get weather
        </button>
      </div>
    );
  } else {
    return (
      <div className={styles.widget}>
        <h1>Weather in {data.name}</h1>
        <div>
          <p className={styles.advP}>Temperature: {data?.main.temp}°C</p>
          <p className={styles.advP}>Weather: {data?.weather[0].main}</p>
          <p className={styles.advP}>Wind speed: {data?.wind.speed} m/s</p>
          <p className={styles.advP}>Humidity: {data?.main.humidity} %</p>
          <button onClick={getWeather} className={styles.navBtn}>
          update
        </button>
        </div>
      </div>
    );
  }
};

export default MainPageWeather;
