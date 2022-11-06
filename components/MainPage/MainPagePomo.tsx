import React, { useEffect, useState } from 'react'
import Countdown from "./Pomodoro/Countdown";



const MainPagePomo = () => {
  const [pomodoro, setPomodoro] = useState(25)
  const [shortBreak, setShortBreak] = useState(5)
  const [longBreak, setLongBreak] = useState(15)
  const [seconds, setSeconds] = useState(0)
  const [stage, setStage] = useState(0)
  const [ticking, setTicking] = useState(false)
  const [consumedSecond, setConsumedSecond] = useState(0)


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
  }

  const getTickingTime = () => {

    const timeStage: Record<number, any> = {
      0: pomodoro,
      1: shortBreak,
      2: longBreak,
    }

    return timeStage[stage]
  }

  const reset = () => {
    setTicking(false)
    setSeconds(0)
    setPomodoro(25)
    setLongBreak(15)
    setShortBreak(5)
    setConsumedSecond(0)
  }

  const updateMinute = () => {
    const updateStage: Record<number, any> = {
      0: setPomodoro,
      1: setShortBreak,
      2: setLongBreak,
    }

    return updateStage[stage]
  }

  const clocksTicking = () => {
    const minutes = getTickingTime()
    const setMinutes = updateMinute()

    if (minutes == 0 && seconds == 0) {
      reset()
    } else if (seconds == 0) {
      setMinutes((minute: number) => minute - 1)
      setSeconds(59)
    } else {
      setSeconds((seconds) => seconds - 1)
    }
  }

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

  }, [seconds, pomodoro, shortBreak, longBreak, ticking])

  return (
    <Countdown stage={stage} switchStage={switchStage} getTickingTime={getTickingTime} seconds={seconds} ticking={ticking} setTicking={setTicking} />
  );
};

export default MainPagePomo;
