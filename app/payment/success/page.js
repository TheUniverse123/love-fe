'use client'
import Link from "next/link"
import { useState } from "react"
import styles from "./Success.module.css"

export default function SuccessPage() {
    const [showModal, setShowModal] = useState(true)
    return (
        <main className={`main main-background ${styles.main}`}>
            {showModal && (
                <div className="modal fade show flex-center" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content p-30 main-secondary-background">
                            <div className="modal-body flex-center flex-column">
                                <img src="/assets/icon/success-icon.svg" />
                                <h6 className="modal-title text-center mb-10 mt-10 white-color" id="exampleModalLabel">Đặt vé thành công!</h6>
                                <p className="white-color">Kiểm tra thông tin chi tiết tại
                                    <Link className="primary-color text-sm-bold ml-5" href="/dashboard">
                                        Vé đã đặt
                                    </Link></p>
                            </div>
                            <div className="modal-footer border-0px flex-center">
                                <Link type="button"
                                    className="btn btn-default primary-background"
                                    href="/">
                                    Quay lại trang chủ
                                    <svg width={16} height={16} className="stroke-white ml-10" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 15L15 8L8 1M15 8L1 8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    )
}