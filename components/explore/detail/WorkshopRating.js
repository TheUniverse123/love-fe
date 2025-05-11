import ReviewItem from "./ReviewItem";
import ReviewProgress from "./ReviewProgress";

export default function WorkshopRating({ progressData }) {
    const reviews = [
        {
            author: 'Sarah Johnson',
            time: '2 tháng trước',
            rating: 5,
            content: 'The views from The High Roller were absolutely stunning! It\'s a fantastic way to see the Strip and the surrounding area. The cabins are spacious and comfortable, and the audio commentary adds an extra layer of enjoyment. Highly recommend!'
        },
        {
            author: 'John Doe',
            time: '1 tháng trước',
            rating: 4,
            content: 'Great experience overall, but the lines were a bit long. Would recommend to friends.'
        },
        {
            author: 'Emily Smith',
            time: '3 tuần trước',
            rating: 5,
            content: 'Amazing experience! The view is unbeatable, and the staff was so friendly and helpful.'
        }
    ];

    return (
        <div className="group-collapse-expand main-background border-color">
            <button className="btn btn-collapse" type="button" data-bs-toggle="collapse" data-bs-target="#collapseReviews" aria-expanded="false" aria-controls="collapseReviews">
                <h6 className="white-color">Đánh giá về workshop</h6>
                <svg style={{ stroke: "white!important" }} width={12} height={7} viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L6 6L11 1" stroke strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
            <div className="collapse show" id="collapseReviews">
                <div className="card card-body main-background">
                    <div className="head-reviews">
                        <div className="review-left rating-box-background border-color">
                            <div className="review-info-inner">
                                <h6 className="white-color">4.95 / 5</h6>
                                <p className="text-sm-medium neutral-400">(672 đánh giá)</p>
                                <div className="review-rate">
                                    {Array.from({ length: 5 }, (_, index) => (
                                        <img key={index} src="/assets/lib/user/imgs/page/tour-detail/star.svg" alt="img-love" />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="review-right">
                            <div className="review-progress">
                                {progressData.map((data, index) => (
                                    <ReviewProgress key={index} title={data.title} progress={data.progress} average={data.average} />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="list-reviews">
                        {reviews.map((review, index) => (
                            <ReviewItem key={index} author={review.author} time={review.time} rating={review.rating} content={review.content} />
                        ))}
                    </div>

                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className="page-item"><a className="page-link main-third-background white-color-4" href="#" aria-label="Previous"><span aria-hidden="true">
                                <svg style={{ stroke: "var(--bg-white-color-4) !important" }} width={12} height={12} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.00016 1.33325L1.3335 5.99992M1.3335 5.99992L6.00016 10.6666M1.3335 5.99992H10.6668" stroke strokeLinecap="round" strokeLinejoin="round" />
                                </svg></span></a></li>
                            <li className="page-item"><a className="page-link main-third-background white-color-4" href="#">1</a></li>
                            <li className="page-item"><a className="page-link secondary-background white-color active" href="#">2</a></li>
                            <li className="page-item"><a className="page-link main-third-background white-color-4" href="#">3</a></li>
                            <li className="page-item"><a className="page-link main-third-background white-color-4" href="#">4</a></li>
                            <li className="page-item"><a className="page-link main-third-background white-color-4" href="#">5</a></li>
                            <li className="page-item"><a className="page-link main-third-background white-color-4" href="#">...</a></li>
                            <li className="page-item"><a className="page-link main-third-background white-color-4" href="#" aria-label="Next"><span aria-hidden="true">
                                <svg style={{ stroke: "var(--bg-white-color-4) !important" }} width={12} height={12} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.99967 10.6666L10.6663 5.99992L5.99968 1.33325M10.6663 5.99992L1.33301 5.99992" stroke strokeLinecap="round" strokeLinejoin="round" />
                                </svg></span></a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}
