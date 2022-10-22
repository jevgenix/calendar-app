import React from 'react'
import { useSession, signIn, signOut, getSession, GetSessionParams } from 'next-auth/react'
import Head from "next/head"

const Login = () => {
    const { data: session } = useSession()
    if (session) {
        return (
            <div>
                <Head>
                    <title>Login </title>
                </Head>
                <main>
                    <p>Welcome, {session?.user?.email}</p>
                    <button onClick={() => signOut()}>Sign out</button>
                </main>
            </div>
        )
    } else {
        //TÄÄHN DESIGN
        return (
            <div>
                <p>You are not signed in.</p>
                <button onClick={() => signIn()}>Sign in</button>
            </div>
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
