import React from 'react'
import styles from "../../../styles/Home.module.css"

import { signOut } from 'next-auth/react'
import NavbarLinks from './NavbarLinks'

const Navbar = () => {
  const links: Array<String> = ["Calendar"]

  return (
    <header>
      <nav className={styles.nav}>
        <ul style={{ color: "black" }}>
          {links.map((li) => <NavbarLinks key={"header_link"} link={li} links={[]} />)}
        </ul>
        <button className={styles.navBtn} onClick={() => signOut()}>Sign out</button>
      </nav>
    </header>
  )
}

export default Navbar