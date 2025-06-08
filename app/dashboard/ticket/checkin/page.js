'use client'

import { useState } from 'react';
import styles from "./Checkin.module.css"
import { fetchCheckin } from '@/app/api/manage-workshop';
export default function CheckinPage() {
    const [code, setCode] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetchCheckin(code)
        if (response.statusCode === 200) {
            setMessage('Check-in thành công! Chào mừng bạn đến với workshop.');
        } else {
            setMessage('Mã không hợp lệ hoặc chưa đến thời gian check-in. Vui lòng thử lại.');
        }
    };
    return (
        <div className={`main py-5 main-background ${styles.checkinPage}`}>
            <div className="row flex-center h-100">
                <div className="col-md-6 col-lg-4">
                    <div className="card shadow-lg p-20 border-1px main-secondary-background">
                        <div className="card-body">
                            <h4 className="card-title text-center mb-20 primary-color">Check-in Workshop</h4>
                            <form onSubmit={handleSubmit} >
                                <div className="mb-20 form-group">
                                    <label htmlFor="code" className="form-label white-color">
                                        Nhập mã vé check-in
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control border-background border-1px white-color"
                                        id="code"
                                        placeholder="Nhập mã check-in"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className='flex-center'>
                                    <button type="submit" className="btn btn-default primary-background w-50">
                                        Kiểm tra mã
                                    </button>
                                </div>
                            </form>

                            {message && (
                                <div className={`mt-3 alert ${message.includes('thành công') ? 'alert-success' : 'alert-danger'}`}>
                                    {message}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
