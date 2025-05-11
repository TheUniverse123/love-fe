import RatingType from "./RatingType";
import ReviewForm from "./ReviewForm";

export default function RatingForm({ ratingTypes }) {
    return (
        <div className="group-collapse-expand main-background border-color">
            <button className="btn btn-collapse" type="button" data-bs-toggle="collapse" data-bs-target="#collapseAddReview" aria-expanded="false" aria-controls="collapseAddReview">
                <h6 className="white-color">Thêm đánh giá</h6>
                <svg style={{ stroke: "white!important" }} width={12} height={7} viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L6 6L11 1" stroke strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
            <div className="collapse show" id="collapseAddReview">
                <div className="card card-body main-background">
                    <div className="box-type-reviews border-color">
                        <div className="row">
                            {ratingTypes.map((rating, index) => (
                                <div key={index} className="col-lg-4">
                                    <RatingType title={rating.title} stars={rating.stars} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <ReviewForm />
                </div>
            </div>
        </div>
    );
}
