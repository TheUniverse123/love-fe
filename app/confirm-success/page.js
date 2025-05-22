'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { fetchConfirmEmail } from '../api/account';

export default function VerificationSuccessPage() {
    const styles = {
        page: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f4f6f9',
            fontFamily: 'Arial, sans-serif'
        },
        card: {
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#ffffff',
            padding: '30px',
            textAlign: 'center'
        },
        header: {
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#007bff',
            marginBottom: '20px'
        },
        iconLarge: {
            width: '100%',
            fontSize: '80px',
            color: '#28a745',
            marginBottom: '20px',
            display: 'flex', // Chắc chắn sử dụng flexbox
            justifyContent: 'center', // Căn giữa theo chiều ngang
            alignItems: 'center' // Căn giữa theo chiều dọc
        },
        icon: {
            fontSize: '50px',
            color: '#28a745',
            marginBottom: '20px'
        },
        message: {
            fontSize: '16px',
            color: '#555555',
            marginBottom: '30px'
        },
        button: {
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#ffffff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            textDecoration: 'none',
            fontSize: '16px'
        },
        buttonHover: {
            backgroundColor: '#0056b3'
        }
    }
    const { email, token } = useSearchParams();
    useEffect(() => {
        fetchConfirmEmail(email, token)
    }, [])
    return (
        <Suspense>
            <div style={styles.page}>
                <div style={styles.card}>
                    {/* Large Check Icon */}
                    <div style={styles.iconLarge}>
                        <img
                            src='https://www.iconpacks.net/icons/2/free-check-icon-3278-thumb.png'
                            alt='checkicon'
                            style={{ width: '50%', display: 'inline-block' }}
                        />
                    </div>
                    <div style={styles.header}>Tài Khoản Đã Được Xác Thực</div>
                    <p style={styles.message}>
                        Tài khoản của bạn đã được xác thực thành công! Bạn có thể đăng nhập vào
                        tài khoản của mình ngay bây giờ.
                    </p>
                    <a href='/auth/login' style={styles.button}>
                        Đi đến Đăng Nhập
                    </a>
                </div>
            </div>
        </Suspense>
    )
}