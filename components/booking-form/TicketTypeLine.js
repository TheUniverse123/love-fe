'use client'

import { useState, useRef, useEffect } from "react";
import styles from "./TicketTypeLine.module.css";

export default function TicketTypeLine({ title, price, quantity, onQuantityChange }) {
    const maxQuantity = quantity > 100 ? 100 : quantity;
    const quantityItems = Array.from({ length: maxQuantity }, (_, i) => i);

    const [selectedQuantity, setSelectedQuantity] = useState(0);
    const [inputValue, setInputValue] = useState("01");

    const inputRef = useRef(null);

    useEffect(() => {
        setInputValue(String(selectedQuantity).padStart(2, "0"));
    }, [selectedQuantity]);

    useEffect(() => {
        if (onQuantityChange) {
            onQuantityChange(selectedQuantity);
        }
    }, [selectedQuantity, onQuantityChange]);

    const handleInputChange = (e) => {
        let val = e.target.value;
        if (!/^\d{0,2}$/.test(val)) return;
        setInputValue(val);

        const num = parseInt(val, 10);
        if (!isNaN(num) && num >= 1 && num <= maxQuantity) {
            setSelectedQuantity(num);
        }
    };

    const handleSelect = (num) => {
        setSelectedQuantity(num);
    };
    return (
        <div className={styles.lineBookingTickets}>
            <div className={styles.itemTicket}>
                <p className="text-md-medium neutral-500 font-15">{title}</p>
                <p className="text-md-medium primary-color font-15">{price}</p>
            </div>
            <div className={styles.dropdownQuantity}>
                <div className="dropdown">
                    <button
                        className="btn dropdown-toggle flex-center"
                        id="dropdownTicket"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        data-bs-display="static"
                    >
                        <span className={`${styles.whiteColor} font-15 mr-5`}>{inputValue || "01"}</span>
                        <svg
                            className={styles.dropdownIcon}
                            width={12}
                            height={7}
                            viewBox="0 0 12 7"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M1 1L6 6L11 1"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                    <ul
                        className={`dropdown-menu dropdown-menu-light ${styles.dropdownMenu}`}
                        aria-labelledby="dropdownTicket"
                    >
                        <li className={styles.inputListItem}>
                            <input
                                type="text"
                                value={inputValue}
                                onChange={handleInputChange}
                                maxLength={2}
                                ref={inputRef}
                                className={styles.inputQuantity}
                                aria-label="Nhập số lượng vé (1-99)"
                                placeholder="01"
                            />
                        </li>

                        {quantityItems.map((item) => (
                            <li key={item}>
                                <a
                                    href="#"
                                    className={`dropdown-item ${item === selectedQuantity ? "active" : ""}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleSelect(item);
                                    }}
                                >
                                    {String(item).padStart(2, "0")}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
