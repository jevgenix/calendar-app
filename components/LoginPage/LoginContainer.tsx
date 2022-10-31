import Head from "next/head"
import styles from '../../styles/Login.module.css'
import SplashScreen from './SplashScreen'
import LoginScreen from "./LoginScreen"


const LoginContainer = () => {
    return (
        <div className={styles.container}>
            {/* <button onClick={() => console.log("log in!")}>Log in</button> */}
            <Head>
                <title>Login</title>
            </Head>

            <SplashScreen />
            <LoginScreen />

        </div>
    )
}

export default LoginContainer