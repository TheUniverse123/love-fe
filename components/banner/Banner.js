'use client';
import 'bootstrap/dist/css/bootstrap.css';
import Image from 'next/image';
import { useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
export default function Banner() {
    useEffect(() => {
        import("bootstrap/dist/js/bootstrap");
    }, []);

    return (
        <div className='main-background'>
            <Carousel controls={false} indicators={false}
                interval={2000} pause="hover">
                <Carousel.Item>
                    <Image
                        src="/assets/banner/banner.png"
                        alt="banner"
                        layout="responsive"
                        width={1920}
                        height={674}
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <Image
                        src="/assets/banner/banner.png"
                        alt="banner"
                        layout="responsive"
                        width={1920}
                        height={674}
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <Image
                        src="/assets/banner/banner.png"
                        alt="banner"
                        layout="responsive"
                        width={1920}
                        height={674}
                    />
                </Carousel.Item>
            </Carousel>
        </div>

    );
}
