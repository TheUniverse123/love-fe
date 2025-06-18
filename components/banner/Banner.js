'use client';
import 'bootstrap/dist/css/bootstrap.css';
import Image from 'next/image';
import { useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import styles from './Banner.module.css';

export default function Banner() {
    useEffect(() => {
        import("bootstrap/dist/js/bootstrap");
    }, []);

    return (
        <div className='main-background'>
            <Carousel controls={false} indicators={false}
                interval={2000} wrap={true}>
                <Carousel.Item>
                    <div className={styles.imageContainer}>
                        <Image
                            src="/assets/banner/banner2.png"
                            alt="banner"
                            fill
                            className={styles.bannerImage}
                            sizes="100vw"
                        />
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className={styles.imageContainer}>
                        <Image
                            src="https://firebasestorage.googleapis.com/v0/b/love-fe-71303.firebasestorage.app/o/imagePath%2Ftiktokbanner.jpg?alt=media&token=0876e236-3fe5-4982-b082-ef93e9c51a71"
                            alt="banner"
                            fill
                            className={styles.bannerImage}
                            sizes="100vw"
                        />
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className={styles.imageContainer}>
                        <Image
                            src="https://firebasestorage.googleapis.com/v0/b/love-fe-71303.firebasestorage.app/o/imagePath%2Fbannenthom.jpg?alt=media&token=ad49e95e-6224-4695-966e-b63cb45cc1de"
                            alt="banner"
                            fill
                            className={styles.bannerImage}
                            sizes="100vw"
                        />
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className={styles.imageContainer}>
                        <Image
                            src="https://firebasestorage.googleapis.com/v0/b/love-fe-71303.firebasestorage.app/o/imagePath%2Fchupanhdep.jpg?alt=media&token=972863cb-a734-45d5-9eab-6fb7be886be7"
                            alt="banner"
                            fill
                            className={styles.bannerImage}
                            sizes="100vw"
                        />
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className={styles.imageContainer}>
                        <Image
                            src="https://firebasestorage.googleapis.com/v0/b/love-fe-71303.firebasestorage.app/o/imagePath%2Fchuyendoiso.jpg?alt=media&token=69e3330e-b7c0-4196-83d5-7b04c7639247"
                            alt="banner"
                            fill
                            className={styles.bannerImage}
                            sizes="100vw"
                        />
                    </div>
                </Carousel.Item>
            </Carousel>
        </div>
    );
}
