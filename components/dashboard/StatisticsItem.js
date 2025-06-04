import styles from "./StatisticsItem.module.css"

export default function StatisticsItem({ number, text }) {
    return (
        <div className="col-xxl-3 col-xl-6 col-lg-6 col-md-6 col-sm-6">
            <div className="card-style-1 hover-up d-flex main-background border-1px border-radius-10 p-20">
                <div className={`card-image flex-center mr-20 ${styles.iconWrapper}`} >
                    <span >
                        <img src="/assets/icon/revenue.svg" alt="revenue" />
                    </span>
                </div>
                <div className="card-info w-60">
                    <div className="card-title">
                        <h3 className="text-xl-bold neutral-1000 flex-space align-items-end">
                            <span className="count white-color">{number}</span>
                        </h3>
                    </div>
                    <p className="text-sm-medium neutral-500">{text}</p>
                </div>
            </div>
        </div>
    )
}
