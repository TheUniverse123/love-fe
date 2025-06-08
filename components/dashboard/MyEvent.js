'use client'

import { useEffect, useState } from "react"
import styles from "./MyEvent.module.css"
import { useMutation } from "@tanstack/react-query"
import { fetchDeclineWorkshop } from "@/app/api/manage-workshop"
import { toast } from "react-toastify"
import { queryClient } from "@/app/util/providers"
import Link from "next/link"

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

    const { mutate } = useMutation({
        mutationKey: ['decline-workshop'],
        mutationFn: (workshopId) => fetchDeclineWorkshop(workshopId),
        onSuccess: (response) => {
            if (response.statusCode === 200) {
                toast.success("Đã từ chối yêu cầu duyệt workshop");
                queryClient.invalidateQueries({ queryKey: ['workshops-review'] })
                setShowModal(false)
            } else {
                toast.error(response[0])
            }
        },
        onError: () => {
            toast.error("Có lỗi xảy ra, vui lòng thử lại sau!");
        },
    });

    const handleDecline = () => {
        mutate(workshopId)
    }
    return (
        <div className="box-content-main-detail pb-0 pt-20">
            <div className="box-grid-hotels box-list-hotels-detail wow fadeIn">
                <div className="card-flight card-hotel main-background border-1px">
                    <div className={`card-image ${styles.cardImage} ${smallImage ? styles.smallImage : styles.largeImage}`}>
                        <Link href={link ? link.toString() : ""}>
                            <img src={imageSrc} alt="Travila" />
                        </Link>
                    </div>
                    <div className={`card-info main-background row border-none ${styles.cardInfoEvent}`}>
                        <div className={`tour-detail-ticket ${styles.tourDetail} ${isButtonVisible ? " col-md-8" : " col-md-12"}`}>
                            <div className="mt-10 mb-5">
                                <Link className="heading-6 white-color font-18"
                                    href={link ? link.toString() : ""}>{title}
                                </Link>
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
                                <Link href={(mode === "review" && tab === "upcoming") ? `/user/review/${workshopId}` : ""}
                                    className={`btn btn-default primary-background white-color hover-opacity mb-20 ${styles.buttonManage}`}>
                                    {tabText}</Link>
                                {(tab !== "past" && tab !== "waiting") &&
                                    <Link
                                        href={mode !== "review" ? `/dashboard/edit/${workshopId}` : "#"}
                                        onClick={() => mode === "review" ? setShowModal(true) : {}}
                                        className={`btn btn-default border-1px main-background primary-color hover-opacity ${styles.buttonManage}`}>
                                        {mode === "manage" ? 'Chỉnh sửa' : "Từ chối"}</Link>
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
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
