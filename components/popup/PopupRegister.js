'use client'

import { fetchRegister } from "@/app/api/account";
import { generateRandomUsername } from "@/app/util/convert";
import { validateNonEmptyString, validatePassword } from "@/app/util/validation";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import CloseButton from "./CloseButton";
import styles from "./PopupSignup.module.css";
import { Spinner } from "react-bootstrap";

export default function PopupRegister({ onClose, onNext }) {
    const [formState, setFormState] = useState({
        name: generateRandomUsername(),
        username: generateRandomUsername(),
        email: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false,
        error: {},
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormState((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
            error: { ...prev.error, [name]: "" },
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, username, email, password, confirmPassword, agreeTerms } = formState;
        const errors = {};

        if (!validateNonEmptyString(email)) errors.email = "Email là bắt buộc";

        if (!validatePassword(password)) {
            errors.password = "Mật khẩu gồm tối thiểu 6 kí tự, ít nhất 1 chữ hoa, chữ thường, ký tự đặc biệt";
        }
        if (password !== confirmPassword) errors.confirmPassword = "Mật khẩu không khớp";
        if (!agreeTerms) errors.agreeTerms = "Bạn phải đồng ý với điều khoản";

        if (Object.keys(errors).length > 0) {
            setFormState((prev) => ({ ...prev, error: errors }));
            return;
        }

        mutate({
            fullName: name,
            username,
            email,
            password
        })
    };

    const { mutate, isPending } = useMutation({
        mutationKey: ['register'],
        mutationFn: (userInfo) => fetchRegister(userInfo),
        onSuccess: async (response) => {
            if (response.statusCode === 201) {
                setFormState({
                    name: generateRandomUsername(),
                    username: generateRandomUsername(),
                    email: "",
                    password: "",
                    confirmPassword: "",
                    agreeTerms: false,
                    error: {},
                })
                toast.success("Đăng ký tài khoản thành công, vui lòng kiểm tra email để xác nhận tài khoản!");
            } else {
                toast.error(response[0])
            }
        },
        onError: (error) => {
            console.log(error)
            toast.error("Email hoặc password không hợp lệ");
        },
    });
    return (
        <>
            <div className={`popup-content pb-20 primary-background ${styles.popupHeader}`}>
                <CloseButton onClose={onClose} />
                <div className="d-flex gap-2 align-items-center">
                    <h4 className="white-color mt-30">Đăng Ký</h4>
                </div>
            </div>

            <div className={`popup-content pt-40 ${styles.popupBody}`}>
                <CloseButton onClose={onClose} />
                <div className="form-login">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                className={`form-control email ${formState.error.email ? "error error-border" : ""}`}
                                type="email"
                                name="email"
                                value={formState.email}
                                placeholder="Email"
                                onInput={handleInputChange}
                                autoComplete="off"
                            />
                            {formState.error.email && (
                                <p className="error-message-validate">{formState.error.email}</p>
                            )}
                        </div>
                        <div className="form-group">
                            <input
                                className={`form-control password ${formState.error.password ? "error error-border" : ""}`}
                                type="password"
                                name="password"
                                value={formState.password}
                                placeholder="Mật khẩu"
                                onInput={handleInputChange}
                            />
                            {formState.error.password && (
                                <p className="error-message-validate">{formState.error.password}</p>
                            )}
                        </div>
                        <div className="form-group">
                            <input
                                className={`form-control password ${formState.error.confirmPassword ? "error error-border" : ""}`}
                                type="password"
                                name="confirmPassword"
                                value={formState.confirmPassword}
                                placeholder="Nhập lại mật khẩu"
                                onInput={handleInputChange}
                            />
                            {formState.error.confirmPassword && (
                                <p className="error-message-validate">{formState.error.confirmPassword}</p>
                            )}
                        </div>
                        <div className="form-group">
                            <div className="box-remember-forgot">
                                <div className="remeber-me">
                                    <label className="text-xs-medium neutral-500 flex-start mt-25">
                                        <input
                                            className="cb-remember"
                                            type="checkbox"
                                            name="agreeTerms"
                                            checked={formState.agreeTerms}
                                            onChange={handleInputChange}
                                            id="agreeTerms" />
                                        <p className="w-80">Tôi đã đọc và đồng ý với Điều khoản sử dụng
                                            và Chính sách bảo mật thông tin cá nhân của LOVÉ</p>
                                    </label>

                                    {formState.error.agreeTerms && (
                                        <p className="error-message-validate">{formState.error.agreeTerms}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="form-group mt-25 mb-0">
                            <button disabled={isPending} type="submit" className="btn btn-black-lg primary-background-2 mb-85">
                                {isPending ? <Spinner /> : 'Tạo tài khoản mới'}
                                <svg width={16} height={16} viewBox="0 0 16 16" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 15L15 8L8 1M15 8L1 8" stroke strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <p class="text-sm-medium neutral-500">Đã có tài khoản?  <a class="primary-color-2 btn-signin" onClick={onNext}>Đăng nhập ngay!</a></p>
                    </form>
                </div>
            </div>
        </>
    )
}
