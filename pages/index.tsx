import type { NextPage } from 'next'
import { useSession, signIn, getSession, GetSessionParams, signOut } from 'next-auth/react'
import React, { useEffect, useState } from "react";
import { Schedule, GetSResults } from "../types";
import styles from '../styles/Home.module.css'
import Navbar from '../components/MainPage/NavBar/Navbar';
import { Head, Main } from 'next/document';
import MainPageAdvice from '../components/MainPage/MainPageAdvice';
import MainPagePomo from '../components/MainPage/MainPagePomo';
import MainPageWeather from '../components/MainPage/MainPageWeather';

const Home: NextPage<{ tasks: Schedule[] }> = ({ tasks }) => {

    const { data: session, status } = useSession();
    const [dataG, setDataG] = useState(null);
    useEffect(() => {
        const fData = async () => {
            const response = await fetch('/api/getCalendarsList')
            const rData = await response.json()
            setDataG(rData)
        }
        void fData()
    }, []);
    <Head>
        <Head>Home page</Head>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
    </Head>
    if (status === 'authenticated') {
        // console.log(dataG)
        return (
            <div>
                <Navbar />
                <main className={styles.main}>
                    <div>
                        <div className={styles.flexCenter}>
                            <MainPagePomo />
                        </div>
                        <div className={styles.flexCenter}>
                            <MainPageWeather />
                        </div>


                    </div>

                    <div className={styles.schedule}>
                        <h1 className={styles.header}>Schedule</h1>
                        {tasks.map((task) => {
                            return (
                                <ul key={task.id}>
                                    <li className={styles.task}>{task.summary}</li>
                                    <li className={styles.task}>{task.description}</li>
                                    <li className={styles.task}>{task.start.dateTime}</li>
                                    <li className={styles.task}>{task.end.dateTime}</li>
                                </ul>
                            );
                        })}
                    </div>

                </main>
            </div>
        );

    } else {
        return (
            //TÄHÄN MYÖS
            <div>
                <p>You are not signed in.</p>
                <button onClick={() => signIn()}>Sign in</button>
            </div>
        )
    }
}

export default Home
export const getServerSideProps = async (context: GetSessionParams | undefined) => {
    const session = await getSession(context)

    const res = await fetch(
        `https://raw.githubusercontent.com/vhjaho/calendar/main/calendar.json`
    );
    const { Events }: GetSResults = await res.json();

    if (!session) {
        return {
            redirect: {
                destination: '/login'
            }
        }
    }
    return {
        props: {
            session,
            tasks: Events
        },
    };
};

