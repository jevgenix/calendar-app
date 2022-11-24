// import Image from 'next/image'
import styles from '../../styles/Login.module.css'

const SplashScreen = () => {
    return (
        // left screen here
        <div className={styles.splashscreen}>

            <div className={styles.screen_content}>

                <h1 className={styles.splashscreen_header}> ...try it now! </h1>
                {/* <img className={styles.image1} src='/images/plan.jpeg' />

                <img className={styles.image2} src='/images/coffee.jpeg' />
                <img className={styles.image3} src='/images/break.jpeg' />
                <img className={styles.image4} src='/images/calendar.png' /> */}

                {/* <img src='/images/calendar.jpeg' /> */}
                {/* <img src='/images/calendar.jpeg' /> */}

                <img src='/images/lazy.png' className={styles.resp} alt={''} />

                {/* <Image width={562} height={737} className={styles.resp} src='/images/lazy.png' alt={''} /> */}

            </div>
        </div>
    )
}

export default SplashScreen