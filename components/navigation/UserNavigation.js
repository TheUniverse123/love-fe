import Link from "next/link"
import InputSearch from "../search/InputSearch"
import styles from "./UserNavigation.module.css"
export default function UserNavigation() {
    return (
        <nav className="nav-main-menu">
            <InputSearch />

            <ul className="main-menu">
                <li><Link className={styles.colorNeutral1000} href="/">Trang chủ</Link></li>
                <li><Link className={styles.colorNeutral1000} href="/user/explore">Khám phá</Link></li>
                <li><Link className={styles.colorNeutral1000} href="/user/help-center">Trợ giúp</Link></li>
            </ul>
        </nav >
    )
}
