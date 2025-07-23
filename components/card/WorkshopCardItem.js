'use client'

import { useEffect, useState } from "react";
import styles from "./WorkshopCardItem.module.css";
import { getUserInfo } from "@/app/util/auth";
import { toast } from "react-toastify";
import { fetchCheckWorkshop, fetchRemoveFavouriteWorkshops, fetchSaveFavouriteWorkshops } from "@/app/api/saved-workshops";
import Link from "next/link";

const userId = getUserInfo()?.id
export default function WorkshopCardItem({ item = {
    img: "",
    avgRating: 0,
    reviews: 0,
    title: "",
    date: "",
    price: 0,
    id: 0
}, backgroundColor = "black" }) {
    const [isSaved, setIsSaved] = useState(false)
    let backgroundClass = "main-background"
    if (backgroundColor === "secondary") {
        backgroundClass = "secondary-background"
    }
    let borderRatingStyles = `${styles.borderRating} ${styles.backgroundDefault}`
    if (backgroundColor === "secondary") {
        borderRatingStyles = `${styles.borderRating} ${styles.backgroundSecondary}`
    }

    useEffect(() => {
        handleFetchCheckWorkshop()
    }, [userId, item.id])

    async function handleFetchCheckWorkshop() {
        if (userId && item.id) {
            const response = await fetchCheckWorkshop(userId, item.id)
            if (response.statusCode === 200) {
                setIsSaved(response.result.isSaved)
            }
        }
    }

    async function handleToggleSaved() {
        if (userId && item.id) {
            if (!isSaved) {
                const response = await fetchSaveFavouriteWorkshops(userId, item.id)
                if (response.statusCode === 200) {
                    setIsSaved(true)
                    toast.success("Lưu sự kiện thành công")
                } else {
                    toast.error("Có lỗi xảy ra, vui lòng thử lại sau")
                }
            } else {
                const response = await fetchRemoveFavouriteWorkshops(userId, item.id)
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

    return (
        <div className={`border-0px ${styles.card} mr-25`}>
            <div className="card-journey-small border-0px" style={{
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            }}>
                <div className={`card-image ${styles.cardImage}`}>
                    <button onClick={handleToggleSaved} className={`wish flex-center ${backgroundClass}`}>
                        <svg width={20} height={18} className={`stroke-white ${isSaved ? "saved-events" : ""}`} viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.071 10.1422L11.4141 15.7991C10.6331 16.5801 9.36672 16.5801 8.58568 15.7991L2.92882 10.1422C0.9762 8.1896 0.9762 5.02378 2.92882 3.07116C4.88144 1.11853 8.04727 1.11853 9.99989 3.07116C11.9525 1.11853 15.1183 1.11853 17.071 3.07116C19.0236 5.02378 19.0236 8.1896 17.071 10.1422Z" stroke strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <img className={styles.imageWorkshop} src={item.img} alt="workshop-item" />
                </div>
                <div className={`card-info ${backgroundClass} ${styles.cardInfo} d-flex flex-column flex-space-start`}>
                    <div className="card-rating">
                        <div className="card-left"> </div>
                        <div
                            className={`card-right`}
                        >
                            <span
                                className={`white-color rating ${borderRatingStyles}`}>{item.avgRating} <span className="text-sm-medium neutral-500">
                                    ({item.reviews} đánh giá)
                                </span>
                            </span>
                        </div>
                    </div>
                    <div className="card-title"> <Link className={`heading-6 white-color ${styles.title}`} href={`/user/explore/${item.id || 0}`}>{item.title}</Link></div>
                    <div className="card-program">
                        <div className={`card-location ${styles.cardLocation}`}>
                            <img src="/assets/icon/ClockIcon.svg" alt="Clock Icon" />
                            <p className="text-time text-md-medium">{item.date}</p>
                        </div>

                        <div className={`endtime ${styles.endSection}`}>
                            <div className="card-price">
                                <h6 className="heading-6 white-color">{item.price}</h6>
                            </div>
                            <div className="card-button white-color">
                                <Link className={`btn btn-gray ${styles.button} ${styles.whiteColor} ${styles.whiteText}`} href={`/user/explore/${item.id || 0}`}>
                                    Tìm hiểu thêm
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
