import InputSearch from "../search/InputSearch"
import styles from "./UserNavigation.module.css"
export default function UserNavigation() {
    return (
        <nav className="nav-main-menu">
            <InputSearch />

            <ul className="main-menu">
                <li><a className={styles.colorNeutral1000} href="/">Trang chủ</a></li>
                <li><a className={styles.colorNeutral1000} href="/user/explore">Khám phá</a></li>
                <li><a className={styles.colorNeutral1000} href="/user/help-center">Trợ giúp</a></li>
            </ul>
        </nav >
    )
}
