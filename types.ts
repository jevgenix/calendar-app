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
}