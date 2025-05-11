import WorkshopCardItem from "./WorkshopCardItem"
import styles from "./WorkshopTrendList.module.css"

export default function WorkshopTrendList({ items, title, background = "black", ...props }) {
    return (
        <section {...props} className={`section-box box-recent-lauched-car ${styles.sectionTrendList}`}>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-9">
                        <h2 className="neutral100-color">{title}</h2>
                    </div>
                    <div className="col-md-3 position-relative">
                        <div className="box-button-slider box-button-slider-team justify-content-end">
                            <div className={`${styles.swiperButtonPrev} swiper-button-prev swiper-button-prev-style-1 swiper-button-prev-animate arrow-button-background`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                    <path d="M7.99992 3.33325L3.33325 7.99992M3.33325 7.99992L7.99992 12.6666M3.33325 7.99992H12.6666" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div className={`${styles.swiperButtonNext} swiper-button-next swiper-button-next-style-1 swiper-button-next-animate arrow-button-background`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                    <path d="M7.99992 12.6666L12.6666 7.99992L7.99992 3.33325M12.6666 7.99992L3.33325 7.99992" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-slider box-swiper-padding">
                <div className="box-swiper mt-30">
                    <div className="swiper-container swiper-group-animate swiper-group-journey" key={title}>
                        <div className="swiper-wrapper">
                            {items.map((item, index) => (
                                <WorkshopCardItem key={item.id} item={item} backgroundColor={background} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
