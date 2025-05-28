'use client'

import { useState, useEffect } from "react";
import ReviewItem from "./ReviewItem";
import ReviewProgress from "./ReviewProgress";
import { fetchRatingByWorkshop } from "@/app/api/rating";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

export default function WorkshopRating({ progressData, workshopDetail }) {
    const { slug } = useParams();
    const [pageNumber, setPageNumber] = useState(1);
    const pageSize = 3;

    const { data: dataRating } = useQuery({
        queryKey: ['ratings', slug, pageNumber],
        queryFn: () => fetchRatingByWorkshop(pageNumber, pageSize, slug),
        select: (response) => {
            if (response?.statusCode === 200 && response.result) {
                return response.result;
            }
            if (response?.items) {
                return response;
            }
            return null;
        }
    });

    const handlePageChange = (page) => {
        if (page >= 1 && page <= dataRating?.totalPages && page !== dataRating?.currentPage) {
            setPageNumber(page);
        }
    };

    const formatDateVN = (isoDate) => {
        if (!isoDate) return "";
        const date = new Date(isoDate);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day} tháng ${month.toString().padStart(2, "0")}, ${year}`;
    };

    // Tạo mảng trang hiển thị (đơn giản tối đa 5 trang)
    const renderPagination = () => {
        const pages = [];
        const startPage = Math.max(1, dataRating?.currentPage - 2);
        const endPage = Math.min(dataRating?.totalPages, startPage + 4);
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages.map((page) => (
            <li key={page} className={`page-item ${page === dataRating?.currentPage ? "active" : ""}`}>
                <a
                    className={`page-link ${page === dataRating?.currentPage ? "secondary-background white-color" : "main-third-background white-color-4"}`}
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(page);
                    }}
                >
                    {page}
                </a>
            </li>
        ));
    };

    return (
        <div className="group-collapse-expand main-background border-color">
            <button
                className="btn btn-collapse"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseReviews"
                aria-expanded="false"
                aria-controls="collapseReviews"
            >
                <h6 className="white-color">Đánh giá về workshop</h6>
                <svg
                    className="stroke-white"
                    width={12}
                    height={7}
                    viewBox="0 0 12 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M1 1L6 6L11 1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            <div className="collapse show" id="collapseReviews">
                <div className="card card-body main-background">
                    <div className="head-reviews">
                        <div className="review-left rating-box-background border-color">
                            <div className="review-info-inner">
                                <h6 className="white-color">{workshopDetail?.averageRating?.toFixed(1) || 0} / 5</h6>
                                <p className="text-sm-medium neutral-400">({workshopDetail?.approvedReviewCount || 0} đánh giá)</p>
                                <div className="review-rate">
                                    {Array.from({ length: Math.round(workshopDetail?.averageRating || 0) }, (_, index) => (
                                        <img
                                            key={index}
                                            src="/assets/lib/user/imgs/page/tour-detail/star.svg"
                                            alt="star"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="review-right">
                            <div className="review-progress">
                                <ReviewProgress
                                    title="Chất lượng"
                                    progress={Math.round((workshopDetail?.averageRating || 0) / 5 * 100)}
                                    average={workshopDetail?.averageRating || 0}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="list-reviews">
                        {dataRating?.items && dataRating?.items.length > 0 ? (
                            dataRating?.items.map((review) => (
                                <ReviewItem
                                    key={review.workshopReviewId}
                                    author={review.userName || "Người dùng"}
                                    time={formatDateVN(review.createdDate)}
                                    rating={review.rating}
                                    content={review.review}
                                />
                            ))
                        ) : (
                            <p className="white-color">Chưa có đánh giá nào.</p>
                        )}
                    </div>

                    {(dataRating?.items && dataRating?.items.length > 0) && <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className={`page-item ${dataRating?.currentPage === 1 ? "disabled" : ""}`}>
                                <a
                                    className="page-link main-third-background white-color-4"
                                    href="#"
                                    aria-label="Previous"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handlePageChange(dataRating?.currentPage - 1);
                                    }}
                                >
                                    <span aria-hidden="true">
                                        <svg
                                            style={{ stroke: "var(--bg-white-color-4) !important" }}
                                            width={12}
                                            height={12}
                                            viewBox="0 0 12 12"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M6.00016 1.33325L1.3335 5.99992M1.3335 5.99992L6.00016 10.6666M1.3335 5.99992H10.6668"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </span>
                                </a>
                            </li>

                            {renderPagination()}

                            <li className={`page-item ${dataRating?.currentPage === dataRating?.totalPages ? "disabled" : ""}`}>
                                <a
                                    className="page-link main-third-background white-color-4"
                                    href="#"
                                    aria-label="Next"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handlePageChange(dataRating?.currentPage + 1);
                                    }}
                                >
                                    <span aria-hidden="true">
                                        <svg
                                            style={{ stroke: "var(--bg-white-color-4) !important" }}
                                            width={12}
                                            height={12}
                                            viewBox="0 0 12 12"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M5.99967 10.6666L10.6663 5.99992L5.99968 1.33325M10.6663 5.99992L1.33301 5.99992"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </nav>}
                </div>
            </div>
        </div>
    );
}
