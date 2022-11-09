

import { Timer } from '../../../types'
import PomodoroNavigation from './PomodoroNavigation';
import styles from "../../../styles/Pomodoro.module.css";


const Countdown = ({ stage, switchStage, getTickingTime, seconds, ticking, setTicking, openSettings, setOpenSettings, wholeReset, triggerButton }: Timer) => {
    const options: Array<String> = ["Pomodoro", "Short Break", "Long Break"]
    return (
        <div className={styles.advP}>
            <PomodoroNavigation setOpenSettings={setOpenSettings} ticking={ticking} triggerButton={triggerButton} wholeReset={wholeReset} />

            <div className={styles.bdvP}>
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