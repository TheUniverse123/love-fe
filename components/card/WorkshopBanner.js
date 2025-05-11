import CardImage from "./CardImage"
import styles from "./WorkshopBanner.module.css"
export default function WorkshopBanner() {
    return (
        <section className="section-box box-2-banner" style={{
            paddingTop: "90px",
            background: "linear-gradient(to right, #313131 0%, #191919 63%)"
        }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 mb-30">
                        <div className="card-banner">
                            <div className="card-image"> <img style={{ height: "222px", width: "600px", objectFit: "cover" }} src="/assets/workshop/home/5.png" alt="banenr1" /></div>
                        </div>
                    </div>
                    <div className="col-lg-6 mb-30">
                        <div className="card-banner">
                            <div className="card-image"> <img style={{ height: "222px", width: "600px", objectFit: "cover" }} src="/assets/workshop/home/6.jpg" alt="banenr2" /></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className={`mb-40 mt-100 ${styles.titleWrapper}`}>
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

                <div className="row">
                    <CardImage img="/assets/workshop/home/7.png" />
                    <CardImage img="/assets/workshop/home/8.png" />
                    <CardImage img="/assets/workshop/home/9.png" />
                    <CardImage img="/assets/workshop/home/10.png" />
                </div>
            </div>
        </section>
    )
}
