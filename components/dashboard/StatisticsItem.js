import styles from "./StatisticsItem.module.css"

export default function StatisticsItem({ number, text, isUp }) {
    return (
        <div className="col-xxl-3 col-xl-6 col-lg-6 col-md-6 col-sm-6">
            <div className={`card-style-1 hover-up d-flex main-background border-1px border-radius-10 ${styles.cardResponsive}`}>
                <div className={`card-image flex-center mr-20 ${styles.iconWrapper} ${styles.spacingResponsive}`} >
                    <span >
                        <img src="/assets/icon/revenue.svg" alt="revenue" />
                    </span>
                </div>
                <div className="card-info w-60">
                    <div className="card-title">
                        <h3 className={`text-xl-bold neutral-1000 flex-space align-items-end ${styles.titleResponsive}`}>
                            <span className="count white-color font-15">{number}</span>
                            {(isUp >= 0) && <span className="up-color font-11">{isUp}%
                                <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11 1H19M19 1V9M19 1L11 9L7 5L1 11" stroke="#34D674" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </span>}
                        </h3>
                    </div>
                    <p className={`text-sm-medium neutral-500 ${styles.textResponsive}`}>{text}</p>
                </div>
            </div>
        </div>
    )
}
