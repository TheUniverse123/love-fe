'use client'

import { useEffect, useState } from 'react'
import InputLabel from './InputLabel'
import { Spinner } from 'react-bootstrap'

export default function CheckoutInformationForm({ onBack, formRef, onCreate }) {
    const [formData, setFormData] = useState({
        accountHolder: '',
        accountNumber: '',
        bankName: '',
        branch: '',
        businessType: '',
        fullName: '',
        address: '',
        taxCode: '',
        confirmationMessage: '',
    })
    useEffect(() => {
        if (formRef) {
            formRef.current = {
                getData: () => ({
                    ...formData
                }),
                prefillData: (data) => {
                    setFormData({
                        accountHolder: data.accountHolder || '',
                        accountNumber: data.accountNumber || '',
                        bankName: data.bankName || '',
                        branch: data.branch || '',
                        businessType: data.isBusiness ? 'business' : 'personal',
                        fullName: data.invoiceName || '',
                        address: data.invoiceAddress || '',
                        taxCode: data.taxCode !== 'none' ? data.taxCode : '',
                        confirmationMessage: data.confirmationMessage || ''
                    });
                }
            };
        }
    }, [formData]);
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
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

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async () => {
        if (validate()) {
            setIsSubmitting(true)
            try {
                await onCreate()
            } finally {
                setIsSubmitting(false)
            }
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
                                disabled={formData.businessType !== 'business'}
                            />
                        </div>
                        {errors.taxCode && <p className="error-message-validate font-12">{errors.taxCode}</p>}
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
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                className="me-2"
                            />
                        ) : null}
                        {isSubmitting ? 'Đang lưu...' : 'Lưu'}
                    </button>
                </div>
            </div>
        </div>
    )
}
