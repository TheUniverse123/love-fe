export default function CardImage({ img }) {
    return (
        <div className="col-lg-3 col-sm-6">
            <div className="card-image">
                <img style={{
                    borderRadius: "32px!important", height: "369px!important",
                    width: "100%", objectFit: "cover"
                }}
                    src={img} alt="banner" />
            </div>
        </div>
    )
}
