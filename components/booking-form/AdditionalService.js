
export default function AdditionalService({ title, price }) {
    return (
        <div className="line-booking-tickets mt-10">
            <div className="item-ticket flex-center">
                <ul className="list-filter-checkbox">
                    <li className="mt-0">
                        <label className="cb-container">
                            <input type="checkbox" />
                            <span className="text-sm-medium white-color">
                                {title}
                            </span>
                            <span className="checkmark border-color" />
                        </label>
                    </li>
                </ul>
            </div>
            <div className="include-price mt-0">
                <span className="white-color">{price}</span>
            </div>
        </div>
    )
}
