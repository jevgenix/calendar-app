import styles from "../../../styles/Pomodoro.module.css";
import React from "react";
import { FiX } from "react-icons/fi";
import { Pomo } from '../../../types'


const ModalSetting = ({ pomodoroRef, shortBreakRef, longBreakRef, openSettings, setOpenSettings, updateTimeDefaultValue }: Pomo) => {
    const inputs = [
        {
            value: "Pomodoro",
            ref: pomodoroRef,
            defaultValue: 25,
        },
        {
            value: "Short Break",
            ref: shortBreakRef,
            defaultValue: 5,
        },
        {
            value: "Long Break",
            ref: longBreakRef,
            defaultValue: 10,
        },
    ];

    return (
        <>
            <div className={openSettings ? styles.modal : styles.hidden} onClick={() => setOpenSettings(false)}>
            </div>
            <div className={openSettings ? styles.modalPopUp : styles.hidden}>
                <div className={styles.modalWindow}>
                    <h3 className={styles.modalContent}> Time setting </h3>
                    <FiX className={styles.modalCloseIcon} onClick={() => setOpenSettings(false)} />
                </div>
                <div className={styles.border}></div>

                <div className={styles.modalDisplay}>
                    {inputs.map((input, index) => {
                        return (
                            <div key={index}>
                                <h1 className={styles.modalInput}>{input.value}</h1>
                                <input
                                    defaultValue={input.defaultValue}
                                    type="number"
                                    className={styles.modalValue}
                                    ref={input.ref}
                                />
                            </div>
                        );
                    })}
                </div>
                <br />
                <button
                    className={styles.pomoSaveBtn}

                    onClick={() => updateTimeDefaultValue()}
                >
                    Save
                </button>
            </div>
        </>
    )
}


export default ModalSetting