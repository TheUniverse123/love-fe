import styles from "./InputSearch.module.css"

export default function InputSearch({ onSearch }) {
    return (
        <div className={styles.boxSearch}>
            <form action="" onSubmit={e => e.preventDefault()}>
                <input
                    className={`form-control input-search ${styles.inputSearch}`}
                    type="text"
                    name="keyword"
                    placeholder="Tìm kiếm sự kiện"
                    onChange={(e) => onSearch(e.target.value)}
                />
            </form>
        </div>
    )
}
