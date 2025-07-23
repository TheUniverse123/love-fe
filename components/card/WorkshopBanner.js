'use client'

import React, { useRef } from 'react';
import CardImage from "./CardImage";
import Slider from "react-slick";
import styles from "./WorkshopBanner.module.css";
import { useQuery } from '@tanstack/react-query';
import { fetchWorkshops } from '@/app/api/workshop';
import { shuffleArray } from '@/app/util/convert';

export default function WorkshopBanner() {
    const { data: randomWorkshop } = useQuery({
        queryKey: ['random-workshops'],
        queryFn: ({ signal }) => fetchWorkshops({ signal, pageNumber: 1, pageSize: 10 }),
    });

    const result = shuffleArray(randomWorkshop || [])?.filter(item => item.status === 1)
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
        <section className="section-box box-2-banner" style={{
            paddingTop: "90px",
            background: "linear-gradient(to right, #313131 0%, #191919 63%)"
        }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 mb-30">
                        <div className="card-banner">
                            <div className="card-image">
                                <img style={{ height: "222px", width: "600px", objectFit: "cover" }} src="/assets/banner/banner3.png" alt="banenr1" />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 mb-30">
                        <div className="card-banner">
                            <div className="card-image">
                                <img style={{ height: "222px", width: "600px", objectFit: "cover" }} src="/assets/banner/banner4.png" alt="banenr2" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className={`mb-40 mt-100 ${styles.titleWrapper}`}>
                    <h2 className={`neutral100-color ${styles.title}`}>Workshop nổi bật</h2>
                    <div className="box-button-slider box-button-slider-team text-end">
                        <div
                            className={`${styles.swiperButtonPrev} swiper-button-prev swiper-button-prev-style-1 swiper-button-prev-animate arrow-button-background`}
                            onClick={goToPrev}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                <path d="M7.99992 3.33325L3.33325 7.99992M3.33325 7.99992L7.99992 12.6666M3.33325 7.99992H12.6666" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div
                            className={`${styles.swiperButtonNext} swiper-button-next swiper-button-next-style-1 swiper-button-next-animate arrow-button-background`}
                            onClick={goToNext}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                <path d="M7.99992 12.6666L12.6666 7.99992L7.99992 3.33325M12.6666 7.99992L3.33325 7.99992" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <Slider ref={sliderRef} {...settings}>
                        {result?.map(item => <div className="swiper-slide">
                            <CardImage img={item.imagePath} />
                        </div>)}
                    </Slider>
                </div>
            </div>
        </section>
    );
}
