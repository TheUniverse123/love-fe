import styles from "./TicketDetail.module.css";

export default function TicketDetail({
    discount,
    rating,
    reviews,
    title,
    time,
    address,
    price,
    imageSrc,
    link,
    buttonText,
    isButtonVisible = true,
    mode = "ticket"
}) {
    return (
        <section className="box-section block-content-tourlist main-background">
            <div className={styles.ticketWrapper}>
                <div className="box-content-main-detail pb-0">
                    <div className="box-grid-hotels box-list-hotels-detail wow fadeIn">
                        <div className="card-flight card-hotel main-background">
                        </div>
                        <div className="card-flight card-hotel main-background">
                            <div className={`card-image ${styles.cardImage}`}>
                                <a className={`wish flex-center main-background ${styles.discount}`} href="#">
                                    <svg style={{ stroke: "white" }} width={40} height={40} viewBox="0 0 20 18"
                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.071 10.1422L11.4141 15.7991C10.6331 16.5801 9.36672 16.5801 8.58568 15.7991L2.92882 10.1422C0.9762 8.1896 0.9762 5.02378 2.92882 3.07116C4.88144 1.11853 8.04727 1.11853 9.99989 3.07116C11.9525 1.11853 15.1183 1.11853 17.071 3.07116C19.0236 5.02378 19.0236 8.1896 17.071 10.1422Z" stroke strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </a>
                                <a href={link} className={styles.image}>
                                    <img src={imageSrc} alt="Travila" />
                                </a>
                            </div>
                            <div className={`card-info main-background border-color ${styles.cardInfo}`}>
                                {discount && <label className="sale-lbl label-discount">-{discount}%</label>}
                                <div className="tour-rate">
                                    <div className="rate-element main-background border-color">
                                        <span className="rating white-color">{rating} <span className="text-sm-medium neutral-500">
                                            ({reviews} reviews)</span>
                                        </span>
                                    </div>
                                </div>
                                <div className="card-title">
                                    <a className="heading-6 white-color font-20"
                                        href={link}>{title}
                                    </a>
                                </div>
                                <div className="card-program">
                                    <div className="card-duration-tour mb-15">
                                        <img src="/assets/icon/clock1.svg" alt="Clock Icon" />
                                        <p className="text-time-ticket text-md-medium">{time}</p>
                                    </div>
                                    <div className={`card-duration-tour ${mode === "review" ? "mb-0" : ""}`}>
                                        <img src="/assets/icon/clock1.svg" alt="Clock Icon" />
                                        <div>
                                            <p className="text-time-ticket text-md-medium">Workshop 1</p>
                                            <p className="neutral-500 text-md-medium pl-10 font-14">{address}</p>
                                        </div>
                                    </div>
                                    <div className={`endtime ${mode === "review" ? "align-items-end" : ""}`}>
                                        <div className={`card-price ${mode === "review" ? "d-flex h-100 align-items-start" : ""}`}>
                                            <h6 className="heading-6 primary-color">{price} đ</h6>
                                        </div>
                                        {isButtonVisible && <div className="card-button">
                                            <a className={`btn btn-gray ${styles.button} ${styles.buttonTicket} ${styles.greyText} ${styles.greyColor}`} href="/user/ticket/1">
                                                {buttonText}
                                            </a>
                                        </div>}

                                        {mode === "review" && <div className={`tour-rate col-lg-4 d-flex ${styles.tourRate}`}>
                                            <a href={mode === "review" && "/dashboard/review/1"} className={`btn btn-default primary-background white-color hover-opacity mb-10 ${styles.buttonManage}`}>Chấp nhận</a>
                                            <a className={`btn btn-default border-1px main-background primary-color hover-opacity ${styles.buttonManage}`}>Từ chối</a>
                                        </div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
