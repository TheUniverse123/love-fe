'use client'

import { fetchConfirmEmail } from '@/app/api/account'
import Link from 'next/link'
import { useEffect } from 'react'

export default function ConfirmSuccessClient() {
    useEffect(() => {
        const url = window.location.href
        const rawQuery = url.split('?')[1]

        if (rawQuery) {
            const params = new URLSearchParams(rawQuery)
            const token = url.split('token=')[1]?.split('&')[0]
            const emailParam = params.get('email')
            if (token && emailParam) {
                const decodedEmail = decodeURIComponent(emailParam)
                async function fetchToken() {
                    const response = await fetchConfirmEmail(decodedEmail, token)
                }
                fetchToken()
            }
        }
    }, [])

    const styles = {
        page: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'Arial, sans-serif',
            minHeight: '100vh',
        },
        card: {
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#313131',
            padding: '30px',
            textAlign: 'center'
        },
        header: {
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '20px'
        },
        iconLarge: {
            fontSize: '80px',
            color: '#28a745',
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        message: {
            fontSize: '16px',
            color: '#fff',
            marginBottom: '30px'
        },
        button: {
            padding: '10px 20px',
            color: '#ffffff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            textDecoration: 'none',
            fontSize: '16px'
        }
    }

    return (
        <main className="main main-background">
            <div style={styles.page}>
                <div style={styles.card}>
                    <div style={styles.iconLarge}>
                        <img
                            src='https://www.iconpacks.net/icons/2/free-check-icon-3278-thumb.png'
                            alt='checkicon'
                            style={{ width: '50%', display: 'inline-block' }}
                        />
                    </div>
                    <div style={styles.header} className='primary-color'>Tài Khoản Đã Được Xác Thực</div>
                    <p style={styles.message}>
                        Tài khoản của bạn đã được xác thực thành công! Bạn có thể đăng nhập vào tài khoản của mình ngay bây giờ.
                    </p>
                    <Link href='/' style={styles.button} className='primary-background'>
                        Quay về trang chủ
                    </Link>
                </div>
            </div>
        </main>
    )
}
