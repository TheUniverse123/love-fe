'use client'
import styles from "./PopupSignin.module.css";

import { useState } from "react";

export default function ResetPasswordForm({ onBack }) {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
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
        setError({});
        toast.success("Đặt lại mật khẩu thành công");
        onBack();
    };

    return (
        <>
            <div className={`popup-content pb-20 primary-background ${styles.popupHeader}`}>
                <a className="close-popup-signin border-background" />
                <div className="d-flex gap-2 align-items-center">
                    <h4 className="white-color mt-30">Đặt lại mật khẩu</h4>
                </div>
            </div>
            <div className={`popup-content pt-20 ${styles.popupBody}`}>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="password"
                            className={`form-control popupsigin border-color-3 ${error.password ? "error error-border" : ""}`}
                            placeholder="Nhập mật khẩu mới"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error.password && <p className="error-message-validate">{error.password}</p>}
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className={`form-control popupsigin border-color-3 ${error.confirmPassword ? "error error-border" : ""}`}
                            placeholder="Xác nhận mật khẩu"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {error.confirmPassword && <p className="error-message-validate">{error.confirmPassword}</p>}
                    </div>
                    <div className="form-group mt-45 mb-90">
                        <button className="btn btn-black-lg primary-background-2" type="submit">
                            Đặt lại mật khẩu
                        </button>
                    </div>
                    <p className="text-sm-medium neutral-500">
                        Quay lại{" "}
                        <a className="primary-color-2" style={{ cursor: "pointer" }} onClick={onBack}>
                            Đăng nhập
                        </a>
                    </p>
                </form>
            </div>
        </>
    );
}