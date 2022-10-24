import React from 'react'
import { useSession, signOut, getSession, GetSessionParams } from 'next-auth/react'
import LoginContainer from '../components/LoginPage/LoginContainer'


const Login = () => {
    const { data: session } = useSession()
    if (session) {
        return (
            < div >
                <main>
                    {/* main page content  */}
                    <p>Welcome, {session?.user?.email}</p>
                    <button onClick={() => signOut()}>Sign out</button>
                </main>
            </div >
        )
    } else {
        // https://www.pinterest.com/#search
        return (

            <LoginContainer />
        )
    }
}

export default Login

export const getServerSideProps = async (context: GetSessionParams | undefined) => {
    const session = await getSession(context)

    if (session) {
        return {
            redirect: {
                destination: '/'
            }
        }
    }
    return {
        props: { session }
    }
}
