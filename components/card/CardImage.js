import styles from "./CardImage.module.css"

export default function CardImage({ img }) {
    return (
        <div className="col-lg-3 col-sm-6">
            <div className="card-image">
                <img className={styles.imageCard}
                    src={img} alt="banner" />
            </div>
        </div>
    )
}
