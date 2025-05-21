'use client'

import CloseButton from "./CloseButton"
import styles from "./PopupSignup.module.css"

export default function PopupRegister({ onClose, onNext }) {
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
                    <form action="#">
                        <div className="form-group">
                            <input className="form-control username" type="text" placeholder="Email / Username" />
                        </div>
                        <div className="form-group">
                            <input className="form-control password" type="password" placeholder="Nhập mật khẩu" />
                        </div>
                        <div className="form-group">
                            <input className="form-control password" type="password" placeholder="Nhập lại mật khẩu" />
                        </div>

                        <div className="form-group">
                            <div className="box-remember-forgot">
                                <div className="remeber-me">
                                    <label className="text-xs-medium neutral-500 flex-start mt-25">
                                        <input className="cb-remember" type="checkbox" />
                                        <p className="w-80">Tôi đã đọc và đồng ý với Điều khoản sử dụng
                                            và Chính sách bảo mật thông tin cá nhân của LOVÉ</p>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="form-group mt-25 mb-25">
                            <a className="btn btn-black-lg border-background mb-85" href="#">Tạo tài khoản mới
                                <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 15L15 8L8 1M15 8L1 8" stroke strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg></a></div>
                        <p class="text-sm-medium neutral-500">Đã có tài khoản?  <a class="primary-color-2 btn-signin" onClick={onNext}>Đăng nhập ngay!</a></p>
                    </form>
                </div>
            </div>
        </>
    )
}
