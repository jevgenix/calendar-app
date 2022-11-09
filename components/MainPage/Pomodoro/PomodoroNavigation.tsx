import { FiCommand, FiSettings } from "react-icons/fi"
import styles from "../../../styles/Pomodoro.module.css";
import { PomoNavigation } from "../../../types";

const PomodoroNavigation = ({ setOpenSettings }: PomoNavigation) => {
    return (
        <nav className={styles.pomoNav}>
            <div className={styles.leftIcon}>
                <FiCommand />

            </div>
            <h3 className={styles.pomoHead}> Pomofocus </h3>
            <div className={styles.rightIcon}>
                <FiSettings onClick={() => setOpenSettings(value => !value)} />
            </div>
        </nav>
    )
}


export default PomodoroNavigation