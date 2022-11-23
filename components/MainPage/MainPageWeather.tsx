import React, { useCallback, useMemo } from "react";
import { useState, useEffect } from "react";
import WeatherData from "./WeatherData/WeatherData";

function MainPageWeather() {
    const Key = process.env.NEXT_PUBLIC_WEATHER_KEY;

    const [useLat, setLat] = useState<number>();
    const [useLon, setLon] = useState<number>();

    useEffect(() => {
        function isSuccess(pos: any) {
            console.log("OK.");
            var crd = pos.coords;
            setLat(crd?.latitude);
            setLon(crd?.longitude);
        }

        const isError = (err: any) => {
            setLat(60)
            setLon(25)
            console.warn(`ERROR(${err.code}): ${err.message}`);
        };

        var options = {
            enableHighAccuracy: false,
            timeout: 5000,
            maximumAge: 10,
        };

        global.navigator?.geolocation.getCurrentPosition(
            isSuccess,
            isError,
            options
        );

    }, [setLat, useLat, setLon, useLon, Key]);

    return (
        < WeatherData useLat={useLat} useLon={useLon} Key={Key} />
    );


}

export default React.memo(MainPageWeather);
