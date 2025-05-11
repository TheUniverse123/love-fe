import Logo from "@/public/assets/logo/logo";
import UserNavigation from "../navigation/UserNavigation";
import styles from "./UserHeader.module.css"
import Button from "../button/Button";
export default function UserHeader() {
    return (
        <header className={`header sticky-bar ${styles.header}`}>
            <div className={`background-body ${styles.backgroundSecondary}`}>
                <div className={`main-header ${styles.backgroundSecondary}`}>
                    <div className="header-left">
                        <div className="header-logo">
                            <a className="d-flex" href="/">
                                <Logo />
                            </a>
                        </div>
                        <div className="header-nav">
                            <UserNavigation />
                        </div>
                    </div>
                    <div className="header-right">
                        <div className="d-none d-xxl-inline-block align-middle mr-22">
                            <Button link="/dashboard/create-event" text="Tạo sự kiện" color="primary" style={{ marginRight: "21px" }} />
                            <Button text="Đăng nhập" color="grey" isSignIn={true}/>
                        </div>
                        <div className={`burger-icon-2 burger-icon-white ${styles.primaryBackground}`}>
                            <img src="/assets/lib/user/imgs/template/icons/menu.svg" alt="icon menu" />
                        </div>
                        <div className="burger-icon burger-icon-white">
                            <span className="burger-icon-top" />
                            <span className="burger-icon-mid" />
                            <span className="burger-icon-bottom" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}