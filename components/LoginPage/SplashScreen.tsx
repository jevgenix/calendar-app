import styles from '../../styles/Login.module.css'

const SplashScreen = () => {
    return (
        // left screen here
        <div className={styles.splashscreen}>

            <div className={styles.screen_content}>
                <h1 className={styles.loginscreen_header}> Splash Screen!</h1>
                <p className={styles.loginscreen_text}>Some text here</p>

                <img className={styles.image1} src='/images/calendar.jpeg' />
                <img className={styles.image2} src='/images/calendar.jpeg' />
                {/* <img className={styles.image3} src='/images/calendar.jpeg' /> */}
                {/* <img src='/images/calendar.jpeg' /> */}
                {/* <img src='/images/calendar.jpeg' /> */}

            </div>
        </div>
    )
}

export default SplashScreen