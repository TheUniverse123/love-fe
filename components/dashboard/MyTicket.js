import Link from "next/link";
import styles from "../explore/TicketDetail.module.css";
import styleMain from "./MyEvent.module.css"
import { fetchCancelTicket } from "@/app/api/manage-workshop";
import { toast } from "react-toastify";
import { queryClient } from "@/app/util/providers";
import { useState } from "react";
export default function MyTicket({
    title,
    time,
    address,
    link,
    buttonText,
    isButtonVisible = true,
    isSuccess = "pending",
    fullName,
    bookingCode,
    email,
    quantity,
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

    const [showModal, setShowModal] = useState(false)

    async function handleCancel() {
        if ((isSuccess !== "success" && isSuccess !== "canceled")) {
            const response = await fetchCancelTicket(bookingCode)
            if (response.statusCode === 200) {
                toast.success("Hủy vé thành công")
                queryClient.invalidateQueries({ queryKey: ["ordered-tickets"] })
                setShowModal(false)
            }
        }
    }
    return (
        <div className="box-content-main-detail pb-0 pt-20">
            <div className="box-grid-hotels box-list-hotels-detail wow fadeIn">
                <div className={`card-flight card-hotel main-background border-color ${styleMain.cardInfo}`}>
                    <div className="col-lg-6 pr-30 border-white-dash-right">
                        <div className="card-title mb-10">
                            <Link
                                className="heading-6 white-color font-18"
                                href={link}>{title}
                            </Link>
                        </div>
                        <div className="card-program">
                            <div className="card-duration-tour mb-15 white-color d-flex">
                                <img src="/assets/icon/clock1.svg" alt="Clock Icon" />
                                <p className="text-time-ticket text-md-medium">{time}</p>
                            </div>
                            <div className="card-duration-tour d-flex">
                                <img src="/assets/icon/clock1.svg" alt="Clock Icon" />
                                <div>
                                    <p className="text-time-ticket text-md-medium">Workshop 1</p>
                                    <p className="neutral-500 text-md-medium pl-10">{address}</p>
                                </div>
                            </div>
                            <div className="endtime">
                                {isButtonVisible && <div className="card-button">
                                    <Link className={`btn btn-gray ${styles.button} ${styles.buttonTicket} ${styles.greyText} ${styles.greyColor}`} href="/user/ticket/1">
                                        {buttonText}
                                    </Link>
                                </div>}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 pl-30">
                        <div className="row justify-content-between">
                            <div className="col-lg-8">
                                <p className="white-color text-lg-bold mb-20">Họ và tên: {fullName}</p>
                                <p className="white-color text-lg-bold mb-20">Mã đặt chỗ: #{bookingCode}</p>
                                <p className="white-color text-lg-bold mb-20">Email: {email}</p>
                                <p className="white-color text-lg-bold mb-20">Số lượng: {quantity}</p>
                            </div>
                            <div className="col-lg-4 row flex-column flex-end">
                                <button className={`${buttonIsSuccessStyle} ${styleMain.buttonStyle} mb-15`}>{statusText}</button>
                                <button className={`btn btn-default border-1px main-secondary-background primary-color hover-opacity mb-15 ${styleMain.buttonStyle}`}>Xem chi tiết</button>
                                <button
                                    style={{
                                        textDecoration: (isSuccess === "success" || isSuccess === "canceled")
                                            ? "line-through" : "none"
                                    }}
                                    disabled={(isSuccess === "success" || isSuccess === "canceled")}
                                    className={`btn btn-default border-1px main-secondary-background neutral700-color hover-opacity ${styleMain.buttonStyle}`}
                                    onClick={() => setShowModal(true)}
                                >
                                    Hủy vé
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="modal fade show flex-center" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content p-30 main-secondary-background">
                            <div className="modal-body flex-center flex-column">
                                <img src="/assets/icon/fail-icon.svg" />
                                <h6 className="modal-title text-center mb-10 mt-10 white-color" id="exampleModalLabel">Xác nhận hủy vé</h6>
                                <p className="neutral-500">Bạn chắc chắn muốn hủy vé?</p>
                            </div>
                            <div className="modal-footer border-0px flex-center">
                                <a onClick={handleCancel} className="btn btn-default primary-background">
                                    Đồng ý
                                </a>
                                <button className="btn btn-default" onClick={() => setShowModal(false)}>Hủy</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
