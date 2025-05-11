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

    let borderRatingStyles = {
        border: "1px solid #313131!important",
        backgroundColor: "#171717!important"
    }
    if (backgroundColor === "secondary") {
        borderRatingStyles = {
            border: "1px solid #313131!important",
            backgroundColor: "var(--bg-secondary-color)!important"
        }
    }

    return (
        <div className="swiper-slide"
            style={{
                border: "none!important",
                maxWidth: "405px",
            }}>
            <div className="card-journey-small" style={{
                border: "none!important",
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            }}>
                <div className={`card-image ${styles.cardImage}`}>
                    <a className={`wish ${backgroundClass}`} href="#">
                        <svg width={20} height={18} style={{ stroke: "white!important" }} viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.071 10.1422L11.4141 15.7991C10.6331 16.5801 9.36672 16.5801 8.58568 15.7991L2.92882 10.1422C0.9762 8.1896 0.9762 5.02378 2.92882 3.07116C4.88144 1.11853 8.04727 1.11853 9.99989 3.07116C11.9525 1.11853 15.1183 1.11853 17.071 3.07116C19.0236 5.02378 19.0236 8.1896 17.071 10.1422Z" stroke strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                    <img className={styles.imageWorkshop} src={item.img} alt="workshop-item" />
                </div>
                <div className={`card-info ${backgroundClass} ${styles.cardInfo}`}>
                    <div className="card-rating">
                        <div className="card-left"> </div>
                        <div
                            className={`card-right`}
                        >
                            <span
                                style={borderRatingStyles}
                                className="text-white rating">{item.avgRating} <span className="text-sm-medium neutral-500">
                                    ({item.reviews} đánh giá)
                                </span>
                            </span>
                        </div>
                    </div>
                    <div className="card-title"> <a className="heading-6 text-white" href="rental-detail.html">{item.title}</a></div>
                    <div className="card-program">
                        <div className={`card-location ${styles.cardLocation}`}>
                            <img src="/assets/icon/ClockIcon.svg" alt="Clock Icon" />
                            <p className="text-time text-md-medium">{item.date}</p>
                        </div>

                        <div className="endtime">
                            <div className="card-price">
                                <h6 className="heading-6 text-white">{item.price}</h6>
                            </div>
                            <div className="card-button">
                                <a style={{ color: "#AFAFAF!important" }} className={`btn btn-gray ${styles.button}`} href="/user/explore/1">
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
