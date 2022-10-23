import React from 'react'
import { useSession, signIn, signOut, getSession, GetSessionParams } from 'next-auth/react'
import Head from "next/head"

const Login = () => {
    const { data: session } = useSession()
    const LoginForm = () => {
        return (
            <form action="/send-data-here" method="post">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required />
                <button type="submit">Log in</button>
                <button type="submit">Register</button>
            </form>
        )
    }
    if (session) {
        return (
            <div>

                <main>
                    {/* main page content  */}

                    <p>Welcome, {session?.user?.email}</p>
                    <button onClick={() => signOut()}>Sign out</button>
                </main>
            </div>
        )
    } else {
        //TÄÄHN DESIGN
        return (
            <div>
                <Head>
                    <title>Login </title>
                </Head>
                <h1> Hello </h1>
                <p>You are not signed in.</p>
                <LoginForm />

                <button onClick={() => signIn()}>Sign in with Google</button>
                {/* <button onClick={() => console.log("log in!")}>Log in</button> */}
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
