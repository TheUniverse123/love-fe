'use client'

import { useMutation } from "@tanstack/react-query";
import styles from "./TicketDetail.module.css";
import { fetchApproveWorkshop, fetchDeclineWorkshop } from "@/app/api/manage-workshop";
import { fetchCheckWorkshop, fetchRemoveFavouriteWorkshops, fetchSaveFavouriteWorkshops } from "@/app/api/saved-workshops";
import { getUserInfo } from "@/app/util/auth";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { queryClient } from "@/app/util/providers";
import Link from "next/link";

const userId = getUserInfo()?.id

export default function TicketDetail({
    discount,
    rating,
    reviews,
    title,
    time,
    address,
    price,
    imageSrc,
    link,
    buttonText,
    isButtonVisible = true,
    mode = "ticket",
    workshopId,
    onClick
}) {
    const [showModal, setShowModal] = useState(false)
    const [showModalApprove, setShowModalApprove] = useState(false)
    const [isSaved, setIsSaved] = useState(false)

    useEffect(() => {
        handleFetchCheckWorkshop()
    }, [userId, workshopId])

    async function handleFetchCheckWorkshop() {
        if (userId && workshopId) {
            const response = await fetchCheckWorkshop(userId, workshopId)
            if (response.statusCode === 200) {
                setIsSaved(response.result.isSaved)
            }
        }
    }

    async function handleToggleSaved() {
        if (userId && workshopId) {
            if (!isSaved) {
                const response = await fetchSaveFavouriteWorkshops(userId, workshopId)
                if (response.statusCode === 200) {
                    setIsSaved(true)
                    toast.success("Lưu sự kiện thành công")
                } else {
                    toast.error("Có lỗi xảy ra, vui lòng thử lại sau")
                }
            } else {
                const response = await fetchRemoveFavouriteWorkshops(userId, workshopId)
                if (response.statusCode === 200) {
                    setIsSaved(false)
                    toast.success("Đã hủy lưu sự kiện")
                } else {
                    toast.error("Có lỗi xảy ra, vui lòng thử lại sau")
                }
            }
        } else {
            toast.error("Vui lòng đăng nhập để lưu sự kiện")
        }
    }

    const { mutate } = useMutation({
        mutationKey: ['decline-workshop'],
        mutationFn: (workshopId) => fetchDeclineWorkshop(workshopId),
        onSuccess: (response) => {
            if (response.statusCode === 200) {
                toast.success("Đã từ chối yêu cầu duyệt workshop");
                queryClient.invalidateQueries({ queryKey: ['workshops-review'] })
                setTimeout(() => {
                    if (typeof window !== undefined) {
                        localStorage.setItem("activeItem", type);
                        window.location.href = "/dashboard/review"
                    }
                }, 2000)
            } else {
                toast.error(response[0])
            }
        },
        onError: () => {
            toast.error("Có lỗi xảy ra, vui lòng thử lại sau!");
        },
    });

    const { mutate: mutateApprove } = useMutation({
        mutationKey: ['approve-workshop'],
        mutationFn: (workshopId) => fetchApproveWorkshop(workshopId),
        onSuccess: (response) => {
            if (response.statusCode === 200) {
                toast.success("Đã chấp nhận yêu cầu duyệt workshop");
                queryClient.invalidateQueries({ queryKey: ['workshops-review'] })
                setTimeout(() => {
                    if (typeof window !== undefined) {
                        window.location.href = "/dashboard/review"
                    }
                }, 2000)
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

    const handleApprove = () => {
        mutateApprove(workshopId)
    }

    return (
        <section className="box-section block-content-tourlist main-background">
            <div className={styles.ticketWrapper}>
                <div className="box-content-main-detail pb-0">
                    <div className="box-grid-hotels box-list-hotels-detail wow fadeIn">
                        <div className="card-flight card-hotel main-background">
                        </div>
                        <div className="card-flight card-hotel main-background">
                            <div className={`card-image ${styles.cardImage}`}>
                                <button className={`wish flex-center main-background ${styles.discount}`} onClick={handleToggleSaved}>
                                    <svg style={{ stroke: "white" }} width={20} height={20} className={`${isSaved ? "saved-events" : ""}`} viewBox="0 0 20 18"
                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.071 10.1422L11.4141 15.7991C10.6331 16.5801 9.36672 16.5801 8.58568 15.7991L2.92882 10.1422C0.9762 8.1896 0.9762 5.02378 2.92882 3.07116C4.88144 1.11853 8.04727 1.11853 9.99989 3.07116C11.9525 1.11853 15.1183 1.11853 17.071 3.07116C19.0236 5.02378 19.0236 8.1896 17.071 10.1422Z" stroke strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                                <Link href={link.toString()} >
                                    <img src={imageSrc} alt="ticket-image" className={styles.image} />
                                </Link>
                            </div>
                            <div className={`card-info main-background border-color ${styles.cardInfo}`}>
                                {discount && <label className="sale-lbl label-discount">-{discount}%</label>}
                                <div className="tour-rate">
                                    <div className="rate-element main-background border-color">
                                        <span className="rating white-color">{rating} <span className="text-sm-medium neutral-500">
                                            ({reviews} reviews)</span>
                                        </span>
                                    </div>
                                </div>
                                <div className="card-title">
                                    <Link className="heading-6 white-color font-20"
                                        href={link.toString()}>{title}
                                    </Link>
                                </div>
                                <div className="card-program">
                                    <div className="card-duration-tour mb-15">
                                        <img src="/assets/icon/clock1.svg" alt="Clock Icon" />
                                        <p className="text-time-ticket text-md-medium">{time}</p>
                                    </div>
                                    <div className={`card-duration-tour ${mode === "review" ? "mb-0" : ""}`}>
                                        <img src="/assets/icon/clock1.svg" alt="Clock Icon" />
                                        <div>
                                            <p className="text-time-ticket text-md-medium">Workshop 1</p>
                                            <p className="neutral-500 text-md-medium pl-10 font-14">{address}</p>
                                        </div>
                                    </div>
                                    <div className={`endtime`}>
                                        {mode !== "review" && <div className={`card-price ${mode === "review" ? "d-flex h-100 align-items-start" : ""}`}>
                                            <h6 className="heading-6 primary-color">{price}</h6>
                                        </div>}
                                        {isButtonVisible && <div className="card-button">
                                            <a className={`btn btn-gray ${styles.button} ${styles.buttonTicket} ${styles.greyText} ${styles.greyColor}`} onClick={onClick}>
                                                {buttonText}
                                            </a>
                                        </div>}

                                        {mode === "review" && <div className={`tour-rate col-lg-12 d-flex mt-30 flex-space`}>
                                            <Link href="" onClick={() => mode === "review" ? setShowModalApprove(true) : ""}
                                                className={`btn btn-default primary-background white-color hover-opacity mr-20 
                                            ${styles.buttonReview}`}>
                                                Chấp nhận</Link>
                                            <a onClick={() => setShowModal(true)} className={`btn btn-default border-1px main-background primary-color hover-opacity ${styles.buttonReview}`}>
                                                Từ chối</a>
                                        </div>}
                                    </div>
                                </div>
                            </div>
                        </div>
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

            {/* Modal for confirmation */}
            {showModalApprove && (
                <div className="modal fade show flex-center" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content p-30">
                            <div className="modal-body flex-center flex-column">
                                <img src="/assets/icon/success-icon.svg" />
                                <h6 className="modal-title text-center mb-10 mt-10" id="exampleModalLabel">Xác nhận đồng ý</h6>
                                Bạn có chắc chắn muốn chấp nhận workshop này không?
                            </div>
                            <div className="modal-footer border-0px flex-center">
                                <button type="button" className="btn btn-default border-background" data-bs-dismiss="modal" onClick={() => setShowModalApprove(true)}>Hủy</button>
                                <button type="button" className="btn btn-default primary-background" onClick={handleApprove}>Đồng ý</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}
