import type { NextPage } from 'next'
import { useSession, signIn, getSession, GetSessionParams } from 'next-auth/react'
import { Schedule } from "../types";
import MainPage from '../components/MainPage';


const Home: NextPage<{ tasks: Schedule[] }> = ({ tasks }) => {
  const { data: session, status } = useSession();
  console.log(session)
  if (status === 'authenticated') {
    return (
      //TÄHÄN DESIGN: VEIKKA!
      <MainPage />
    )
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

  if (!session) {
    return {
      redirect: {
        destination: '/login'
      }
    }
  }
  return {
    props: { session }
  }
}

