import styles from "./FormCheckout.module.css"

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
                            <input className={`form-control form-input-background border-none border-radius-31 ${styles.formInput}`} type="text" placeholder="Nhập tên của bạn" />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <input className={`form-control form-input-background border-none border-radius-31 ${styles.formInput}`} type="email" placeholder="Email" />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <input className={`form-control form-input-background border-none border-radius-31 ${styles.formInput}`} type="text" placeholder="Số điện thoại" />
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
                            <input className={`form-control form-input-background border-none border-radius-31 ${styles.formInput}`} type="text" placeholder="NHẬP MÃ GIẢM GIÁ" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="secondary-background border-radius-25 p-20 mb-35">
                <div className="form-title pb-20 border-1px-white-2-bottom">
                    <h5 className="white-color">Phương thức thanh toán</h5>
                </div>

                <div className={styles.paymentWrapper}>
                    <div className="row">
                        <div className="col-md-6 flex-center-align">
                            <div className="item-payment-method flex-center-align">
                                <input
                                    type="radio"
                                    id="event-payment"
                                    name="payment-method"
                                    className={styles.paymentInput}
                                />
                                <label
                                    htmlFor="event-payment"
                                    className={`item-payment-method-text ${styles.paymentTitle}`}

                                >
                                    Thanh toán tại sự kiện
                                </label>
                            </div>
                        </div>
                        <div className="col-md-6 flex-center-align">
                            <div className="item-payment-method flex-center-align">
                                <input
                                    type="radio"
                                    id="credit-card-payment"
                                    name="payment-method"
                                    className={styles.paymentInput}
                                />
                                <label
                                    htmlFor="credit-card-payment"
                                    className={`item-payment-method-text ${styles.paymentTitle}`}

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
                            <input className={`form-control form-input-background border-none border-radius-31 ${styles.formInput}`} type="text" placeholder="Tên chủ thẻ" />
                        </div>
                    </div>

                    <div className="col-md-12 mb-20">
                        <div className="form-group position-relative">
                            <input
                                className={`w-100 form-control form-input-background border-none border-radius-31 ${styles.formInput}`}
                                type="text"
                                placeholder="Số thẻ"
                            />
                            <div
                                className={styles.inputNumber}
                            >
                                <div
                                    className={styles.inputNumberLeft}
                                ></div>
                                <div
                                    className={styles.inputNumberRight}
                                ></div>
                            </div>
                        </div>
                    </div>


                    <div className="col-md-4 mb-20">
                        <div className="form-group">
                            <input className={`form-control form-input-background border-none border-radius-31 ${styles.formInput}`} type="text" placeholder="Ngày hết hạn" />
                        </div>
                    </div>

                    <div className="col-md-4 mb-20">
                        <div className="form-group">
                            <input className={`form-control form-input-background border-none border-radius-31 ${styles.formInput}`} type="text" placeholder="CVC/CVV" />
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="form-group">
                            <div className="remeber-me">
                                <label className="text-sm-medium neutral-500 flex-center-align">
                                    <input className="cb-remember inputCheck" type="checkbox" />
                                    Đồng ý với
                                    <a

                                        className={`text-sm-bold white-color ${styles.inputLink}`} href="term.html">
                                        Chính sách </a>
                                    và
                                    <a

                                        className={`text-sm-bold white-color ${styles.inputLink}`} href="privacy.html">
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
