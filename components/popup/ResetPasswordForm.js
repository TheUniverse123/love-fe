'use client'
import { validatePassword } from "@/app/util/validation";
import CloseButton from "./CloseButton";
import styles from "./PopupSignin.module.css";

import { useActionState, useState } from "react";
import { fetchResetPassword } from "@/app/api/account";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";

export default function ResetPasswordForm({ onBack, onClose }) {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState({});
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const handleSubmit = () => {
        const newErrors = {};
        if (!validatePassword(password)) {
            newErrors.password = "Mật khẩu không hợp lệ";
        }
        if (password !== confirmPassword) {
            newErrors.confirmPassword = "Mật khẩu không khớp";
        }
        if (Object.keys(newErrors).length > 0) {
            setError(newErrors);
            return;
        }
        const params = new URLSearchParams(window.location.search);
        const email = params.get("email");
        const token = params.get("token");

        const submitData = {
            email, token, newPassword: password
        }

        async function fetchToken() {
            const response = await fetchResetPassword(submitData)
            console.log(response)
            if (response.statusCode === 200) {
                setError({});
                toast.success("Đặt lại mật khẩu thành công");
                setTimeout(() => {
                    window.location.href = "/"
                }, 2000)
            } else {
                toast.error(response[0])
            }
        }
        fetchToken()
    };
    const [state, formAction, isPending] = useActionState(handleSubmit);
    return (
        <>
            <div className={`popup-content pb-20 primary-background ${styles.popupHeader}`}>
                <CloseButton onClose={onClose} />
                <div className="d-flex gap-2 align-items-center">
                    <h6 className="white-color mt-30">Đặt lại mật khẩu</h6>
                </div>
            </div>
            <div className={`popup-content pt-20 ${styles.popupBody}`}>
                <form action={formAction}>
                    <div className="form-group position-relative">
                        <p className="white-color text-lg-bold mt-20 mb-15 font-16">Mật khẩu mới</p>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className={`form-control popupsigin password border-color-3 ${error.password ? "error error-border" : ""}`}
                            placeholder="Nhập mật khẩu mới"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <svg onClick={() => setShowPassword(prev => !prev)} className={`${styles.eyeIcon} ${error.password ? styles.active : ""}`} xmlns="http://www.w3.org/2000/svg" width="22" height="16" viewBox="0 0 22 16" fill="none">
                            <path d="M1.06251 8.34836C0.979165 8.12384 0.979165 7.87688 1.06251 7.65236C1.87421 5.68421 3.25202 4.0014 5.02128 2.81726C6.79053 1.63312 8.87155 1.00098 11.0005 1.00098C13.1295 1.00098 15.2105 1.63312 16.9797 2.81726C18.749 4.0014 20.1268 5.68421 20.9385 7.65236C21.0218 7.87688 21.0218 8.12384 20.9385 8.34836C20.1268 10.3165 18.749 11.9993 16.9797 13.1835C15.2105 14.3676 13.1295 14.9997 11.0005 14.9997C8.87155 14.9997 6.79053 14.3676 5.02128 13.1835C3.25202 11.9993 1.87421 10.3165 1.06251 8.34836Z" stroke={showPassword ? "#E4E4E4" : "#575756"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M11 11C12.6569 11 14 9.65685 14 8C14 6.34315 12.6569 5 11 5C9.34315 5 8 6.34315 8 8C8 9.65685 9.34315 11 11 11Z" stroke={showPassword ? "#E4E4E4" : "#575756"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        {error.password && <p className="error-message-validate">{error.password}</p>}
                    </div>
                    <div className="form-group position-relative">
                        <p className="white-color text-lg-bold mt-20 mb-15 font-16">Nhập lại mật khẩu mới</p>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            className={`form-control popupsigin password border-color-3 ${error.confirmPassword ? "error error-border" : ""}`}
                            placeholder="Xác nhận mật khẩu"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <svg onClick={() => setShowConfirmPassword(prev => !prev)} className={`${styles.eyeIcon} ${error.confirmPassword ? styles.active : ""}`} xmlns="http://www.w3.org/2000/svg" width="22" height="16" viewBox="0 0 22 16" fill="none">
                            <path d="M1.06251 8.34836C0.979165 8.12384 0.979165 7.87688 1.06251 7.65236C1.87421 5.68421 3.25202 4.0014 5.02128 2.81726C6.79053 1.63312 8.87155 1.00098 11.0005 1.00098C13.1295 1.00098 15.2105 1.63312 16.9797 2.81726C18.749 4.0014 20.1268 5.68421 20.9385 7.65236C21.0218 7.87688 21.0218 8.12384 20.9385 8.34836C20.1268 10.3165 18.749 11.9993 16.9797 13.1835C15.2105 14.3676 13.1295 14.9997 11.0005 14.9997C8.87155 14.9997 6.79053 14.3676 5.02128 13.1835C3.25202 11.9993 1.87421 10.3165 1.06251 8.34836Z" stroke={showConfirmPassword ? "#E4E4E4" : "#575756"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M11 11C12.6569 11 14 9.65685 14 8C14 6.34315 12.6569 5 11 5C9.34315 5 8 6.34315 8 8C8 9.65685 9.34315 11 11 11Z" stroke={showConfirmPassword ? "#E4E4E4" : "#575756"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        {error.confirmPassword && <p className="error-message-validate">{error.confirmPassword}</p>}
                    </div>
                    <div className="form-group mt-60 mb-30">
                        <button disabled={isPending} className="btn btn-black-lg primary-background-2" type="submit">
                            {isPending ? <Spinner /> : 'Lưu thay đổi'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}