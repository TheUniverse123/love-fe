'use client'
import CloseButton from "./CloseButton";
import styles from "./PopupSignin.module.css";
import stylesMain from "./ForgotPasswordForm.module.css"
import { useState } from "react";
import { validateNonEmptyString } from "@/app/util/validation";
import { toast } from "react-toastify";

export default function ForgotPasswordForm({ onNext, onClose }) {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateNonEmptyString(email)) {
            setError("Email là bắt buộc");
            return;
        }
        setError("");
        toast.success("Đã gửi email đặt lại mật khẩu");
        onNext();
    };

    return (
        <>
            <div className={`popup-content pb-20 primary-background ${styles.popupHeader}`}>
                <CloseButton onClose={onClose} />
                <div className="gap-2 align-items-center">
                    <h6 className="white-color mt-30">Quên mật khẩu</h6>
                    <p className={stylesMain.description}>Nhập email của bạn để đặt lại mật khẩu</p>
                </div>
            </div>
            <div className={`popup-content pt-20 ${styles.popupBody}`}>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <p className="white-color text-lg-bold mt-20 mb-15">Email của bạn</p>
                        <input
                            name="forgotEmail"
                            value={email}
                            autoComplete="off"
                            className={`form-control username popupsigin border-color-3 ${error ? "error error-border" : ""}`}
                            type="email"
                            placeholder="Nhập email khôi phục"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {error && <p className="error-message-validate">{error}</p>}
                    </div>
                    <div className="form-group mt-80 mb-40">
                        <button className="btn btn-black-lg primary-background-2" type="submit">
                            Đặt lại mật khẩu
                            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 15L15 8L8 1M15 8L1 8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}