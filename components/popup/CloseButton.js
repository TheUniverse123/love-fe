import styles from "./CloseButton.module.css"

export default function CloseButton({ onClose }) {
    return (
        <div onClick={onClose} className={`${styles.close} border-background`}></div>
    )
}
