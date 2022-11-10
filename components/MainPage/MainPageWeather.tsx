import React, { useCallback, useMemo } from "react";
import styles from "../../styles/Home.module.css";
import { useState, useEffect } from "react";
import { Weather } from "../../types";



// Tässä on vielä bugi:
// Jostain syystä funktio ei toimi täysin oikein
// Vaikka geolokaatio on tiedossa, se silti palauttaa default valueen
// Mutta jos uudelleen renderöidään (eli tehdään muutokset koodissa), niin kaikki toimii.
// Update => Nyt funktio toimii silloin tällöin, käytin ennen useEffect, vaihdoin useMemo
// syy => funktio toimii renderöinnin alussa ja mikäli on success palauttaa OK. konsoliin
// useMemo toimii niin, että se muistaa arvot alussa
// Safari toimii täydellisesti
// Muut selaimet myös
// useMemo is unstable.

function MainPageWeather() {
  const Key = process.env.NEXT_PUBLIC_WEATHER_KEY;
  const [data, setData] = useState<Weather>();
  const [useLat, setLat] = useState<number>();
  const [useLon, setLon] = useState<number>();



  useMemo(() => {
    function isSuccess(pos: any) {
      console.log("OK.")
      var crd = pos.coords;
      setLat(crd?.latitude)
      setLon(crd?.longitude)
      getData()
    }

    const isError = (err: any) => {
      console.log("Error?")
      console.warn(`ERROR(${err.code}): ${err.message}`);
      return getData()
    }

    var options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 10,
    }

    global.navigator?.geolocation.getCurrentPosition(isSuccess, isError, options)

    const getData = async (lat = useLat || 60, lon = useLon || 25) => {
      let addr = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${Key}&units=metric`
      console.log(addr)
      const data = await (
        await fetch(addr)
      ).json()
      setData(data);
    };
  }, [setLat, useLat, setLon, useLon, setData, Key])



  console.log(data)

  return (

    <div className={styles.widget}>
      <h1>Weather in {data?.name}</h1>
      <div>
        <p className={styles.advP}>Temperature: {data?.main.temp}°C</p>
        <p className={styles.advP}>Weather: {data?.weather?.[0]?.main}</p>
        <p className={styles.advP}>Wind speed: {data?.wind.speed} m/s</p>
        <p className={styles.advP}>Humidity: {data?.main.humidity} %</p>
      </div>
    </div>


  );

};

export default React.memo(MainPageWeather);

