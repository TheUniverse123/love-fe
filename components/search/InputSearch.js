import styles from "./InputSearch.module.css"
export default function InputSearch() {
    return (
        <div className={styles.boxSearch}>
            <form action="">
                <input
                    className={`form-control input-search ${styles.inputSearch}`}
                    type="text"
                    name="keyword"
                    placeholder="Tìm kiếm sự kiện" />
            </form>
        </div>
    )
}
