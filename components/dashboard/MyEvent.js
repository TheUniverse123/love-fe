import styles from "./MyEvent.module.css"

export default function MyEvent({
    title,
    time,
    address,
    imageSrc,
    link,
    smallImage = false,
    isButtonVisible = true,
}) {
    return (
        <div className="box-content-main-detail pb-0 pt-20">
            <div className="box-grid-hotels box-list-hotels-detail wow fadeIn">
                <div className="card-flight card-hotel main-background border-1px">
                    <div className={`card-image ${styles.cardImage} ${smallImage ? styles.smallImage : styles.largeImage}`}>
                        <a className={`wish flex-center main-background ${styles.wish}`} href="#">
                            <svg className="stroke-white" width={29} height={29} viewBox="0 0 20 18"
                                fill="#D9D9D9" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.071 10.1422L11.4141 15.7991C10.6331 16.5801 9.36672 16.5801 8.58568 15.7991L2.92882 10.1422C0.9762 8.1896 0.9762 5.02378 2.92882 3.07116C4.88144 1.11853 8.04727 1.11853 9.99989 3.07116C11.9525 1.11853 15.1183 1.11853 17.071 3.07116C19.0236 5.02378 19.0236 8.1896 17.071 10.1422Z" stroke strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                        <a href={link}>
                            <img src={imageSrc} alt="Travila" />
                        </a>
                    </div>
                    <div className={`card-info main-background row border-none ${styles.cardInfoEvent}`}>
                        <div className={`tour-detail-ticket ${styles.tourDetail} ${isButtonVisible ? " col-md-8" : " col-md-12"}`}>
                            <div className="mt-10">
                                <a className="heading-6 white-color font-18"
                                    href={link}>{title}
                                </a>
                            </div>
                            <div className="card-program">
                                <div className="card-duration-tour mb-15">
                                    <img src="/assets/icon/clock1.svg" alt="Clock Icon" />
                                    <p className="text-time-ticket text-md-medium">{time}</p>
                                </div>
                                <div className="card-duration-tour">
                                    <img src="/assets/icon/clock1.svg" alt="Clock Icon" />
                                    <div>
                                        <p className="text-time-ticket text-md-medium">Workshop 1</p>
                                        <p className="neutral-500 text-md-medium pl-10">{address}</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                        {isButtonVisible &&
                            <div className={`tour-rate col-lg-4 d-flex ${styles.tourRate}`}>
                                <button className={`btn btn-default primary-background white-color hover-opacity mb-20 ${styles.buttonManage}`}>Quản lý</button>
                                <button className={`btn btn-default border-1px main-background primary-color hover-opacity ${styles.buttonManage}`}>Chỉnh sửa</button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
