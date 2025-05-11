import React from 'react'
import InputLabel from './InputLabel'
import Button from '../button/Button'

export default function CheckoutInformationForm() {
    return (
        <div className="mt-30">
            <div className="secondary-background border-radius-25 mb-35" style={{
                padding: "20px 40px",
            }}>
                <div className="row mt-10">
                    <InputLabel label="Thông tin thanh toán" />

                    <div className="col-md-12 mb-20">
                        <div className="form-group flex-space">
                            <label className="label-input-text form-label white-color m-0">Chủ tài khoản:</label>
                            <input style={{ padding: "16px 25px" }} className="form-control form-input-background border-none border-radius-31" type="text" />
                        </div>
                    </div>

                    <div className="col-md-12 mb-20">
                        <div className="form-group flex-space">
                            <label className="label-input-text form-label white-color m-0">Số tài khoản:</label>
                            <input style={{ padding: "16px 25px" }} className="form-control form-input-background border-none border-radius-31" type="text" />
                        </div>
                    </div>

                    <div className="col-md-12 mb-20">
                        <div className="form-group flex-space">
                            <label className="label-input-text form-label white-color m-0">Tên ngân hàng:</label>
                            <input style={{ padding: "16px 25px" }} className="form-control form-input-background border-none border-radius-31" type="text" />
                        </div>
                    </div>

                    <div className="col-md-12 mb-20">
                        <div className="form-group flex-space">
                            <label className="label-input-text form-label white-color m-0">Chi nhánh:</label>
                            <input style={{ padding: "16px 25px" }} className="form-control form-input-background border-none border-radius-31" type="text" />
                        </div>
                    </div>

                    <InputLabel label="Hoá đơn đỏ" isRequired={false} />

                    <div className="col-md-12 mb-20 mt-30">
                        <div className="form-group d-flex">
                            <label className="flex-start label-input-text form-label white-color m-0">Loại hình kinh doanh:</label>
                            <div className="row" style={{ width: "70%", alignItems: "center" }}>
                                <div className="col-md-4" style={{ display: 'flex', alignItems: 'center' }}>
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
                                            className="item-payment-method-text item-payment"
                                            style={{ color: '#fff', fontSize: '14px', cursor: 'pointer', margin: "0!important" }}
                                        >
                                            Cá nhân
                                        </label>
                                    </div>
                                </div>
                                <div className="col-md-4" style={{ display: 'flex', alignItems: 'center' }}>
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
                                            className="item-payment-method-text item-payment"
                                            style={{ color: '#fff', fontSize: '14px', cursor: 'pointer', margin: "0!important" }}
                                        >
                                            Doanh nghiệp / Tổ chức
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12 mb-20">
                        <div className="form-group flex-space">
                            <label className="label-input-text form-label white-color m-0">Họ tên:</label>
                            <input style={{ padding: "16px 25px" }} className="form-control form-input-background border-none border-radius-31" type="text" />
                        </div>
                    </div>

                    <div className="col-md-12 mb-20">
                        <div className="form-group flex-space">
                            <label className="label-input-text form-label white-color m-0">Địa chỉ:</label>
                            <input style={{ padding: "16px 25px" }} className="form-control form-input-background border-none border-radius-31" type="text" />
                        </div>
                    </div>

                    <div className="col-md-12 mb-20">
                        <div className="form-group flex-space">
                            <label className="label-input-text form-label white-color m-0">Mã số thuế:</label>
                            <input style={{ padding: "16px 25px" }} className="form-control form-input-background border-none border-radius-31" type="text" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="secondary-background border-radius-25 mb-35" style={{
                padding: "20px 40px",
            }}>
                <div className="row mt-10 d-flex">
                    <div className="col-md-12 mb-20">
                        <div className="form-group">
                            <InputLabel label="Tin nhắn xác nhận dành cho người tham gia" isMarginLeft />
                            <p className='ml-25 mb-15 white-color'>Tin nhắn xác nhận này sẽ được gửi đến cho người tham gia sau khi đặt vé thành công</p>
                            <textarea placeholder='Nhập tại đây' style={{ padding: "16px 25px", height: "333px" }} className="form-control form-input-background border-none border-radius-31" type="text" />
                        </div>
                    </div>
                </div>
            </div>

            <Button className="btn btn-default primary-background white-color w-100 mb-80" text="Lưu" />
        </div>
    )
}
