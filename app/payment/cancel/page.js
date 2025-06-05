export default function CancelPage() {
    const styles = {
        page: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f4f6f9',
            fontFamily: 'Arial, sans-serif',
            minHeight: '100vh',
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
            fontSize: '80px',
            color: '#28a745',
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
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
        }
    }
    return (
        <main className="main">
            <div style={styles.page}>
                <div style={styles.card}>
                    <div style={styles.iconLarge}>
                        <img
                            src='https://www.iconpacks.net/icons/2/free-check-icon-3278-thumb.png'
                            alt='checkicon'
                            style={{ width: '50%', display: 'inline-block' }}
                        />
                    </div>
                    <div style={styles.header}>Thanh toán thành công</div>
                    <p style={styles.message}>
                        Thanh toán thành công, vé đã được gửi trong email của bạn
                    </p>
                    <a href='/' style={styles.button}>
                        Quay về trang chủ
                    </a>
                </div>
            </div>
        </main>
    )
}