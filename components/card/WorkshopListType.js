import styles from "./WorkshopListType.module.css"
import WorkshopTypeItem from "./WorkshopTypeItem"
export default function WorkshopListType() {
    return (
        <section className="section-box box-top-category main-background">
            <div className="container">
                <div className={`mb-40 ${styles.titleWrapper}`}>
                    <h2 className="neutral100-color">Bạn đang quan tâm chủ đề nào</h2>
                    <div className="box-button-slider box-button-slider-team text-end">
                        <div className={`${styles.swiperButtonPrev} swiper-button-prev-style-1`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                <path d="M7.99992 3.33325L3.33325 7.99992M3.33325 7.99992L7.99992 12.6666M3.33325 7.99992H12.6666" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div className={`${styles.swiperButtonNext} swiper-button-next-style-1`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                <path d="M7.99992 12.6666L12.6666 7.99992L7.99992 3.33325M12.6666 7.99992L3.33325 7.99992" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="box-list-populars">
                    <div className="row">
                        <WorkshopTypeItem
                            img="/assets/workshop-category/image1.png"
                            title="Nghệ thuật và thủ công"
                            link="destination-2.html"
                        />
                        <WorkshopTypeItem
                            img="/assets/workshop-category/image2.png"
                            title="Ẩm thực & pha chế"
                            link="destination-2.html"
                        />
                        <WorkshopTypeItem
                            img="/assets/workshop-category/image3.png"
                            title="Sức khỏe"
                            link="destination-2.html"
                        />
                        <WorkshopTypeItem
                            img="/assets/workshop-category/image4.png"
                            title="Phát triển kỹ năng"
                            link="destination-2.html"
                        />
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="d-flex justify-content-start">
                        <a className={`btn btn-black-lg ${styles.button}`} href="tour-grid.html">Xem thêm
                            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 15L15 8L8 1M15 8L1 8" stroke strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
