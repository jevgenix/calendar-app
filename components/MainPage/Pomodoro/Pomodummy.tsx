import React, { useState } from 'react'
import { FiCommand, FiSettings } from "react-icons/fi"
import { Timer } from '../../../types'

const Countdown = ({ stage, switchStage, getTickingTime, seconds, ticking, setTicking }: Timer) => {
    const options: Array<String> = ["Pomodoro", "Short Break", "Long Break"]

    return (
        <div className='bg-white w-8/12 max-auto pt-5 text-black flex flex-col justify-center items-center'>

            <div className='flex gap-10 items-center'>


                {options.map((options, index) => {
                    return <h1 key={index}
                        className={` ${index == stage ? "bg-green-500 bg-opacity-30" : ""} p-1 cursor-pointer transition-all rounded`}
                        onClick={() => switchStage(index)}>{options}</h1>
                }
                )}

                <FiCommand />
                <FiSettings />
            </div>

            <div className="mt-10 mb-10">
                <h1 className="text-8xl font-bold select-none m-0">
                    {getTickingTime()}:{seconds.toString().padStart(2, "0")}
                </h1>
            </div>
            <button className='bg-green-200 px-12 py-2 text-2xl rounded-xl uppercase ' onClick={() => setTicking(ticking => !ticking)}>
                {ticking ? "Stop" : "Start"}
            </button>

        </div>
    )
}


export default Countdown