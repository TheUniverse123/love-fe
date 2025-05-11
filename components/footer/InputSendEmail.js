import styles from "./InputSendEmail.module.css"
export default function InputSendEmail() {
    return (
        <div className={styles.boxEmail}>
            <form action="">
                <input
                    className={`form-control input-search ${styles.inputEmail}`}
                    type="text"
                    name="keyword"
                    placeholder="Nhập email" />
            </form>
        </div>
    )
}
