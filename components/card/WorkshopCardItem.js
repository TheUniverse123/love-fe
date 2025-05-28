import styles from "./WorkshopCardItem.module.css";
export default function WorkshopCardItem({ item = {
    img: "",
    avgRating: 0,
    reviews: 0,
    title: "",
    date: "",
    price: 0,
}, backgroundColor = "black" }) {
    let backgroundClass = "main-background"
    if (backgroundColor === "secondary") {
        backgroundClass = "secondary-background"
    }
    let borderRatingStyles = `${styles.borderRating} ${styles.backgroundDefault}`
    if (backgroundColor === "secondary") {
        borderRatingStyles = `${styles.borderRating} ${styles.backgroundSecondary}`
    }
    return (
        <div className={`border-0px ${styles.card} mr-25`}>
            <div className="card-journey-small border-0px" style={{
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            }}>
                <div className={`card-image ${styles.cardImage}`}>
                    <a className={`wish flex-center ${backgroundClass}`} href="#">
                        <svg width={20} height={18} className="stroke-white" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.071 10.1422L11.4141 15.7991C10.6331 16.5801 9.36672 16.5801 8.58568 15.7991L2.92882 10.1422C0.9762 8.1896 0.9762 5.02378 2.92882 3.07116C4.88144 1.11853 8.04727 1.11853 9.99989 3.07116C11.9525 1.11853 15.1183 1.11853 17.071 3.07116C19.0236 5.02378 19.0236 8.1896 17.071 10.1422Z" stroke strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                    <img className={styles.imageWorkshop} src={item.img} alt="workshop-item" />
                </div>
                <div className={`card-info ${backgroundClass} ${styles.cardInfo} d-flex flex-column flex-space-start`}>
                    <div className="card-rating">
                        <div className="card-left"> </div>
                        <div
                            className={`card-right`}
                        >
                            <span
                                className={`white-color rating ${borderRatingStyles}`}>{item.avgRating} <span className="text-sm-medium neutral-500">
                                    ({item.reviews} đánh giá)
                                </span>
                            </span>
                        </div>
                    </div>
                    <div className="card-title"> <a className="heading-6 white-color" href="rental-detail.html">{item.title}</a></div>
                    <div className="card-program">
                        <div className={`card-location ${styles.cardLocation}`}>
                            <img src="/assets/icon/ClockIcon.svg" alt="Clock Icon" />
                            <p className="text-time text-md-medium">{item.date}</p>
                        </div>

                        <div className={`endtime ${styles.endSection}`}>
                            <div className="card-price">
                                <h6 className="heading-6 white-color">{item.price}</h6>
                            </div>
                            <div className="card-button white-color">
                                <a className={`btn btn-gray ${styles.button} ${styles.whiteColor} ${styles.whiteText}`} href="/user/explore/1">
                                    Tìm hiểu thêm
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
