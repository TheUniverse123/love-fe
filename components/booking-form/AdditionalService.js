export default function AdditionalService({ title, price, checked, onToggle }) {
    return (
        <div className="line-booking-tickets mt-10">
            <div className="item-ticket flex-center">
                <ul className="list-filter-checkbox">
                    <li className="mt-0">
                        <label className="cb-container">
                            <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => onToggle(title, price)}
                            />
                            <span className="text-sm-medium font-12 white-color">{title}</span>
                            <span className="checkmark border-color font-12" />
                        </label>
                    </li>
                </ul>
            </div>
            <div className="include-price mt-0">
                <span className="white-color">{price}</span>
            </div>
        </div>
    );
}
