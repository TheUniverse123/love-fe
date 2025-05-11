export default function TicketCheckoutInformation() {
    return (
        <section className="main-background box-section pt-20">
            <div className="secondary-background border-radius-25 p-20 mb-35">
                <div className="form-title pb-20 border-1px-white-2-bottom flex-space">
                    <h5 className="white-color">Thông tin đặt vé</h5>
                    <a href="#" className="primary-color">Chọn lại vé</a>
                </div>

                <div className="form-title pt-20 pb-5">
                    <p className="white-color text-md-bold">WORKSHOP NAME: Lorem ipsu m dolm ipsu m dolor sit am ipsu m dolmet</p>
                </div>

                <div className="flex-space pb-20 border-1px-white-2-bottom">
                    <div className="flex-center">
                        <img src="/assets/icon/ticket.svg" alt="icon ticket" />
                        <p className="primary-color">x1</p>
                    </div>
                    <p className="white-color text-md-bold" style={{ fontSize: "20px!important" }}>100.000 đ</p>
                </div>
                <div className="row mt-25 pb-20 border-1px-white-2-bottom">
                    <div className="flex-space mb-5">
                        <p className="white-color" style={{ fontSize: "16px!important" }}>Tạm tính</p>
                        <p className="white-color" style={{ fontSize: "16px!important" }}>100.000 đ</p>
                    </div>
                    <div className="flex-space mb-5">
                        <p className="white-color" style={{ fontSize: "16px!important" }}>Giảm giá</p>
                        <p className="white-color" style={{ fontSize: "16px!important" }}>0 đ</p>
                    </div>
                    <div className="flex-space">
                        <p className="white-color" style={{ fontSize: "16px!important" }}>Dịch vụ bổ sung</p>
                        <p className="white-color" style={{ fontSize: "16px!important" }}>0 đ</p>
                    </div>
                </div>

                <div className="pb-20 pt-20 flex-space pb-20">
                    <h6 className="white-color">Tổng tiền</h6>
                    <h6 className="primary-color">100.000 đ</h6>
                </div>

                <div className="box-button-book mt-10 mr-20 ml-20 mb-25" >
                    <a style={{ borderRadius: "999px!important", fontSize: "20px!important" }} className="btn btn-book primary-background white-color hover-primary" href="/user/ticket/1">Thanh toán
                    </a></div>
            </div>
        </section>
    )
}
