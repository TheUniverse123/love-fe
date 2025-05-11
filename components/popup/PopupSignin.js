import styles from "./PopupSignin.module.css"

export default function PopupSignin() {
    return (
        <div className="popup-signin transparent-background">
            <div className="popup-container border-none">
                <div className="main-secondary-background" style={{borderRadius: "16px"}}>
                    <div className={`popup-content pb-20 primary-background ${styles.popupHeader}`}>
                        <a className="close-popup-signin border-background" />
                        <div className="d-flex gap-2 align-items-center">
                            <h4 className="white-color mt-30">Đăng nhập</h4>
                        </div>
                    </div>

                    <div className={`popup-content pt-20 ${styles.popupBody}`}>
                        <div className="box-button-logins">
                            <a className="btn btn-login btn-google mr-10 border-background border-color-3" href="#">
                                <img src="/assets/lib/user/imgs/template/popup/google.svg" alt="Travila" />
                                <span className="text-sm-bold white-color">Đăng nhập bằng Google</span>
                            </a>
                            <a className="btn btn-login mr-10 border-background border-color-3" href="#">
                                <img src="/assets/lib/user/imgs/template/popup/facebook.svg" alt="Travila" />
                            </a>
                            <a className="btn btn-login border-background border-color-3" href="#">
                                <img src="/assets/icon/apple.svg" alt="Travila" />
                            </a>
                        </div>
                        <div className="form-login">
                            <form action="#">
                                <div className="form-group">
                                    <input className="form-control username popupsigin border-color-3" type="text" placeholder="Nhập email hoặc số điện thoại" />
                                </div>
                                <div className="form-group">
                                    <input className="form-control password popupsigin border-color-3" type="password" placeholder="Nhập mật khẩu" />
                                </div>
                                <div className="form-group">
                                    <div className="box-remember-forgot">
                                        <div className="remeber-me">
                                            <label className="text-xs-medium neutral-500">
                                                <input className="cb-remember mr-5" type="checkbox" />Nhớ mật khẩu
                                            </label>
                                        </div>
                                        <div className="forgotpass"> <a className="text-xs-medium neutral-500" href="#">Quên mật khẩu</a></div>
                                    </div>
                                </div>
                                <div className="form-group mt-45 mb-90"> <a className="btn btn-black-lg primary-background-2" href="#">Đăng nhập
                                    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 15L15 8L8 1M15 8L1 8" stroke strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg></a></div>
                                <p className="text-sm-medium neutral-500">Chưa có tài khoản? <a className="primary-color-2 btn-signup" href="#">Tạo tài khoản ngay!</a></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
