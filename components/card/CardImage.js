import styles from "./CardImage.module.css"

export default function CardImage({ img }) {
    return (
        <div className="col-lg-12 col-sm-12">
            <div className="card-image mr-25">
                <img className={styles.imageCard}
                    src={img} alt="banner" />
            </div>
        </div>
    )
}
