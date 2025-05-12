import styles from "./SidebarCanvas.module.css"
import { quickLinks } from "@/data"
import Image from "next/image"

export default function SidebarCanvas() {
    return (
        <div className="sidebar-canvas-wrapper perfect-scrollbar main-background">
            <div className="sidebar-canvas-container">
                <div className="sidebar-canvas-head border-1px-bottom">
                    <div className="sidebar-canvas-logo">
                        <a className="d-flex" href="/">
                            <img src="/assets/icon/logo.svg" />
                        </a>
                    </div>
                    <div className="sidebar-canvas-lang">
                        <div className="d-inline-block box-dropdown-cart align-middle mr-15">
                            <span className={`text-14-medium icon-list icon-account icon-lang white-color ${styles.iconLanguage} ${styles.iconAccount}`}>
                                <span className="text-14-medium arrow-down white-color">EN</span>
                            </span>
                            <div className="dropdown-account">
                                <ul>
                                    <li><a className="text-sm-medium" href="#">English</a></li>
                                    <li><a className="text-sm-medium" href="#">French</a></li>
                                    <li><a className="text-sm-medium" href="#">Chiness</a></li>
                                </ul>
                            </div>
                        </div>
                        <a className="close-canvas border-background" href="#">
                            <img alt="Travila" src="/assets/lib/user/imgs/template/icons/close.png" />
                        </a>
                    </div>
                </div>
                <div className="sidebar-canvas-content">
                    <div className="box-author-profile border-1px">
                        <div className="card-author">
                            <div className="card-image"> <img src="/assets/lib/user/imgs/page/homepage1/author2.png" alt="Travila" /></div>
                            <div className="card-info">
                                <p className="text-md-bold white-color">Tên người dùng</p>
                            </div>
                        </div>
                        <a className="btn btn-black border-background" href="#">Đăng xuất</a>
                    </div>
                    <div className="box-quicklinks">
                        <div className="box-list-quicklinks mb-20">
                            {quickLinks.map((item, index) => (
                                <div className="item-quicklinks" key={index}>
                                    <div className="item-icon border-background border-1px-3">
                                        <Image src={item.icon} alt={item.title} width={24} height={24} />
                                    </div>
                                    <div className="item-info">
                                        <a href={item.link}>
                                            <h6 className="text-md-bold white-color">{item.title}</h6>
                                        </a>
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
                        <div className="box-calendar-events">
                            <div id="calendar-events" className="border-background border-0px"></div>
                        </div>
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
