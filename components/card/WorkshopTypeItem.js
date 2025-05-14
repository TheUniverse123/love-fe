'use client'

import styles from "./WorkshopTypeItem.module.css"
export default function WorkshopTypeItem({ img, title, value }) {
    return (
        <div className="col-lg-12 col-sm-12">
            <div className="card-popular hover-up secondary-background border-none mr-25">
                <div className="card-image"> <img src={img} alt="Travila" /></div>
                <div className="card-info">
                    <div className="card-meta">
                        <a className="card-title text-white" href={`/user/explore?type=${value}`}>{title}</a>
                        <div className="card-button" >
                            <a href={`/user/explore?value=${value}`} className={styles.cardButton}>
                                <svg width={10} height={10} viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.00011 9.08347L9.08347 5.00011L5.00011 0.916748M9.08347 5.00011L0.916748 5.00011" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
