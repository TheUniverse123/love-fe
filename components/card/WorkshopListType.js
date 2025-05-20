'use client'

import { useRef } from "react";
import Slider from "react-slick"; // Import Slider from react-slick
import styles from "./WorkshopListType.module.css";
import WorkshopTypeItem from "./WorkshopTypeItem";

const items = [
    {
        img: "/assets/workshop-category/image1.png",
        title: "Nghệ thuật và thủ công",
        value: "art",
    },
    {
        img: "/assets/workshop-category/image2.png",
        title: "Ẩm thực & pha chế",
        value: "food",
    },
    {
        img: "/assets/workshop-category/image3.png",
        title: "Sức khỏe",
        value: "health",
    },
    {
        img: "/assets/workshop-category/image4.png",
        title: "Phát triển kỹ năng",
        value: "skill",
    },
];

export default function WorkshopListType() {
    const sliderRef = useRef(null);

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            }, {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    const goToPrev = () => {
        if (sliderRef.current) {
            sliderRef.current.slickPrev();
        }
    };

    const goToNext = () => {
        if (sliderRef.current) {
            sliderRef.current.slickNext();
        }
    };

    return (
        <section className="section-box box-top-category main-background">
            <div className="container">
                <div className={`mb-40 ${styles.titleWrapper}`}>
                    <h2 className={`neutral100-color ${styles.title}`}>Bạn đang quan tâm chủ đề nào</h2>
                    <div className="box-button-slider box-button-slider-team text-end">
                        <div
                            className={`${styles.swiperButtonPrev} swiper-button-prev-style-1`}
                            onClick={goToPrev}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                <path d="M7.99992 3.33325L3.33325 7.99992M3.33325 7.99992L7.99992 12.6666M3.33325 7.99992H12.6666" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div
                            className={`${styles.swiperButtonNext} swiper-button-next-style-1`}
                            onClick={goToNext}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                <path d="M7.99992 12.6666L12.6666 7.99992L7.99992 3.33325M12.6666 7.99992L3.33325 7.99992" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className={`box-list-populars`}>
                    <Slider ref={sliderRef} {...settings}>
                        {items.map((item, index) => (
                            <WorkshopTypeItem
                                img={item.img}
                                title={item.title}
                                value={item.value}
                            />
                        ))}
                    </Slider>
                </div>

                <div className="col-md-4">
                    <div className="d-flex justify-content-start">
                        <a className={`btn btn-black-lg ${styles.button}`} href="/user/explore">
                            Xem thêm
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
