export default function ReviewItem({ author, time, rating, content }) {
    return (
        <div className="item-review main-background border-color">
            <div className="head-review border-color align-items-start">
                <div className="author-review">
                    <img src="/assets/lib/user/imgs/page/tour-detail/avatar.png" alt="img-love" />
                    <div className="author-info">
                        <p className="text-lg-bold white-color mb-5" style={{ fontSize: "20px!important" }}>{author}</p>
                        <p className="text-sm-medium neutral-500 whie-color">{time}</p>
                    </div>
                </div>
                <div className="rate-review h-100">
                    {Array.from({ length: rating }, (_, index) => (
                        <img key={index} src="/assets/icon/star-secondary.svg" alt="img-love" />
                    ))}
                </div>
            </div>
            <div className="content-review">
                <p className="text-sm-medium white-color">{content}</p>
            </div>
        </div>
    );
}
