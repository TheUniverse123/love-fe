'use client'

import Logo from "@/public/assets/logo/logo";
import UserNavigation from "../navigation/UserNavigation";
import styles from "./UserHeader.module.css"
import Button from "../button/Button";
import { getUserInfo } from "@/app/util/auth";
import { usePopup } from "@/contexts/PopupContext";
import { fetchLogout } from "@/app/api/account";
import Link from "next/link";
export default function UserHeader() {
    const { openPopup } = usePopup()
    function handleResetActiveItem() {
        localStorage.removeItem("activeItem");
    }

    return (
        <header className={`header sticky-bar ${styles.header}`}>
            <div className={`background-body ${styles.backgroundSecondary}`}>
                <div className={`main-header ${styles.backgroundSecondary}`}>
                    <div className="header-left">
                        <div className="header-logo">
                            <Link className="d-flex" href="/">
                                <Logo />
                            </Link>
                        </div>
                        <div className="header-nav">
                            <UserNavigation />
                        </div>
                    </div>
                    <div className="header-right">
                        <div className="mr-22">
                            {getUserInfo() &&
                                <Button onClick={handleResetActiveItem} link="/dashboard/create-event" text="Tạo sự kiện" color="primary" style={{ marginRight: "21px" }} />
                            }

                            {getUserInfo() ? <button className="btn btn-default grey-background btn-normal" onClick={fetchLogout}>
                                Đăng xuất
                            </button>
                                : <button className="btn btn-default grey-background btn-normal" onClick={openPopup}>
                                    Đăng nhập
                                </button>
                            }

                        </div>
                        {getUserInfo() && <div className={`burger-icon-2 burger-icon-white ${styles.primaryBackground}`}>
                            <img src="/assets/lib/user/imgs/template/icons/menu.svg" alt="icon menu" />
                        </div>}
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