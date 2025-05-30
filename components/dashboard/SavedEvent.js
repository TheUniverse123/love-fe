import styles from "../explore/TicketDetail.module.css";
import styleMain from "./SavedEvent.module.css"
export default function SavedEvent({
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
}) {
    return (
        <div className="box-content-main-detail pb-0 pt-20">
            <div className="box-grid-hotels box-list-hotels-detail wow fadeIn">
                <div className="card-flight card-hotel main-background">
                    <div className={`card-image ${styleMain.cardImage}`}>
                        <a className={`wish flex-center main-background ${styleMain.wish}`} href="#">
                            <svg style={{ stroke: "white" }} width={29} height={29} viewBox="0 0 20 18"
                                fill="#D9D9D9" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.071 10.1422L11.4141 15.7991C10.6331 16.5801 9.36672 16.5801 8.58568 15.7991L2.92882 10.1422C0.9762 8.1896 0.9762 5.02378 2.92882 3.07116C4.88144 1.11853 8.04727 1.11853 9.99989 3.07116C11.9525 1.11853 15.1183 1.11853 17.071 3.07116C19.0236 5.02378 19.0236 8.1896 17.071 10.1422Z" stroke strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                        <a href={link}>
                            <img src={imageSrc} alt="image" />
                        </a>
                    </div>
                    <div className={`card-info main-background border-color row ${styleMain.cardInfo}`}>
                        <div className={`tour-detail-ticket col-lg-8 ${styleMain.maxHeight}`}>
                            <div className="card-title">
                                <a className={`heading-6 white-color font-18 ${styleMain.title} ${styleMain.titleResponsive} ${styleMain.titleSmall}`}
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
                                        <p className={`neutral-500 text-md-medium pl-10 ${styleMain.address}`}>{address}</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className={`tour-rate col-lg-4 mt-15 flex-space flex-column ${styleMain.maxHeight}`}>
                            <div className="rate-element main-background border-color">
                                <span className="rating white-color">{rating} <span className="text-sm-medium neutral-500">
                                    ({reviews} reviews)</span>
                                </span>
                            </div>

                            <div className="endtime">
                                <div className="card-price">
                                    <h3 className={`heading-6 primary-color font-30 ${styleMain.titlePrice}`}>{price}</h3>
                                </div>
                                {isButtonVisible && <div className="card-button">
                                    <a
                                        className={`btn btn-gray ${styles.button} ${styleMain.buttonTicket} ${styleMain.greyText} ${styleMain.greyColor}`}
                                        href="/user/ticket/1">
                                        {buttonText}
                                    </a>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}