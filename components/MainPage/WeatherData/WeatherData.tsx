import styles from "../../../styles/Home.module.css";
import { useState, useEffect } from "react";
import { Weather, getWeatherWidget } from "../../../types";
import Image from "next/image";
import imageLoader from "../../../imageLoader";
import axios from "axios";

const WeatherData = ({ useLat, useLon, Key }: getWeatherWidget) => {
    const [data, setData] = useState<Weather>();

    useEffect(() => {
        axios
            .get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${useLat}&lon=${useLon}&appid=${Key}&units=metric`
            )
            .then((response) => {
                return setData(response.data);
            }).catch(err => {
                console.log(err)
            })
    }, [useLat, useLon, Key])

    if (useLat === undefined || useLon === undefined || data === undefined) {
        return <p>Loading...</p>
    } else {
        return (
            <div className={styles.widget}>
                <h1>
                    Weather in {data?.name}
                    <span>
                        <Image
                            loader={imageLoader}
                            unoptimized
                            src={`http://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`}
                            width="50"
                            height="50"
                            alt="weather icon"
                            className={styles.wImg}
                        />
                    </span>
                </h1>
                <div>
                    <p className={styles.advP}>Temperature: {data?.main.temp}°C</p>
                    <p className={styles.advP}>
                        Weather: {data?.weather[0].main} ({data?.weather[0].description})
                    </p>
                    <p className={styles.advP}>Wind speed: {data?.wind.speed} m/s</p>
                    <p className={styles.advP}>Humidity: {data?.main.humidity} %</p>
                </div>
            </div>
        )
    }
}

export default WeatherData
