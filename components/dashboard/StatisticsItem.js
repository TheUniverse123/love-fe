export default function StatisticsItem({ number, percent, text, isSuccess = true, icon }) {
    return (
        <div className="col-xxl-3 col-xl-6 col-lg-6 col-md-6 col-sm-6">
            <div className="card-style-1 hover-up d-flex main-background border-1px border-radius-10 p-20">
                <div className="card-image flex-center mr-20" style={{ width: "56px", height: "56px", borderRadius: "50%", backgroundColor: "#1D2024" }}>
                    <span >
                        <img src="/assets/icon/revenue.svg" alt="revenue" />
                    </span>
                </div>
                <div className="card-info w-60">
                    <div className="card-title">
                        <h3 className="text-xl-bold neutral-1000 flex-space align-items-end">
                            <span className="count white-color">{number}</span>
                            <span className="text-sm-medium neutral-500 status up flex-space">
                                <img src={isSuccess ? "/assets/icon/upicon.svg" : "/assets/icon/downicon.svg"} className="mr-5" />
                                <span className={isSuccess ? "up-color" : "down-color"}>{percent}%</span>
                            </span>
                        </h3>
                    </div>
                    <p className="text-sm-medium neutral-500">{text}</p>
                </div>
            </div>
        </div>
    )
}
