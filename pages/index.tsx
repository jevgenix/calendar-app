import type { NextPage } from 'next'
import { useSession, signIn, getSession, GetSessionParams, signOut } from 'next-auth/react'
import { Schedule, GetSResults } from "../types";
import MainPageCard from '../components/MainPage/MainPageCard';
import styles from '../styles/Home.module.css'
import Navbar from '../components/MainPage/NavBar/Navbar';
import { Head } from 'next/document';




const Home: NextPage<{ tasks: Schedule[] }> = ({ tasks }) => {
  const { data: session, status } = useSession();
  console.log(session);
  console.log(tasks);

  <Head>
    <Head>Home page</Head>
    <meta name="description" content="Generated by create next app" />
    <link rel="icon" href="/favicon.ico" />
  </Head>

  if (status === 'authenticated') {

    return (
      <div>
        <Navbar />
        <div className={styles.welcome}>
          <h1 className={styles.header}>
            Welcome to the home page, {session?.user?.name}!
          </h1>
        </div>
        <main className={styles.main}>
          <div className={styles.card}></div>
          <MainPageCard />

          <div className={styles.card}>
            <h1 className={styles.header}>Today&quot;s tasks</h1>
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

