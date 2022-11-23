import React, { useEffect, useState } from "react";
import { Calendar, Event } from "../../types";
import styles from "../../styles/Home.module.css"
import moment from 'moment'

const DisplayData = ({ calendarId }: any) => {
    const [loadingStatus, setLoadingStatus] = useState(false)
    const [loadCalendarEvents, setCalendarEvents] = useState<Calendar>()
    const [currentDate, setCurrentDate] = useState("")
    const [error, setError] = useState(false)
    useEffect(() => {
        const loadData = async () => {
            let id = calendarId
            const holiday = "#holiday@group"
            const contacts = "#contacts@group"
            if (calendarId.includes(holiday)) {
                const idList = id.split(holiday)
                id = idList[0] + "%23holiday@group" + idList[1]
            }
            if (calendarId.includes(contacts)) {
                const idList = id.split(contacts)
                id = idList[0] + "%23contacts@group" + idList[1]
            }
            try {
                const getCalendarData = await fetch(`/api/getCalendarEvents/${id}`)
                const jsonData = await getCalendarData.json()
                const date = new Date()
                setCurrentDate(date.toDateString())
                setCalendarEvents(jsonData)
                setLoadingStatus(true)
            } catch {
                setError(true)
            }
        }
        setCurrentDate("")
        setLoadingStatus(false)
        setError(false)
        loadData()
    }, [calendarId])
    if (loadingStatus && loadCalendarEvents != undefined) {
        const sortedList: Event[] = [...loadCalendarEvents.events].sort((a: Event, b: Event) => {
            var ab = new Date(a.start.dateTime || a.start.date).getTime()
            var bc = new Date(b.start.dateTime || b.start.date).getTime()
            if (ab < bc) return -1
            if (ab > bc) return 1
            else {
                return 0
            }
        })
        return (
            <div>
                {sortedList.map((event) => {
                    const start = new Date(event.start.dateTime || event.start.date)
                    const end = new Date(event.end.dateTime || event.end.date)
                    const startDate = start.toDateString()
                    const endDate = end.toDateString()
                    if (currentDate >= startDate && currentDate <= endDate) {
                        return (
                            <ul key={event.id} className={styles.scList}>
                                <li className={styles.task}>{event.summary}</li>
                                <li className={styles.task}>
                                    Start:{" "}
                                    {moment(event.start.dateTime).format("HH:mm (DD-MM-YYYY)")}
                                </li>
                                <li className={styles.task}>
                                    End: {moment(event.end.dateTime).format("HH:mm (DD-MM-YYYY)")}
                                </li>
                            </ul>
                        )
                    }
                })}
            </div>
        )
    }
    if (error) {
        return (
            <div>Counld not load the calendar.</div>
        )
    }
    else {
        return (
            <div>Loading...</div>
        )
    }
}

export default DisplayData