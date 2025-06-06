import Link from "next/link";
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
                        <Link href={link}>
                            <img src={imageSrc} alt="image" />
                        </Link>
                    </div>
                    <div className={`card-info main-background border-color row ${styleMain.cardInfo}`}>
                        <div className={`tour-detail-ticket col-lg-8 ${styleMain.maxHeight}`}>
                            <div className="card-title">
                                <Link className={`heading-6 white-color font-18 ${styleMain.title} ${styleMain.titleResponsive} ${styleMain.titleSmall}`}
                                    href={link}>{title}
                                </Link>
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
                                    <Link
                                        className={`btn btn-gray ${styles.button} ${styleMain.buttonTicket} ${styleMain.greyText} ${styleMain.greyColor}`}
                                        href="/user/ticket/1">
                                        {buttonText}
                                    </Link>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}