'use client'

import { decodeToken, fetchLogin, fetchLoginGoogle, fetchLogout, fetchUserInfoVer2, fetchRefreshToken } from "@/app/api/account";
import { getAuthToken, getAuthTokenDuration, getUserInfo, setUserInfoToStorage } from "@/app/util/auth";
import { validateNonEmptyString, validatePassword } from "@/app/util/validation";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styles from "./PopupSignin.module.css";

import { usePopup } from "@/contexts/PopupContext";
import CloseButton from "./CloseButton";
import ForgotPasswordForm from "./ForgotPasswordForm";
import ResetPasswordForm from "./ResetPasswordForm";
import PopupRegister from "./PopupRegister";
import { Spinner } from "react-bootstrap";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/app/util/firebase";

export default function PopupSignin() {
    const [activeTab, setActiveTab] = useState("signin");
    const { isPopupVisible, closePopup, openPopup } = usePopup()
    useEffect(() => {
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            const type = params.get("type");
            if (type === "reset") {
                setActiveTab("reset");
                openPopup()
            }
        }
    }, []);
    const [formState, setFormState] = useState({
        email: "",
        password: "",
        error: {},
    });

    const ONE_WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000; // One week in milliseconds

    const handleAutoLogout = () => {
        const token = getAuthToken();
        const loginTime = localStorage.getItem('loginTime');
        const currentTime = Date.now();

        if (!token || token === 'EXPIRED' || (loginTime && currentTime - loginTime >= ONE_WEEK_IN_MS)) {
            fetchLogout();
            return;
        }

        const tokenDuration = getAuthTokenDuration();

        const timer = setTimeout(async () => {
            const userInfo = getUserInfo();
            const refreshToken = userInfo?.refreshToken;
            if (refreshToken) {
                const response = await fetchRefreshToken(refreshToken);
                if (response?.accessToken) {
                    userInfo.accessToken = response.accessToken;
                    userInfo.expiration = response.expiration;
                    setUserInfoToStorage(userInfo);
                    handleAutoLogout(); // Recalculate the timer with new expiration
                } else {
                    fetchLogout();
                }
            } else {
                fetchLogout();
            }
        }, tokenDuration);
        return () => clearTimeout(timer);
    };

    const handleAutoLogoutVerGoogle = (duration) => {
        const userInfo = getUserInfo();
        const token = userInfo?.accessToken;
        const loginTime = localStorage.getItem('loginTime');
        const currentTime = Date.now();

        if (!token || token === 'EXPIRED' || (loginTime && currentTime - loginTime >= ONE_WEEK_IN_MS)) {
            fetchLogout();
            return;
        }

        const timer = setTimeout(async () => {
            const refreshToken = userInfo?.refreshToken;
            if (refreshToken) {
                const response = await fetchRefreshToken(refreshToken);
                if (response?.accessToken) {
                    userInfo.accessToken = response.accessToken;
                    userInfo.expiration = response.expiration;
                    setUserInfoToStorage(userInfo);
                    handleAutoLogoutVerGoogle(response.expiration - Date.now()); // Recalculate the timer with new expiration
                } else {
                    fetchLogout();
                }
            } else {
                fetchLogout();
            }
        }, duration);
        return () => clearTimeout(timer);
    };

    const onSuccessLogin = (userInfo) => {
        setUserInfoToStorage(userInfo);
        localStorage.setItem('loginTime', Date.now());
        handleAutoLogout();
        setFormState({
            email: "",
            password: "",
            error: {},
        });
        toast.success("Đăng nhập thành công");
        setTimeout(() => {
            location.reload();
        }, 2000);
    };

    const { mutate, isPending } = useMutation({
        mutationKey: ['login'],
        mutationFn: (userInfo) => fetchLogin(userInfo.email, userInfo.password),
        onSuccess: async (response) => {
            const decodedToken = decodeToken(response?.result?.accessToken);
            const userId = decodedToken.payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

            const userInfo = {
                email: formState.email,
                roles: decodedToken.payload.role,
                accessToken: response?.result.accessToken,
                expiration: response?.result.expiration,
                refreshToken: response?.result.refreshToken,
                id: userId,
            };
            onSuccessLogin(userInfo);
        },
        onError: () => {
            toast.error("Email hoặc password không hợp lệ");
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = formState;
        const errors = {};

        if (!validateNonEmptyString(email)) {
            errors.email = "Email là bắt buộc";
        }

        if (!validateNonEmptyString(password)) {
            errors.password = "Mật khẩu là bắt buộc";
        } else if (!validatePassword(password)) {
            errors.password = "Mật khẩu bao gồm tối thiểu 6 kí tự, với ít nhất 1 kí tự in hoa, thường và kí tự đặc biệt";
        }

        if (Object.keys(errors).length > 0) {
            setFormState((prev) => ({ ...prev, error: errors }));
            return;
        }

        mutate({ email, password });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState((prev) => ({
            ...prev,
            [name]: value,
            error: { ...prev.error, [name]: "" },
        }));
    };

    const handleClose = () => {
        closePopup()
        setActiveTab("signin")
        setFormState({
            email: "",
            password: "",
            error: {},
        })
    }

    function login() {
        signInWithPopup(auth, provider)
            .then((result) => result.user.getIdToken())
            .then(async (idToken) => {
                const response = await fetchLoginGoogle(idToken);
                const decodedToken = decodeToken(response?.result);
                const userId = decodedToken.payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
                const userInfoFetch = await fetchUserInfoVer2(userId);
                const userInfo = {
                    email: userInfoFetch?.result.email,
                    roles: decodedToken?.payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
                    accessToken: response?.result,
                    id: userId,
                    expiration: decodedToken?.payload.exp * 1000,
                };
                onSuccessLogin(userInfo);
            })
            .catch(() => {
                toast.error("Đăng nhập thất bại, vui lòng thử lại sau!");
            });
    }

    return (
        <div className={`popup-signin transparent-background ${!isPopupVisible ? "display-none" : ""}`}>
            <div className="popup-container border-0px">
                <div className="main-secondary-background" style={{ borderRadius: "16px" }}>
                    {activeTab === "signin" && (<>
                        <div className={`popup-content pb-20 primary-background ${styles.popupHeader}`}>
                            <CloseButton onClose={handleClose} />
                            <div className="d-flex gap-2 align-items-center">
                                <h4 className="white-color mt-30">Đăng nhập</h4>
                            </div>
                        </div>
                        <div className={`popup-content pt-20 ${styles.popupBody}`}>
                            <div className="box-button-logins">
                                <a className="btn btn-login btn-google mr-10 border-background border-color-3">
                                    <img src="/assets/lib/user/imgs/template/popup/google.svg" alt="Travila" />
                                    <span onClick={login} className="text-sm-bold white-color">Đăng nhập bằng Google</span>
                                </a>
                            </div>
                            <div className="form-login">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <input
                                            name="email"
                                            value={formState.email}
                                            autoComplete="off"
                                            className={`form-control username popupsigin border-color-3 ${formState.error.email ? "error error-border" : ""}`}
                                            type="email"
                                            placeholder="Nhập email"
                                            onInput={handleInputChange}
                                        />
                                        {formState.error.email && <p className="error-message-validate font-11">{formState.error.email}</p>}
                                    </div>
                                    <div className="form-group">
                                        <input
                                            name="password"
                                            value={formState.password}
                                            autoComplete="off"
                                            className={`form-control password popupsigin border-color-3 ${formState.error.password ? "error error-border" : ""}`}
                                            type="password"
                                            placeholder="Nhập mật khẩu"
                                            onInput={handleInputChange}
                                        />
                                        {formState.error.password && <p className="error-message-validate font-11">{formState.error.password}</p>}
                                    </div>
                                    <div className="form-group">
                                        <div className="box-remember-forgot">
                                            <div className="remeber-me">
                                                <label className="text-xs-medium neutral-500">
                                                    <input className="cb-remember mr-5" type="checkbox" />Nhớ mật khẩu
                                                </label>
                                            </div>
                                            <div className="forgotpass"> <a className="text-xs-medium neutral-500" onClick={() => setActiveTab("forgot")}>Quên mật khẩu</a></div>
                                        </div>
                                    </div>
                                    <div className="form-group mt-45 mb-90">
                                        <button disabled={isPending} className="btn btn-black-lg primary-background-2" type="submit">
                                            {isPending ? <Spinner /> : 'Đăng nhập'}
                                            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8 15L15 8L8 1M15 8L1 8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button>
                                    </div>
                                    <p className="text-sm-medium neutral-500">Chưa có tài khoản?
                                        <a onClick={() => setActiveTab("signup")} className="primary-color-2">Tạo tài khoản ngay!</a>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </>)}

                    {activeTab === "signup" && (
                        <PopupRegister onNext={() => setActiveTab("signin")} onClose={handleClose} />
                    )}

                    {activeTab === "forgot" && (
                        <ForgotPasswordForm onClose={handleClose} onBack={() => setActiveTab("signin")} onNext={() => setActiveTab("reset")} />
                    )}

                    {activeTab === "reset" && (
                        <ResetPasswordForm onClose={handleClose} onBack={() => setActiveTab("signin")} />
                    )}
                </div>
            </div>
        </div>
    );
}
