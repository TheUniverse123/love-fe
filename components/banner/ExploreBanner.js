'use client';
import 'bootstrap/dist/css/bootstrap.css';
import Image from 'next/image';
import { Carousel } from 'react-bootstrap';

export default function ExploreBanner() {
    return (
        <div className='container' style={{ paddingTop: '50px!important' }}>
            <Carousel controls={false} indicators={false} 
                interval={2000} pause="hover">
                <Carousel.Item>
                    <Image
                        src="/assets/banner/banner-explore.png"
                        alt="banner"
                        layout="responsive"
                        width={1260}
                        height={232}
                        style={{borderRadius: "20px"}}
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <Image
                        src="/assets/banner/banner-explore.png"
                        alt="banner"
                        layout="responsive"
                        width={1260}
                        height={232}
                        style={{borderRadius: "20px"}}
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <Image
                        src="/assets/banner/banner-explore.png"
                        alt="banner"
                        layout="responsive"
                        width={1260}
                        height={232}
                        style={{borderRadius: "20px"}}
                    />
                </Carousel.Item>
            </Carousel>
        </div>
    )
}
