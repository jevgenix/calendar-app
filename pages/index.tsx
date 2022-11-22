import type { NextPage } from "next";
import {
  useSession,
  signIn,
  getSession,
  GetSessionParams,
  signOut,
} from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Schedule, GetSResults, Weather, Calendar } from "../types";
import styles from "../styles/Home.module.css";
import Navbar from "../components/MainPage/NavBar/Navbar";
import { Head, Main } from "next/document";
import MainPagePomo from "../components/MainPage/MainPagePomo";
import MainPageWeather from "../components/MainPage/MainPageWeather";
import moment from "moment";
//npm i react-loader-spinner
import { ProgressBar } from "react-loader-spinner";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const [dataG, setDataG] = useState<Calendar>();
  const [dataStatus, setStatus] = useState<boolean>(false);
  const [CalId, setCalId] = useState<string>();

  useEffect(() => {
    const fData = async () => {
      //Kahden ensimmäisen kalenterin hakeminen onnistuu, mutta kolmannen ja neljännen ei onnistu
      //Googlen julkiset kalenterit ei toimi jostain syystä, mutta omat kalenterit toimii
      if (CalId === "primary") {
        const response = await fetch(
          "/api/getCalendarEvents/appcalendat2022@gmail.com"
        );
        const events = await response.json();
        setDataG(events);
        setStatus(true);
      } else if (CalId === "secondary") {
        const response = await fetch(
          "/api/getCalendarEvents/c7b9cbd0651ff8e00fe3f367826385d6ad7277fa8469667196f250f1e10b246a@group.calendar.google.com"
        );
        const events = await response.json();
        setDataG(events);
        setStatus(true);
        //Ei toimi
      } else if (CalId === "third") {
        const response = await fetch(
          "/api/getCalendarEvents/addressbook#contacts@group.v.calendar.google.com"
        );
        const events = await response.json();
        setDataG(events);
        setStatus(true);
        //Ei toimi
      } else if (CalId === "fourth") {
        const response = await fetch(
          "/api/getCalendarEvents/fi.finnish#holiday@group.v.calendar.google.com"
        );
        const events = await response.json();
        setDataG(events);
        setStatus(true);
      } else {
        const response = await fetch("/api/getCalendarEvents/primary");
        const events = await response.json();
        setDataG(events);
        setStatus(true);
      }

      // const res = await fetch("/api/getCalendarsList");
      // const calendarsList = await res.json();

      // console.log(calendarsList);
    };

    void fData();
  }, [CalId, setCalId]);

  <Head>
    <Head>Home page</Head>
    <meta name="description" content="Generated by create next app" />
    <link rel="icon" href="/favicon.ico" />
  </Head>;

  if (status === "authenticated" && dataStatus === true) {
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

            <select
              name="slc"
              id="cal"
              title="Choose your calendar"
              className={styles.calSelect}
              onChange={(e) => setCalId(e.target.value)}
            >
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="third">Third</option>
              <option value="fourth">Fourth</option>
            </select>

            {dataG?.events.map((a) => {
              return (
                <ul key={a.id} className={styles.scList}>
                  <li className={styles.task}>{a.summary}</li>
                  <li className={styles.task}>
                    Start:{" "}
                    {moment(a.start.dateTime).format("HH:mm (DD-MM-YYYY)")}
                  </li>
                  <li className={styles.task}>
                    End: {moment(a.end.dateTime).format("HH:mm (DD-MM-YYYY)")}
                  </li>
                </ul>
              );
            })}
          </div>
        </main>
      </div>
    );
  } else if (status !== "authenticated") {
    return (
      <div>
        <p>You are not signed in.</p>
        <button onClick={() => signIn()}>Sign in</button>
      </div>
    );
  } else {
    //Loaderi
    return (
      <div className={styles.spinner}>
        <ProgressBar barColor="#284E47" borderColor="black" />
      </div>
    );
  }
};

export default Home;
export const getServerSideProps = async (
  context: GetSessionParams | undefined
) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }
  return {
    props: {
      session,
    },
  };
};
