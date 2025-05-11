export default function ReviewForm() {
    return (
        <div className="box-form-reviews">
            <h6 className="text-xl-bold neutral-400 mb-15">Thêm nhận xét</h6>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <input className="form-control main-background border-color" type="text" placeholder="Tên của bạn" />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <input className="form-control main-background border-color" type="text" placeholder="Địa chỉ email" />
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="form-group">
                        <textarea className="form-control main-background border-color" placeholder="Nhận xét của bạn" defaultValue={""} />
                    </div>
                </div>
                <div className="col-md-12">
                    <button style={{ borderRadius: "999px" }} className="btn btn-black-lg-square secondary-background">
                        Gửi đánh giá
                        <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 15L15 8L8 1M15 8L1 8" stroke strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

