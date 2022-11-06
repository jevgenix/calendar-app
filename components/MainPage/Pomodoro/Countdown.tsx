import React, { useState } from 'react'
import { FiCommand, FiSettings } from "react-icons/fi"
import { Timer } from '../../../types'
import styles from "../../../styles/Pomodoro.module.css";
const Countdown = ({ stage, switchStage, getTickingTime, seconds, ticking, setTicking }: Timer) => {
    const options: Array<String> = ["Pomodoro", "Short Break", "Long Break"]

    return (
        <div className={styles.advP}>

            <div className={styles.bdvP}>
                <FiCommand />
                <FiSettings />

                {options.map((options, index) => {
                    return <h1 key={index}
                        className={` ${index == stage ? styles.stageItem : styles.item} `}
                        onClick={() => switchStage(index)}>{options}</h1>
                }
                )}


            </div>

            <div className={styles.controller}>
                <h1 className={styles.counter}>
                    {getTickingTime()}:{seconds.toString().padStart(2, "0")}
                </h1>
            </div>
            <button className={styles.counterButton} onClick={() => setTicking(ticking => !ticking)}>
                {ticking ? "Stop" : "Start"}
            </button>

        </div>
    )
}


export default Countdown