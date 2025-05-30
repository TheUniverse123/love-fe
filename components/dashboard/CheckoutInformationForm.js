'use client'

import { useState } from 'react'
import Button from '../button/Button'
import InputLabel from './InputLabel'

export default function CheckoutInformationForm({ onBack }) {
    // State quản lý giá trị input
    const [formData, setFormData] = useState({
        accountHolder: '',
        accountNumber: '',
        bankName: '',
        branch: '',
        businessType: '', // 'personal' hoặc 'business'
        fullName: '',
        address: '',
        taxCode: '',
        confirmationMessage: '',
    })

    // State lỗi validate
    const [errors, setErrors] = useState({})

    // Xử lý thay đổi input
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }))
        if (errors[name]) {
            setErrors(prev => {
                const copy = { ...prev }
                delete copy[name]
                return copy
            })
        }
    }

    // Xử lý chọn loại hình kinh doanh
    const handleBusinessTypeChange = (e) => {
        const { value } = e.target
        setFormData(prev => ({
            ...prev,
            businessType: value,
        }))
        if (errors.businessType) {
            setErrors(prev => {
                const copy = { ...prev }
                delete copy.businessType
                return copy
            })
        }
    }

    // Validate form
    const validate = () => {
        const newErrors = {}

        if (!formData.accountHolder.trim()) newErrors.accountHolder = "Vui lòng nhập chủ tài khoản";
        if (!formData.accountNumber.trim()) newErrors.accountNumber = "Vui lòng nhập số tài khoản";
        else if (!/^\d{6,20}$/.test(formData.accountNumber.trim())) newErrors.accountNumber = "Số tài khoản phải gồm 6-20 chữ số";
        if (!formData.bankName.trim()) newErrors.bankName = "Vui lòng nhập tên ngân hàng";
        if (!formData.branch.trim()) newErrors.branch = "Vui lòng nhập chi nhánh ngân hàng";
        if (!formData.businessType) newErrors.businessType = "Vui lòng chọn loại hình kinh doanh";
        if (!formData.fullName.trim()) newErrors.fullName = "Vui lòng nhập họ tên";
        if (!formData.address.trim()) newErrors.address = "Vui lòng nhập địa chỉ";
        // Mã số thuế có thể để trống nếu là cá nhân, bắt buộc nếu là doanh nghiệp
        if (formData.businessType === 'business') {
            if (!formData.taxCode.trim()) newErrors.taxCode = "Vui lòng nhập mã số thuế cho doanh nghiệp";
            else if (!/^\d{10,14}$/.test(formData.taxCode.trim())) newErrors.taxCode = "Mã số thuế phải gồm 10-14 chữ số";
        }
        if (!formData.confirmationMessage.trim()) newErrors.confirmationMessage = "Vui lòng nhập tin nhắn xác nhận";

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = () => {
        if (validate()) {
            alert("Thông tin hợp lệ, tiến hành lưu dữ liệu")
            // Xử lý lưu hoặc gửi dữ liệu ở đây
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" })
        }
    }

    return (
        <div className="mt-30">
            <div className="secondary-background border-radius-25 mb-35" style={{ padding: "20px 40px" }}>
                <div className="row mt-10">
                    <InputLabel label="Thông tin thanh toán" />

                    {/* Chủ tài khoản */}
                    <div className="col-md-12 mb-20">
                        <div className="form-group flex-space">
                            <label className="label-input-text form-label white-color m-0">Chủ tài khoản:</label>
                            <input
                                name="accountHolder"
                                style={{ padding: "16px 25px" }}
                                className="form-control form-input-background border-none border-radius-31"
                                type="text"
                                value={formData.accountHolder}
                                onChange={handleChange}
                                placeholder="Nhập chủ tài khoản"
                            />
                        </div>
                        {errors.accountHolder && <p className="error-message-validate font-12">{errors.accountHolder}</p>}
                    </div>

                    {/* Số tài khoản */}
                    <div className="col-md-12 mb-20">
                        <div className="form-group flex-space">
                            <label className="label-input-text form-label white-color m-0">Số tài khoản:</label>
                            <input
                                name="accountNumber"
                                style={{ padding: "16px 25px" }}
                                className="form-control form-input-background border-none border-radius-31"
                                type="text"
                                value={formData.accountNumber}
                                onChange={handleChange}
                                placeholder="Nhập số tài khoản"
                            />
                        </div>
                        {errors.accountNumber && <p className="error-message-validate font-12">{errors.accountNumber}</p>}
                    </div>

                    {/* Tên ngân hàng */}
                    <div className="col-md-12 mb-20">
                        <div className="form-group flex-space">
                            <label className="label-input-text form-label white-color m-0">Tên ngân hàng:</label>
                            <input
                                name="bankName"
                                style={{ padding: "16px 25px" }}
                                className="form-control form-input-background border-none border-radius-31"
                                type="text"
                                value={formData.bankName}
                                onChange={handleChange}
                                placeholder="Nhập tên ngân hàng"
                            />
                        </div>
                        {errors.bankName && <p className="error-message-validate font-12">{errors.bankName}</p>}
                    </div>

                    {/* Chi nhánh */}
                    <div className="col-md-12 mb-20">
                        <div className="form-group flex-space">
                            <label className="label-input-text form-label white-color m-0">Chi nhánh:</label>
                            <input
                                name="branch"
                                style={{ padding: "16px 25px" }}
                                className="form-control form-input-background border-none border-radius-31"
                                type="text"
                                value={formData.branch}
                                onChange={handleChange}
                                placeholder="Nhập chi nhánh"
                            />
                        </div>
                        {errors.branch && <p className="error-message-validate font-12">{errors.branch}</p>}
                    </div>

                    {/* Loại hình kinh doanh */}
                    <InputLabel label="Hoá đơn đỏ" isRequired={false} />

                    <div className="col-md-12 mb-20 mt-30">
                        <div className="form-group d-flex">
                            <label className="flex-start label-input-text form-label white-color m-0">Loại hình kinh doanh:</label>
                            <div className="row" style={{ width: "70%", alignItems: "center" }}>
                                <div className="col-md-4" style={{ display: 'flex', alignItems: 'center' }}>
                                    <div className="item-payment-method" style={{ display: 'flex', alignItems: 'center' }}>
                                        <input
                                            type="radio"
                                            id="personal"
                                            name="businessType"
                                            value="personal"
                                            checked={formData.businessType === 'personal'}
                                            onChange={handleBusinessTypeChange}
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
                                            htmlFor="personal"
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
                                            id="business"
                                            name="businessType"
                                            value="business"
                                            checked={formData.businessType === 'business'}
                                            onChange={handleBusinessTypeChange}
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
                                            htmlFor="business"
                                            className="item-payment-method-text item-payment"
                                            style={{ color: '#fff', fontSize: '14px', cursor: 'pointer', margin: "0!important" }}
                                        >
                                            Doanh nghiệp / Tổ chức
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {errors.businessType && <p className="error-message-validate font-12">{errors.businessType}</p>}
                    </div>

                    {/* Họ tên */}
                    <div className="col-md-12 mb-20">
                        <div className="form-group flex-space">
                            <label className="label-input-text form-label white-color m-0">Họ tên:</label>
                            <input
                                name="fullName"
                                style={{ padding: "16px 25px" }}
                                className="form-control form-input-background border-none border-radius-31"
                                type="text"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="Nhập họ tên"
                            />
                        </div>
                        {errors.fullName && <p className="error-message-validate font-12">{errors.fullName}</p>}
                    </div>

                    {/* Địa chỉ */}
                    <div className="col-md-12 mb-20">
                        <div className="form-group flex-space">
                            <label className="label-input-text form-label white-color m-0">Địa chỉ:</label>
                            <input
                                name="address"
                                style={{ padding: "16px 25px" }}
                                className="form-control form-input-background border-none border-radius-31"
                                type="text"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Nhập địa chỉ"
                            />
                        </div>
                        {errors.address && <p className="error-message-validate font-12">{errors.address}</p>}
                    </div>

                    {/* Mã số thuế */}
                    <div className="col-md-12 mb-20">
                        <div className="form-group flex-space">
                            <label className="label-input-text form-label white-color m-0">Mã số thuế:</label>
                            <input
                                name="taxCode"
                                style={{ padding: "16px 25px" }}
                                className="form-control form-input-background border-none border-radius-31"
                                type="text"
                                value={formData.taxCode}
                                onChange={handleChange}
                                placeholder="Nhập mã số thuế"
                                disabled={formData.businessType !== 'business'}
                            />
                        </div>
                        {errors.taxCode && <p className="error-message-validate font-12">{errors.taxCode}</p>}
                    </div>
                </div>
            </div>

            {/* Tin nhắn xác nhận */}
            <div className="secondary-background border-radius-25 mb-35" style={{ padding: "20px 40px" }}>
                <div className="row mt-10 d-flex">
                    <div className="col-md-12 mb-20">
                        <div className="form-group">
                            <InputLabel label="Tin nhắn xác nhận dành cho người tham gia" isMarginLeft />
                            <p className='ml-25 mb-15 white-color'>Tin nhắn xác nhận này sẽ được gửi đến cho người tham gia sau khi đặt vé thành công</p>
                            <textarea
                                name="confirmationMessage"
                                placeholder='Nhập tại đây'
                                style={{ padding: "16px 25px", height: "333px" }}
                                className="form-control form-input-background border-none border-radius-31"
                                value={formData.confirmationMessage}
                                onChange={handleChange}
                            />
                            {errors.confirmationMessage && <p className="error-message-validate font-12">{errors.confirmationMessage}</p>}
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col col-lg-6"><button
                    onClick={onBack}
                    className="btn btn-default main-background white-color w-100 mb-50"
                >Quay lại</button></div>
                <div className="col col-lg-6">
                    <button
                        className="btn btn-default primary-background white-color w-100 mb-50"
                        onClick={handleSubmit}
                    >Lưu</button>
                </div>
            </div>
        </div>
    )
}
