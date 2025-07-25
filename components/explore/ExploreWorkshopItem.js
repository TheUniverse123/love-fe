'use client'

import { useEffect, useState } from "react";
import styles from "../card/WorkshopCardItem.module.css";
import { fetchCheckWorkshop, fetchRemoveFavouriteWorkshops, fetchSaveFavouriteWorkshops } from "@/app/api/saved-workshops";
import { getUserInfo } from "@/app/util/auth";
import { toast } from "react-toastify";
import Link from "next/link";

const userId = getUserInfo()?.id
const ExploreWorkshopItem = ({ label, imgSrc, rating, title, date, price, link, approvedReviewCount, workshopId }) => {
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

    return (
        <div className="col-xl-4 col-lg-6 col-md-6">
            <div className="card-journey-small main-background border-1px" >
                <div className="card-image">
                    <button className="wish black-background flex-center" onClick={handleToggleSaved} >
                        <svg width={20} height={18} className={`stroke-white ${isSaved ? "saved-events" : ""}`} viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.071 10.1422L11.4141 15.7991C10.6331 16.5801 9.36672 16.5801 8.58568 15.7991L2.92882 10.1422C0.9762 8.1896 0.9762 5.02378 2.92882 3.07116C4.88144 1.11853 8.04727 1.11853 9.99989 3.07116C11.9525 1.11853 15.1183 1.11853 17.071 3.07116C19.0236 5.02378 19.0236 8.1896 17.071 10.1422Z" stroke strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    {label && <Link className={`label danger-background white-color ${label.toLowerCase().replace(' ', '-')}`} href="#">{label}</Link>}
                    <img style={{ objectFit: "cover" }} src={imgSrc} alt="image workshop" />
                </div>
                <div className="card-info main-background">
                    <div className="card-rating">
                        <div className="card-left"> </div>
                        <div className="card-right">
                            <span className="rating main-secondary-background border-color white-color">
                                {rating} <span className="text-sm-medium neutral-500">({approvedReviewCount} đánh giá)</span>
                            </span>
                        </div>
                    </div>
                    <div className="card-title">
                        <Link className={`text-lg-bold white-color-2 ${styles.title}`} href={link}>{title}</Link>
                    </div>
                    <div className="card-program">
                        <div className="card-duration-tour">
                            <img src="/assets/icon/ClockIcon.svg" alt="Clock Icon" />
                            <p className="text-time text-md-medium">{date}</p>
                        </div>
                        <div className="endtime">
                            <div className="card-price">
                                <h6 className="heading-6 text-white">{price}</h6>
                            </div>
                            <div className="card-button">
                                <Link className={`btn btn-gray white-color ${styles.button} ${styles.whiteColor} ${styles.whiteText} ${styles.style2}`} href={link}>
                                    Đặt ngay
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExploreWorkshopItem;
