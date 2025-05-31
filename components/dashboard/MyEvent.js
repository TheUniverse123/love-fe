'use client'

import { useEffect, useState } from "react"
import styles from "./MyEvent.module.css"

export default function MyEvent({
    title,
    time,
    address,
    imageSrc,
    link,
    smallImage = false,
    isButtonVisible = true,
    mode = "manage",
    tab = "",
    workshopId = 0
}) {
    const [tabText, setTabText] = useState('Quản lý')
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        if (mode === "review") {
            if (tab === "upcoming") {
                setTabText("Xem chi tiết")
            } else if (tab === "past") {
                setTabText("Đã duyệt")
            } else if (tab === "waiting") {
                setTabText("Từ chối")
            }
        }
    }, [mode, tab])

    const handleDecline = () => {
        setShowModal(false); // Close modal after decline
        console.log("Workshop has been declined.");
    }

    return (
        <div className="box-content-main-detail pb-0 pt-20">
            <div className="box-grid-hotels box-list-hotels-detail wow fadeIn">
                <div className="card-flight card-hotel main-background border-1px">
                    <div className={`card-image ${styles.cardImage} ${smallImage ? styles.smallImage : styles.largeImage}`}>
                        <a href={link}>
                            <img src={imageSrc} alt="Travila" />
                        </a>
                    </div>
                    <div className={`card-info main-background row border-none ${styles.cardInfoEvent}`}>
                        <div className={`tour-detail-ticket ${styles.tourDetail} ${isButtonVisible ? " col-md-8" : " col-md-12"}`}>
                            <div className="mt-10 mb-5">
                                <a className="heading-6 white-color font-18"
                                    href={link}>{title}
                                </a>
                            </div>
                            <div className="card-program">
                                <div className="card-duration-tour mb-15">
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
                            </div>
                        </div>
                        {isButtonVisible &&
                            <div className={`tour-rate col-lg-4 d-flex ${styles.tourRate}`}>
                                <a href={(mode === "review" && tab === "upcoming") && `/user/review/${workshopId}`}
                                    className={`btn btn-default primary-background white-color hover-opacity mb-20 ${styles.buttonManage}`}>
                                    {tabText}</a>
                                {(tab !== "past" && tab !== "waiting") &&
                                    <a
                                        onClick={() => mode === "review" ? setShowModal(true) : {}}
                                        className={`btn btn-default border-1px main-background primary-color hover-opacity ${styles.buttonManage}`}>
                                        {mode === "manage" ? 'Chỉnh sửa' : "Từ chối"}</a>
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>

            {/* Modal for confirmation */}
            {showModal && (
                <div className="modal fade show flex-center" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content p-30">
                            <div className="modal-body flex-center flex-column">
                                <img src="/assets/icon/fail-icon.svg" />
                                <h6 className="modal-title text-center mb-10 mt-10" id="exampleModalLabel">Xác nhận từ chối</h6>
                                Bạn có chắc chắn muốn từ chối workshop này không?
                            </div>
                            <div className="modal-footer border-0px flex-center">
                                <button type="button" className="btn btn-default border-background" data-bs-dismiss="modal" onClick={() => setShowModal(false)}>Hủy</button>
                                <button type="button" className="btn btn-default primary-background" onClick={handleDecline}>Từ chối</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
