'use client'
import styles from "./PopupSignin.module.css";

import { useState } from "react";

export default function ForgotPasswordForm({ onBack, onNext }) {
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
                <a className="close-popup-signin border-background" />
                <div className="d-flex gap-2 align-items-center">
                    <h4 className="white-color mt-30">Quên mật khẩu</h4>
                </div>
            </div>
            <div className={`popup-content pt-20 ${styles.popupBody}`}>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            name="forgotEmail"
                            value={email}
                            autoComplete="off"
                            className={`form-control popupsigin border-color-3 ${error ? "error error-border" : ""}`}
                            type="email"
                            placeholder="Nhập email khôi phục"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {error && <p className="error-message-validate">{error}</p>}
                    </div>
                    <div className="form-group mt-45 mb-90">
                        <button className="btn btn-black-lg primary-background-2" type="submit">
                            Gửi email
                        </button>
                    </div>
                    <p className="text-sm-medium neutral-500">
                        Nhớ mật khẩu?{" "}
                        <a className="primary-color-2" style={{ cursor: "pointer" }} onClick={onBack}>
                            Đăng nhập
                        </a>
                    </p>
                </form>
            </div>
        </>
    );
}