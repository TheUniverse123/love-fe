'use client'

import { fetchLogout, fetchUserInfo } from "@/app/api/account"
import styles from "./SidebarCanvas.module.css"
import { quickLinks } from "@/data"
import Image from "next/image"
import { getUserInfo } from "@/app/util/auth"
import { useQuery } from "@tanstack/react-query"
import { fetchWorkshopOfUsers } from "@/app/api/workshop"
import CalendarSidebarCanvas from "../calendar/CalendarSidebarCanvas"
import { useEffect, useState } from "react"
import Link from "next/link"

const userInfo = getUserInfo()
export default function SidebarCanvas() {
    const [dataDates, setDataDates] = useState([])

    const { data } = useQuery({
        queryKey: ['user-info'],
        queryFn: ({ signal }) => fetchUserInfo({ signal, userId: userInfo.id }),
        staleTime: 1000 * 60 * 5,
        refetchInterval: 1000 * 60 * 5,
    })

    const { data: workshopDates } = useQuery({
        queryKey: ['workshop-dates'],
        queryFn: ({ signal }) => fetchWorkshopOfUsers({ signal, userId: userInfo.id }),
        staleTime: 1000 * 60 * 5,
        refetchInterval: 1000 * 60 * 5,
    })

    useEffect(() => {
        if (workshopDates) {
            if (workshopDates.statusCode === 200) {
                setDataDates(workshopDates.result)
            }
        }
    }, [workshopDates])
    const handleItemClick = (link, type) => {
        localStorage.setItem("activeItem", type);
        window.location.href = link
    };
    return (
        <div className="sidebar-canvas-wrapper perfect-scrollbar main-background">
            <div className="sidebar-canvas-container">
                <div className="sidebar-canvas-head border-1px-bottom">
                    <div className="sidebar-canvas-logo">
                        <Link className="d-flex" href="/">
                            <img src="/assets/icon/logo.svg" />
                        </Link>
                    </div>
                    <div className="sidebar-canvas-lang">
                        <div className="d-inline-block box-dropdown-cart align-middle mr-15">
                            <span className={`text-14-medium icon-list icon-account icon-lang white-color ${styles.iconLanguage} ${styles.iconAccount}`}>
                                <span className="text-14-medium arrow-down white-color">EN</span>
                            </span>
                            <div className="dropdown-account">
                                <ul>
                                    <li><Link className="text-sm-medium" href="#">English</Link></li>
                                    <li><Link className="text-sm-medium" href="#">French</Link></li>
                                    <li><Link className="text-sm-medium" href="#">Chiness</Link></li>
                                </ul>
                            </div>
                        </div>
                        <Link className="close-canvas border-background" href="#">
                            <img alt="Travila" src="/assets/lib/user/imgs/template/icons/close.png" />
                        </Link>
                    </div>
                </div>
                <div className="sidebar-canvas-content">
                    <div className="box-author-profile border-1px">
                        <div className="card-author">
                            <div className="card-image">
                                <img
                                    src={data?.result?.avatarUrl ? data?.result?.avatarUrl :
                                        "/assets/lib/user/imgs/page/homepage1/author2.png"}
                                    alt="Travila" />
                            </div>
                            <div className="card-info">
                                <p className="text-md-bold white-color">{data?.result?.fullName ? data?.result?.fullName : 'Tên người dùng'}</p>
                            </div>
                        </div>
                        <button className="btn btn-black border-background" onClick={fetchLogout}>Đăng xuất</button>
                    </div>
                    <div className="box-quicklinks">
                        <div className="box-list-quicklinks mb-20">
                            {quickLinks.map((item, index) => (
                                <div className="item-quicklinks" key={index}>
                                    <div className="item-icon border-background border-1px-3">
                                        <Image src={item.icon} alt={item.title} width={24} height={24} />
                                    </div>
                                    <div className="item-info">
                                        <Link href="" onClick={() => handleItemClick(item.link, item.type)}>
                                            <h6 className="text-md-bold white-color font-14">{item.title}</h6>
                                        </Link>
                                        <p className={`text-xs neutral-500 ${item.status || ''}`}>
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="box-eventsdate calendar-events-custom">
                        <h6 className="title-eventsdate white-color">Ngày sự kiện</h6>
                        <CalendarSidebarCanvas dataDates={dataDates} />
                    </div>

                    <div className="box-contactus">
                        <h6 className="title-contactus white-color">Thông tin liên hệ</h6>
                        <div className="contact-info">
                            <p className={`address-2 text-md-medium ${styles.greyColorContact}`}>4517 Washington Ave. <br />Manchester, Kentucky 39495</p>
                            <p className={`hour-work-2 text-md-medium ${styles.greyColorContact}`}>Hours: 8:00 - 17:00, Mon - Sat</p>
                            <p className={`email-2 text-md-medium ${styles.greyColorContact}`}>teamloveofficial6@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
