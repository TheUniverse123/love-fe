'use client'
import styles from "./RatingForm.module.css"
import { fetchUserInfo } from "@/app/api/account";
import { fetchPostReview } from "@/app/api/rating";
import { getUserInfo } from "@/app/util/auth";
import { queryClient } from "@/app/util/providers";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const userInfo = getUserInfo()

export default function RatingForm() {
    const [selectedStar, setSelectedStar] = useState(0);
    const [hoveredStar, setHoveredStar] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [errors, setErrors] = useState({ rating: "", review: "" });
    const { slug } = useParams()

    const { data } = useQuery({
        queryKey: ['user-info'],
        queryFn: ({ signal }) => fetchUserInfo({ signal, userId: userInfo.id }),
    })
    const { mutate, isPending } = useMutation({
        mutationKey: ['post-rating'],
        mutationFn: (postInfo) => fetchPostReview(postInfo),
        onSuccess: (response) => {
            if (response.statusCode === 200) {
                toast.success("Gửi đánh giá thành công");
                queryClient.invalidateQueries({ queryKey: ['ratings'] });
                setSelectedStar(0);
                setReviewText("");
                setErrors({ rating: "", review: "" });
            } else {
                toast.error(response[0] || "Gửi đánh giá thất bại");
            }
        },
        onError: () => {
            toast.error("Có lỗi xảy ra, vui lòng thử lại sau!");
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        let hasError = false;
        const newErrors = { rating: "", review: "" };

        if (selectedStar === 0) {
            newErrors.rating = "Vui lòng chọn số sao đánh giá.";
            hasError = true;
        }
        if (reviewText.trim() === "") {
            newErrors.review = "Ô nhận xét không được để trống.";
            hasError = true;
        }

        setErrors(newErrors);

        if (hasError) return;

        mutate({
            workshopId: slug,
            rating: selectedStar,
            review: reviewText.trim(),
        });
    };

    const handleStarClick = (starNumber) => {
        setSelectedStar(starNumber);
        if (errors.rating) {
            setErrors(prev => ({ ...prev, rating: "" }));
        }
    };

    const handleReviewChange = (e) => {
        setReviewText(e.target.value);
        if (errors.review) {
            setErrors(prev => ({ ...prev, review: "" }));
        }
    };
    return (
        <div className="group-collapse-expand main-background border-color">
            <button
                className="btn btn-collapse"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseAddReview"
                aria-expanded="false"
                aria-controls="collapseAddReview"
            >
                <h6 className="white-color">Thêm đánh giá</h6>
                <svg
                    className="stroke-white"
                    width={12}
                    height={7}
                    viewBox="0 0 12 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M1 1L6 6L11 1"
                        stroke
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
            <div className="collapse show" id="collapseAddReview">
                <form onSubmit={handleSubmit}>
                    <div className="card card-body main-background">
                        <div className="box-type-reviews border-color">
                            <div className="row">
                                <div className="col-lg-4">
                                    <div className="box-type-review">
                                        <p className="text-sm-bold white-color text-type-rv">Chất lượng</p>
                                        <p className="rate-type-review">
                                            {Array.from({ length: 5 }, (_, index) => {
                                                const starNumber = index + 1;
                                                const isActive = starNumber <= (hoveredStar || selectedStar);
                                                return (
                                                    <img

                                                        key={index}
                                                        src="/assets/lib/user/imgs/page/tour-detail/star-big.svg"
                                                        alt="img-love"
                                                        className={`${styles.star} ${isActive ? styles.active : ''} ${errors.rating ? styles.errorStar : ''}`}
                                                        onClick={() => handleStarClick(starNumber)}
                                                        onMouseEnter={() => setHoveredStar(starNumber)}
                                                        onMouseLeave={() => setHoveredStar(0)}
                                                    />
                                                );
                                            })}
                                        </p>
                                    </div>
                                    {errors.rating && (
                                        <p className="error-message-validate font-11">{errors.rating}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="box-form-reviews">
                            <h6 className="text-xl-bold neutral-400 mb-15">Thêm nhận xét</h6>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input
                                            className="form-control main-background border-color"
                                            type="text"
                                            placeholder="Tên của bạn"
                                            disabled
                                            defaultValue={data?.result.fullName}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input
                                            className="form-control main-background border-color"
                                            type="text"
                                            placeholder="Địa chỉ email"
                                            disabled
                                            defaultValue={data?.result.userName}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <textarea
                                            className="form-control main-background border-color"
                                            placeholder="Nhận xét của bạn"
                                            value={reviewText}
                                            onChange={handleReviewChange}
                                        />
                                        {errors.review && (
                                            <p className="error-message-validate font-11">{errors.review}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <button
                                        style={{ borderRadius: "999px" }}
                                        className="btn btn-black-lg-square secondary-background"
                                        type="submit"
                                        disabled={isPending}
                                    >
                                        Gửi đánh giá
                                        <svg
                                            width={16}
                                            height={16}
                                            viewBox="0 0 16 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M8 15L15 8L8 1M15 8L1 8"
                                                stroke
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
