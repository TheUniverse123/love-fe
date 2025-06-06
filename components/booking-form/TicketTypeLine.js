import { useState, useRef, useEffect } from "react";
import styles from "./TicketTypeLine.module.css"; // Import module CSS
import Link from "next/link";

export default function TicketTypeLine({ title, price, quantity, onQuantityChange }) {
    const maxQuantity = quantity > 100 ? 100 : quantity;
    const quantityItems = Array.from({ length: maxQuantity }, (_, i) => i);

    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [inputValue, setInputValue] = useState("01");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Track dropdown visibility

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
        setIsDropdownOpen(false); // Close the dropdown after selection
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev); // Toggle dropdown visibility
    };

    const handleBlur = () => {
        // Close the dropdown if the input loses focus
        setTimeout(() => setIsDropdownOpen(false), 200);
    };

    return (
        <div className={styles.lineBookingTickets}>
            <div className={styles.itemTicket}>
                <p className="text-md-medium neutral-500 font-15 mr-50">{title}</p>
                <p className="text-md-medium primary-color font-15">{price}</p>
            </div>
            <div className={styles.dropdownQuantity}>
                <div className={styles.customSelectWrapper}>
                    {!isDropdownOpen && <div
                        className={`${styles.customSelectInput}`}
                        onClick={toggleDropdown} // Toggle dropdown when clicked
                        aria-label="Chọn số lượng vé"
                    >
                        <span className={`${styles.whiteColor} font-15 mr-15`}>
                            {inputValue || "01"}
                        </span>
                        <span className={styles.arrow}></span>
                    </div>}
                    {isDropdownOpen && (
                        <>
                            <div className={styles.customSelectList}>
                                {quantityItems.map((item) => (
                                    <div
                                        key={item}
                                        className={`${styles.customSelectItem} ${item === selectedQuantity ? styles.selected : ""}`}
                                        onClick={() => handleSelect(item)}
                                    >
                                        {String(item).padStart(2, "0")}
                                    </div>
                                ))}
                            </div>
                            <div className={styles.inputWrapper}>
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    maxLength={2}
                                    ref={inputRef}
                                    className={styles.inputQuantity}
                                    aria-label="Nhập số lượng vé (1-99)"
                                    placeholder="01"
                                    onBlur={handleBlur} // Close dropdown when the input loses focus
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
