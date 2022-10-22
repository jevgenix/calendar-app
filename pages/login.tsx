import React from 'react'
import { useSession, signIn, signOut, getSession, GetSessionParams } from 'next-auth/react'

const Login = () => {
    const { data: session } = useSession()
    if (session) {
        return (
            <div>
                <p>Welcome, {session?.user?.email}</p>
                <button onClick={() => signOut()}>Sign out</button>
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