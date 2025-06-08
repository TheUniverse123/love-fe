'use client'

import { getUserInfo } from "@/app/util/auth"
import styles from "./FormCheckout.module.css"
import { fetchUserInfo } from "@/app/api/account"
import { useQuery } from "@tanstack/react-query"

const userInfo = getUserInfo()
export default function FormCheckout() {

    const { data } = useQuery({
        queryKey: ['user-info'],
        queryFn: ({ signal }) => fetchUserInfo({ signal, userId: userInfo.id }),
    })
    return (
        <section className="main-background box-section pt-20">
            <div className="secondary-background border-radius-25 p-20 mb-35">
                <div className="form-title pb-20 border-1px-white-2-bottom">
                    <h5 className="white-color">Thông tin cá nhân</h5>
                </div>
                <div className="row mt-25">
                    <div className="col-md-12 mb-20">
                        <div className="form-group">
                            <input disabled className={`form-control form-input-background border-none border-radius-31 ${styles.formInput}`} type="text" placeholder={data?.result.fullName} />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <input disabled className={`form-control form-input-background border-none border-radius-31 ${styles.formInput}`} type="email" placeholder={data?.result.email} />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <input disabled className={`form-control form-input-background border-none border-radius-31 ${styles.formInput}`} type="text" placeholder={data?.result.phoneNumber} />
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
                        {/* <div className="col-md-6 flex-center-align">
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
                        </div> */}
                        <div className="col-md-6 flex-center-align">
                            <div className="item-payment-method flex-center-align">
                                <input
                                    checked
                                    type="radio"
                                    id="credit-card-payment"
                                    name="payment-method"
                                    className={styles.paymentInput}
                                />
                                <label
                                    htmlFor="credit-card-payment"
                                    className={`item-payment-method-text ${styles.paymentTitle}`}
                                >
                                    Mã QR
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
