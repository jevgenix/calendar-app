import React, { useCallback, useEffect, useRef, useState } from 'react'
import Countdown from "./Pomodoro/Countdown";
import ModalSetting from './Pomodoro/ModalSetting';
import styles from "../../styles/Home.module.css";

const MainPagePomo = () => {
  const [pomodoro, setPomodoro] = useState(25)
  const [shortBreak, setShortBreak] = useState(5)
  const [longBreak, setLongBreak] = useState(10)
  const [seconds, setSeconds] = useState(0)
  const [stage, setStage] = useState(0)
  const [ticking, setTicking] = useState(false)
  const [consumedSecond, setConsumedSecond] = useState(0)
  const [openSettings, setOpenSettings] = useState(false)
  const pomodoroRef = useRef<any>()
  const shortBreakRef = useRef<any>()
  const longBreakRef = useRef<any>()
  const [triggerButton, setTriggerButton] = useState(false)
  let pomoValue = pomodoroRef.current?.value
  let shortBreakValue = shortBreakRef.current?.value
  let longBreakValue = longBreakRef.current?.value

  const updateTimeDefaultValue = useCallback(() => {
    setPomodoro(pomodoroRef.current?.value)
    setShortBreak(shortBreakRef.current?.value)
    setLongBreak(longBreakRef.current?.value)
    setOpenSettings(false)
    setSeconds(0)
    setConsumedSecond(0)
    if (pomoValue != 25 || shortBreakValue != 5 || longBreakValue != 10) {
      setTriggerButton(true)
    }
  }, [setPomodoro, setShortBreak, setLongBreak,
    setOpenSettings, setSeconds, setConsumedSecond, setTriggerButton,
    pomoValue, shortBreakValue, longBreakValue])

  const switchStage = (index: number) => {
    const isYes = consumedSecond && stage !== index
      ? confirm("You sure you want to switch?")
      : false
    setStage(index)

    if (isYes) {
      reset()
      setStage(index)

    } else if (!consumedSecond) {
      setStage(index)
    }
    if (pomoValue != 25 || shortBreakValue != 5 || longBreakValue != 10) {
      setTriggerButton(true)
    } else {
      setTriggerButton(false)
    }
  }

  const reset = useCallback(() => {
    setTicking(false)
    setSeconds(0)
    setConsumedSecond(0)
    updateTimeDefaultValue()
  }, [setTicking, setSeconds, setConsumedSecond, updateTimeDefaultValue])

  const wholeReset = () => {
    pomodoroRef.current.value = 25
    shortBreakRef.current.value = 5
    longBreakRef.current.value = 10
    setTicking(false)
    setSeconds(0)
    setConsumedSecond(0)
    updateTimeDefaultValue()
    setTriggerButton(false)
  }

  const getTickingTime = useCallback(() => {
    const timeStage: Record<number, any> = {
      0: pomodoro,
      1: shortBreak,
      2: longBreak,
    }

    return timeStage[stage]
  }, [longBreak, pomodoro, shortBreak, stage])

  const updateMinute = useCallback(() => {
    const updateStage: Record<number, any> = {
      0: setPomodoro,
      1: setShortBreak,
      2: setLongBreak,
    }

    return updateStage[stage]
  }, [stage])

  const clocksTicking = useCallback(() => {
    const minutes = getTickingTime()
    const setMinutes = updateMinute()

    setTriggerButton(true)

    if (minutes == 0 && seconds == 0) {
      reset()
    } else if (seconds == 0) {
      setMinutes((minute: number) => minute - 1)
      setSeconds(59)
    } else {
      setSeconds((seconds) => seconds - 1)
    }
  }, [getTickingTime, seconds, updateMinute, reset])

  useEffect(() => {
    const timer = setInterval(() => {
      if (ticking) {
        setConsumedSecond(value => value + 1)
        clocksTicking()
      }
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [clocksTicking, seconds, pomodoro, shortBreak, longBreak, ticking])

  return (
    <div className={styles.widget}>

      <Countdown stage={stage} switchStage={switchStage} getTickingTime={getTickingTime}
        seconds={seconds} ticking={ticking} setTicking={setTicking} openSettings={openSettings}
        setOpenSettings={setOpenSettings} wholeReset={wholeReset} triggerButton={triggerButton} />

      <ModalSetting openSettings={openSettings} setOpenSettings={setOpenSettings}
        pomodoroRef={pomodoroRef} shortBreakRef={shortBreakRef} longBreakRef={longBreakRef}
        updateTimeDefaultValue={updateTimeDefaultValue} />
    </div>

  );
};

export default MainPagePomo;
