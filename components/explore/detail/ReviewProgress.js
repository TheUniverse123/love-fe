export default function ReviewProgress({ title, progress, average }) {
    return (
        <div className="item-review-progress">
            <div className="text-rv-progress">
                <p className="text-sm-bold white-color">{title}</p>
            </div>
            <div className="bar-rv-progress">
                <div className="progress">
                    <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                </div>
            </div>
            <div className="text-avarage">
                <p>{average}/5</p>
            </div>
        </div>
    );
}
