'use client'
import { fetchCreateQuestion } from '@/app/api/faq';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
        termsAccepted: false
    });

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
        termsAccepted: ''
    });

    const validate = () => {
        const newErrors = {};

        // Validate first name
        if (!formData.firstName) {
            newErrors.firstName = 'Tên không được để trống';
        }
        // Validate last name
        if (!formData.lastName) {
            newErrors.lastName = 'Họ không được để trống';
        }

        // Validate email
        if (!formData.email) {
            newErrors.email = 'Email không được để trống';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email không hợp lệ';
        }

        // Validate phone number (simple validation for Vietnam phone number)
        if (!formData.phone) {
            newErrors.phone = 'Số điện thoại không được để trống';
        } else if (!/^\d{10,11}$/.test(formData.phone)) {
            newErrors.phone = 'Số điện thoại không hợp lệ';
        }

        // Validate message
        if (!formData.message) {
            newErrors.message = 'Vui lòng nhập nội dung tin nhắn';
        }

        // Validate terms acceptance
        if (!formData.termsAccepted) {
            newErrors.termsAccepted = 'Bạn phải đồng ý với chính sách và điều khoản';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });

        // Remove the error message when user starts typing or checking
        if (value && name !== 'termsAccepted') {
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: ''
            }));
        }
        if (type === 'checkbox' && name === 'termsAccepted') {
            setErrors(prevErrors => ({
                ...prevErrors,
                termsAccepted: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            const question = {
                title: 'Contact Form Submission',
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phoneNumber: formData.phone,
                description: formData.message
            };

            const response = await fetchCreateQuestion(question);

            if (response.statusCode === 201) {
                toast.success('Gửi câu hỏi thành công!');
                // Clear form after successful submission
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    message: '',
                    termsAccepted: false
                });
            } else {
                toast.error('Đã có lỗi xảy ra, vui lòng thử lại!');
            }
        }
    };

    return (
        <section className="box-section box-contact-form main-background pt-0">
            <div className="container">
                <div className="row">
                    <div className="col-lg-7 mb-30">
                        <h2 className="white-color mb-25">Liên hệ chúng tôi</h2>
                        <div className="form-contact">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label className="text-sm-medium white-color">Tên</label>
                                        <input
                                            className="form-control username"
                                            type="text"
                                            name="firstName"
                                            placeholder="First Name"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                        />
                                        {errors.firstName && <p className="error-message-validate font-11">{errors.firstName}</p>}
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label className="text-sm-medium white-color">Họ</label>
                                        <input
                                            className="form-control username"
                                            type="text"
                                            name="lastName"
                                            placeholder="Last Name"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                        />
                                        {errors.lastName && <p className="error-message-validate font-11">{errors.lastName}</p>}
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label className="text-sm-medium white-color">Địa chỉ email</label>
                                        <input
                                            className="form-control email"
                                            type="email"
                                            name="email"
                                            placeholder="email@domain.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                        {errors.email && <p className="error-message-validate font-11">{errors.email}</p>}
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label className="text-sm-medium white-color">Số điện thoại</label>
                                        <input
                                            className="form-control phone"
                                            type="text"
                                            name="phone"
                                            placeholder="Phone number"
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />
                                        {errors.phone && <p className="error-message-validate font-11">{errors.phone}</p>}
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label className="text-sm-medium white-color">Vấn đề cần hỗ trợ</label>
                                        <textarea
                                            className="form-control"
                                            rows={6}
                                            name="message"
                                            placeholder="Để lại tin nhắn cho chúng tôi..."
                                            value={formData.message}
                                            onChange={handleChange}
                                        />
                                        {errors.message && <p className="error-message-validate font-11">{errors.message}</p>}
                                    </div>
                                </div>
                                <div className="box-remember-forgot">
                                    <div className="form-group">
                                        <div className="remeber-me">
                                            <label className="text-sm-medium neutral-500">
                                                <input
                                                    className="cb-remember"
                                                    type="checkbox"
                                                    name="termsAccepted"
                                                    checked={formData.termsAccepted}
                                                    onChange={handleChange}
                                                />
                                                Đồng ý với <Link className="text-sm-bold white-color" href="term.html">Chính sách </Link>và <Link className="text-sm-bold white-color" href="privacy.html">Điều khoản</Link> của chúng tôi
                                            </label>
                                            {errors.termsAccepted && <p className="error-message-validate font-11">{errors.termsAccepted}</p>}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <button className="btn btn-book border-background" onClick={handleSubmit}>Gửi tin nhắn
                                        <svg width={17} height={16} viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.5 15L15.5 8L8.5 1M15.5 8L1.5 8" stroke strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 mb-30">
                        <div className="banner-contact">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="banner-img-contact"> <img className="bdrd-16" src="https://firebasestorage.googleapis.com/v0/b/love-fe-71303.firebasestorage.app/o/helpCenter%2Fhelp1.png?alt=media&token=b22da993-5151-4a91-b291-1a1a2e47ddb1" alt="Travilla" /></div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="banner-img-contact"> <img className="bdrd-16" src="https://firebasestorage.googleapis.com/v0/b/love-fe-71303.firebasestorage.app/o/helpCenter%2Fhelp2.png?alt=media&token=8f7a5cfe-9272-44e6-a013-cc6a204b9495" alt="Travilla" /></div>
                                    <div className="banner-img-contact"> <img className="bdrd-16" src="https://firebasestorage.googleapis.com/v0/b/love-fe-71303.firebasestorage.app/o/helpCenter%2Fhelp4.png?alt=media&token=55097a59-6056-413e-b1cf-2f114d54aceb" alt="Travilla" /></div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="banner-img-contact"> <img className="bdrd-16" src="https://firebasestorage.googleapis.com/v0/b/love-fe-71303.firebasestorage.app/o/helpCenter%2Fhelp3.png?alt=media&token=6c7ff2c6-e0a7-4114-bd73-0e82333613ab" alt="Travilla" /></div>
                                    <div className="banner-img-contact"> <img className="bdrd-16" src="https://thienanagency.com/photos/all/khac/workshop-painting.jpg" alt="Travilla" /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
