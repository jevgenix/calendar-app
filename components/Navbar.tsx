import React from 'react'
import styles from '../styles/Home.module.css'
import { useSession, signOut } from 'next-auth/react'

const Navbar = () => {
  return (
    <footer>
    <nav className={styles.nav}>
        <ul>
            <li className={styles.navItem}><a href="/">Profile</a></li>
            <li className={styles.navItem}><a href="/">Calendar</a></li>
            <li className={styles.navItem}><a href="/">Options</a></li>
        </ul>
        <button className={styles.navBtn} onClick={() => signOut()}>Sign out</button>
    </nav>
    </footer>
  )
}

export default Navbar