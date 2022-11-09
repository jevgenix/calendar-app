import { number } from "prop-types";
import React from "react";

export interface GetSResults {
    Events: Schedule[];
}

export interface Schedule {
    id: number;
    summary: String;
    description: String;
    start: {
        date: String;
        dateTime: String;
        timeZone: String;
    };
    end: {
        dateTime: String;
        timeZone: String;
    };
}

export interface Headerlink {
    links: Array<String>
    link: String
}

export interface Timer {
    stage: number
    switchStage: Function
    getTickingTime: Function
    seconds: number
    ticking: boolean
    setTicking: React.Dispatch<React.SetStateAction<boolean>>
    openSettings: boolean
    setOpenSettings: React.Dispatch<React.SetStateAction<boolean>>
}

// To be changed!
export interface Pomo {
    pomodoroRef: React.MutableRefObject<HTMLInputElement>
    shortBreakRef: React.MutableRefObject<HTMLInputElement>
    longBreakRef: React.MutableRefObject<HTMLInputElement>
    openSettings: boolean
    setOpenSettings: React.Dispatch<React.SetStateAction<boolean>>
    updateTimeDefaultValue: Function
}

export interface PomoNavigation {
    setOpenSettings: React.Dispatch<React.SetStateAction<boolean>>
}

export interface Weather {
    main: {
        temp: number;
        humidity: number,
    },
    name: String,
    weather: {
        0: {
            main: string;
        }
    },
    wind: {
        speed: string;
    }
};

export interface getWeather {
    wEvents: Weather[];
}
