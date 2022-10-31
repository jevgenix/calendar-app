import { Headerlink } from "../../../types"
import Link from "next/link"
import styles from '../../../styles/Home.module.css'


const NavbarLinks = ({ link }: Headerlink) => {
    return (
        <li className={styles.navItem}>
            <Link href="/">{link}</Link>
        </li>
    )
}

export default NavbarLinks
