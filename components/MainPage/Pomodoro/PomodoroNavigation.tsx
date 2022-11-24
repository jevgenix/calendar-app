import React from "react";
import { FiCommand, FiSettings } from "react-icons/fi"
import styles from "../../../styles/Pomodoro.module.css";
import { PomoNavigation } from "../../../types";

function PomodoroNavigation({ setOpenSettings, wholeReset, triggerButton }: PomoNavigation) {
    const modalPopUp = () => {
        window.scrollTo(0, 0)
        setOpenSettings(value => !value)
    }
    return (
        <nav className={styles.pomoNav}>
            <div className={styles.leftIcon}>
                <FiCommand onClick={() => wholeReset()} className={triggerButton ? styles.info : ""} />
            </div>
            <h3 className={styles.pomoHead}> Pomofocus </h3>
            <div className={styles.rightIcon}>
                <FiSettings onClick={() => modalPopUp()} />
            </div>
        </nav>
    )
}


export default React.memo(PomodoroNavigation)