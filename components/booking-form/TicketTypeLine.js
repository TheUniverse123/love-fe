export default function TicketTypeLine({ title, price, quantity }) {
    // Tạo mảng các số từ 1 đến quantity
    const quantityItems = Array.from({ length: quantity }, (_, index) => index + 1);

    return (
        <div className="line-booking-tickets">
            <div className="item-ticket" style={{ justifyContent: "space-between", width: "256px" }}>
                <p className="text-md-medium neutral-500 mr-10">{title}</p>
                <p className="text-md-medium primary-color">{price}</p>
            </div>
            <div className="dropdown-quantity">
                <div className="dropdown">
                    <button className="btn dropdown-toggle" id="dropdownTicket" type="button" data-bs-toggle="dropdown" aria-expanded="false" data-bs-display="static">
                        <span className="white-color">01</span>
                        <svg style={{ stroke: "var(--bg-white-color)!important" }} width={12} height={7} viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L6 6L11 1" stroke strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-light" aria-labelledby="dropdownTicket">
                        {quantityItems.map((item, index) => (
                            <li key={item}>
                                <a className={`dropdown-item ${item === 1 ? 'active' : ''}`} href="#">
                                    {String(item).padStart(2, '0')}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
