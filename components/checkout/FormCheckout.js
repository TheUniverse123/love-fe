export default function FormCheckout() {
    return (
        <section className="main-background box-section pt-20">
            <div className="secondary-background border-radius-25 p-20 mb-35">
                <div className="form-title pb-20 border-1px-white-2-bottom">
                    <h5 className="white-color">Thông tin cá nhân</h5>
                </div>
                <div className="row mt-25">
                    <div className="col-md-12 mb-20">
                        <div className="form-group">
                            <input style={{ padding: "16px 25px" }} className="form-control form-input-background border-none border-radius-31" type="text" placeholder="Nhập tên của bạn" />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <input style={{ padding: "16px 25px" }} className="form-control form-input-background border-none border-radius-31" type="email" placeholder="Email" />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <input style={{ padding: "16px 25px" }} className="form-control form-input-background border-none border-radius-31" type="text" placeholder="Số điện thoại" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="secondary-background border-radius-25 p-20 mb-35">
                <div className="form-title pb-20 border-1px-white-2-bottom">
                    <h5 className="white-color">Mã giảm giá</h5>
                </div>
                <div className="row mt-25">
                    <div className="col-md-12 mb-20">
                        <div className="form-group">
                            <input style={{ padding: "16px 25px" }} className="form-control form-input-background border-none border-radius-31" type="text" placeholder="NHẬP MÃ GIẢM GIÁ" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="secondary-background border-radius-25 p-20 mb-35">
                <div className="form-title pb-20 border-1px-white-2-bottom">
                    <h5 className="white-color">Phương thức thanh toán</h5>
                </div>

                <div style={{ padding: "20px 25px" }}>
                    <div className="row">
                        <div className="col-md-6" style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="item-payment-method" style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="radio"
                                    id="event-payment"
                                    name="payment-method"
                                    style={{
                                        width: '23px',
                                        height: '23px',
                                        backgroundColor: '#fff',
                                        borderRadius: '50%',
                                        marginRight: '10px',
                                        accentColor: '#fff',
                                        border: '1px solid #fff'
                                    }}
                                />
                                <label
                                    htmlFor="event-payment"
                                    className="item-payment-method-text"
                                    style={{ color: '#fff', fontSize: '14px', cursor: 'pointer', marginBottom: "0!important" }}
                                >
                                    Thanh toán tại sự kiện
                                </label>
                            </div>
                        </div>
                        <div className="col-md-6" style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="item-payment-method" style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="radio"
                                    id="credit-card-payment"
                                    name="payment-method"
                                    style={{
                                        width: '23px',
                                        height: '23px',
                                        backgroundColor: '#fff',
                                        borderRadius: '50%',
                                        marginRight: '10px',
                                        accentColor: '#fff',
                                        border: '1px solid #fff'
                                    }}
                                />
                                <label
                                    htmlFor="credit-card-payment"
                                    className="item-payment-method-text"
                                    style={{ color: '#fff', fontSize: '14px', cursor: 'pointer', marginBottom: "0!important" }}
                                >
                                    Thẻ tín dụng / Thẻ ghi nợ
                                </label>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="row">
                    <div className="col-md-12 mb-20">
                        <div className="form-group">
                            <input style={{ padding: "16px 25px" }} className="form-control form-input-background border-none border-radius-31" type="text" placeholder="Tên chủ thẻ" />
                        </div>
                    </div>

                    <div className="col-md-12 mb-20">
                        <div className="form-group" style={{ position: "relative" }}>
                            <input
                                style={{ padding: "16px 25px", width: "100%" }}
                                className="form-control form-input-background border-none border-radius-31"
                                type="text"
                                placeholder="Số thẻ"
                            />
                            <div
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    right: "10px",
                                    display: "flex",
                                    transform: "translateY(-50%)",
                                }}
                            >
                                <div
                                    style={{
                                        width: "31px",
                                        height: "31px",
                                        backgroundColor: "#404040",
                                        borderRadius: "50%",
                                        marginRight: "-5px",
                                    }}
                                ></div>
                                <div
                                    style={{
                                        width: "31px",
                                        height: "31px",
                                        backgroundColor: "#fff",
                                        borderRadius: "50%",
                                        marginRight: "5px",
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>


                    <div className="col-md-4 mb-20">
                        <div className="form-group">
                            <input style={{ padding: "16px 25px" }} className="form-control form-input-background border-none border-radius-31" type="text" placeholder="Ngày hết hạn" />
                        </div>
                    </div>

                    <div className="col-md-4 mb-20">
                        <div className="form-group">
                            <input style={{ padding: "16px 25px" }} className="form-control form-input-background border-none border-radius-31" type="text" placeholder="CVC/CVV" />
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="form-group">
                            <div className="remeber-me">
                                <label className="text-sm-medium neutral-500" style={{ display: "flex", alignItems: "center" }}>
                                    <input className="cb-remember" type="checkbox" style={{ width: "20px!important", height: "20px!important", marginTop: "0!important", marginLeft: "25px" }} />
                                    Đồng ý với
                                    <a
                                        style={{ margin: "0 5px" }}
                                        className="text-sm-bold white-color" href="term.html">
                                        Chính sách </a>
                                    và
                                    <a
                                        style={{ margin: "0 5px" }}
                                        className="text-sm-bold white-color" href="privacy.html">
                                        Điều khoản </a> của chúng tôi
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
