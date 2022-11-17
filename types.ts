import { number } from "prop-types";
import React from "react";

//Kalenterin interface
export interface Calendar {
    events: Event[];
}

export interface Event {
    kind:      string;
    etag:      string;
    id:        string;
    status:    string;
    htmlLink:  string;
    created:   Date;
    updated:   Date;
    summary:   string;
    creator:   Creator;
    organizer: Organizer;
    start:     End;
    end:       End;
    iCalUID:   string;
    sequence:  number;
    reminders: Reminders;
    eventType: string;
}

export interface Creator {
    email: string;
}

export interface End {
    dateTime: Date;
    timeZone: string;
}

export interface Organizer {
    email:       string;
    displayName: string;
    self:        boolean;
}

export interface Reminders {
    useDefault: boolean;
}

export interface Headerlink {
    links: Array<String>
    link: String
}
//Kalenterin interface loppuu

export interface Timer {
    stage: number
    switchStage: Function
    getTickingTime: Function
    seconds: number
    ticking: boolean
    setTicking: React.Dispatch<React.SetStateAction<boolean>>
    openSettings: boolean
    setOpenSettings: React.Dispatch<React.SetStateAction<boolean>>
    wholeReset: Function
    triggerButton: boolean
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
    ticking: boolean
    wholeReset: Function
    triggerButton: boolean
}

export interface Weather {
    main: {
    temp: number,
    humidity: number,
    },
    name: String,
    weather: {
        0: {
            main: string,
            icon: string,
            description: string,
        }
    },
    wind: {
        speed: string,
    }
  };

export interface getWeather {
    wEvents: Weather[];
}

//Testi interface
export interface GetSResults {
        Events: Schedule[];
    }
    
    //Testi interface
    export interface Schedule {
        id: String;
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