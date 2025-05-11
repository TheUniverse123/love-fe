import styles from "../card/WorkshopCardItem.module.css";

const ExploreWorkshopItem = ({ label, imgSrc, rating, title, date, price, link }) => {
    return (
        <div className="col-xl-4 col-lg-6 col-md-6">
            <div className="card-journey-small main-background border-1px" >
                <div className="card-image">
                    {label && <a className={`label danger-background white-color ${label.toLowerCase().replace(' ', '-')}`} href="#">{label}</a>}
                    <img style={{objectFit: "cover"}} src={imgSrc} alt="image workshop" />
                </div>
                <div className="card-info main-background">
                    <div className="card-rating">
                        <div className="card-left"> </div>
                        <div className="card-right">
                            <span className="rating main-secondary-background border-color white-color">
                                {rating} <span className="text-sm-medium neutral-500">({rating} đánh giá)</span>
                            </span>
                        </div>
                    </div>
                    <div className="card-title">
                        <a className="text-lg-bold white-color-2" href={link}>{title}</a>
                    </div>
                    <div className="card-program">
                        <div className="card-duration-tour">
                            <img src="/assets/icon/ClockIcon.svg" alt="Clock Icon" />
                            <p className="text-time text-md-medium">{date}</p>
                        </div>
                        <div className="endtime">
                            <div className="card-price">
                                <h6 className="heading-6 text-white">{price}</h6>
                            </div>
                            <div className="card-button">
                                <a style={{ color: "#EDEDED!important" }} className={`btn btn-gray ${styles.button}`} href={link}>
                                    Đặt ngay
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExploreWorkshopItem;
