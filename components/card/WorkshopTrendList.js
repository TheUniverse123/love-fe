'use client'

import React, { useRef } from 'react';
import WorkshopCardItem from "./WorkshopCardItem";
import Slider from "react-slick";  // Import Slider from react-slick
import styles from "./WorkshopTrendList.module.css";

export default function WorkshopTrendList({ sectionType = "default", items, title, background = "black", ...props }) {
    const sliderRef = useRef(null);  // Create a reference for the slider

    let sectionStyle = '';
    if (sectionType === "default") {
        sectionStyle = '';
    } else if (sectionType === "style1") {
        sectionStyle = styles.sectionStyle1;
    } else if (sectionType === "style2") {
        sectionStyle = styles.sectionStyle2;
    }

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false, // Disable default arrows because we will use custom ones
        responsive: [
            {
                breakpoint: 768, // For small screens (adjust the number as needed)
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1024, // For medium screens
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

    // Handle prev and next actions
    const goToPrev = () => {
        if (sliderRef.current) {
            sliderRef.current.slickPrev(); // Use slickPrev() to go to the previous slide
        }
    };

    const goToNext = () => {
        if (sliderRef.current) {
            sliderRef.current.slickNext(); // Use slickNext() to go to the next slide
        }
    };

    return (
        <section className={`section-box box-recent-lauched-car ${sectionStyle} ${styles.sectionTrendList}`}>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-9">
                        <h2 className={`neutral100-color ${styles.title}`}>{title}</h2>
                    </div>
                    <div className="col-md-3 position-relative">
                        <div className="box-button-slider box-button-slider-team justify-content-end">
                            {/* Custom Prev and Next buttons */}
                            <div
                                className={`${styles.swiperButtonPrev} swiper-button-prev swiper-button-prev-style-1 swiper-button-prev-animate arrow-button-background`}
                                onClick={goToPrev} // Attach the custom prev function
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                    <path d="M7.99992 3.33325L3.33325 7.99992M3.33325 7.99992L7.99992 12.6666M3.33325 7.99992H12.6666" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div
                                className={`${styles.swiperButtonNext} swiper-button-next swiper-button-next-style-1 swiper-button-next-animate arrow-button-background`}
                                onClick={goToNext} // Attach the custom next function
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                    <path d="M7.99992 12.6666L12.6666 7.99992L7.99992 3.33325M12.6666 7.99992L3.33325 7.99992" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`container-slider box-swiper-padding ${styles.containerSlider}`}>
                <div className="box-swiper mt-30">
                    <Slider ref={sliderRef} {...settings}>
                        {items?.map((item) => (
                            <div key={item.id} className="swiper-slide">
                                <WorkshopCardItem key={item.id} item={item} backgroundColor={background} />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    );
}
