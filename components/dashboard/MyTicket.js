import styles from "../explore/TicketDetail.module.css";
import styleMain from "./MyEvent.module.css"
export default function MyTicket({
    title,
    time,
    address,
    link,
    buttonText,
    isButtonVisible = true,
    isSuccess = "pending"
}) {
    let buttonIsSuccessStyle = "btn btn-default danger-button-background hover-opacity black-color"
    if (isSuccess === "success") {
        buttonIsSuccessStyle = "btn btn-default success-button-background hover-opacity black-color"
    } else if (isSuccess === "canceled") {
        buttonIsSuccessStyle = "btn btn-default canceled-button-background hover-opacity black-color"
    }

    let statusText = "Đang xử lý"
    if (isSuccess === "success") {
        statusText = "Thành công"
    } else if (isSuccess === "canceled") {
        statusText = "Đã hủy vé"
    }
    return (
        <div className="box-content-main-detail pb-0 pt-20">
            <div className="box-grid-hotels box-list-hotels-detail wow fadeIn">
                <div className="card-flight card-hotel main-background m-0">
                </div>
                <div className="card-flight card-hotel main-background">
                    <div className={`card-info main-background border-color row ${styleMain.cardInfo}`}>
                        <div className="col-lg-5 pr-30 border-white-dash-right">
                            <div className="card-title">
                                <a
                                    className="heading-6 white-color font-18"
                                    href={link}>{title}
                                </a>
                            </div>
                            <div className="card-program">
                                <div className="card-duration-tour mb-15 white-color">
                                    <img src="/assets/icon/clock1.svg" alt="Clock Icon" />
                                    <p className="text-time-ticket text-md-medium">{time}</p>
                                </div>
                                <div className="card-duration-tour">
                                    <img src="/assets/icon/clock1.svg" alt="Clock Icon" />
                                    <div>
                                        <p className="text-time-ticket text-md-medium">Workshop 1</p>
                                        <p className="neutral-500 text-md-medium pl-10">{address}</p>
                                    </div>
                                </div>
                                <div className="endtime">
                                    {isButtonVisible && <div className="card-button">
                                        <a className={`btn btn-gray ${styles.button} ${styles.buttonTicket} ${styles.greyText} ${styles.greyColor}`} href="/user/ticket/1">
                                            {buttonText}
                                        </a>
                                    </div>}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 pl-30">
                            <div className="row justify-content-between mt-15">
                                <div className="col-lg-8">
                                    <p className="white-color text-lg-bold mb-20">Họ và tên: Nguyễn Văn A</p>
                                    <p className="white-color text-lg-bold mb-20">Mã đặt chỗ: SUV354</p>
                                    <p className="white-color text-lg-bold mb-20">Email: nguyenvana@gmail.com</p>
                                    <p className="white-color text-lg-bold mb-20">Số lượng: 3</p>
                                </div>

                                <div className="col-lg-4 row align-items-end">
                                    <button className={`${buttonIsSuccessStyle} ${styleMain.buttonStyle}`}>{statusText}</button>
                                    <button className={`btn btn-default border-1px main-secondary-background primary-color hover-opacity ${styleMain.buttonStyle}`}>Xem chi tiết</button>
                                    <button
                                        style={{
                                            textDecoration: (isSuccess === "success" || isSuccess === "canceled")
                                                ? "line-through" : "none"
                                        }}
                                        disabled={(isSuccess === "success" || isSuccess === "canceled")}
                                        className={`btn btn-default border-1px main-secondary-background neutral700-color hover-opacity ${styleMain.buttonStyle}`}>
                                        Hủy vé
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
