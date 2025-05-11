export default function RatingType({ title, stars }) {
    return (
        <div className="box-type-review">
            <p className="text-sm-bold white-color text-type-rv">{title}</p>
            <p className="rate-type-review">
                {Array.from({ length: stars }, (_, index) => (
                    <img key={index} src="/assets/lib/user/imgs/page/tour-detail/star-big.svg" alt="img-love" />
                ))}
            </p>
        </div>
    );
}

