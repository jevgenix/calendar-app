import styles from '../../styles/Login.module.css'
import { signIn } from 'next-auth/react'
const LoginScreen = () => {
    return (
        <div className={styles.loginscreen}>

            <div className={styles.screen_content}>
                <h1 className={styles.loginscreen_header}> Automate your workflow </h1>
                <p className={styles.loginscreen_text}>What do you want to do next?
                    Just think about all the missing opportunities because of bad time management!
                    Try for free, and see how impactful workflow automation can be.</p>
                <button className={styles.button} onClick={() => signIn()}>Sign in with Google</button>
            </div>

        </div>
    )
}


export default LoginScreen