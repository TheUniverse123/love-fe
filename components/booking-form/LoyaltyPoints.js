'use client'

import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import styles from './LoyaltyPoints.module.css';

export default function LoyaltyPoints({ totalPrice, onPointsChange, userPoints = 0 }) {
    const [usePoints, setUsePoints] = useState(false);
    const [pointsToUse, setPointsToUse] = useState(0);
    const [maxPointsAllowed, setMaxPointsAllowed] = useState(0);
    const [pointOptions, setPointOptions] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Tính toán điểm tối đa có thể sử dụng
    useEffect(() => {
        if (totalPrice >= 5000) {
            const maxDiscount = Math.floor(totalPrice * 0.2); // 20% của hóa đơn
            const maxPointsByDiscount = maxDiscount; // 1 điểm = 1k VND
            const maxPointsByUser = userPoints; // Số điểm user có (point.totalPoints)
            const maxPoints = Math.min(maxPointsByDiscount, maxPointsByUser);
            setMaxPointsAllowed(maxPoints);
            
            // Tạo options cho select với khoảng cách 5 điểm
            const options = [];
            for (let i = 0; i <= maxPoints; i += 5) {
                if (i === 0) {
                    options.push({ value: 0, label: '0 điểm' });
                } else {
                    options.push({ 
                        value: i, 
                        label: `${i} điểm (-${(i * 1000).toLocaleString('vi-VN')}đ)` 
                    });
                }
            }
            setPointOptions(options);
        } else {
            setMaxPointsAllowed(0);
            setPointOptions([]);
        }
    }, [totalPrice, userPoints]);

    // Reset points khi tắt tính năng
    useEffect(() => {
        if (!usePoints) {
            setPointsToUse(0);
            onPointsChange(0);
        }
    }, [usePoints, onPointsChange]);

    // Cập nhật điểm sử dụng khi thay đổi
    useEffect(() => {
        if (usePoints && pointsToUse > 0) {
            onPointsChange(pointsToUse);
        }
    }, [pointsToUse, usePoints, onPointsChange]);

    // Validation function
    const validatePointsUsage = (points) => {
        if (points < 0) {
            toast.error("Số điểm không được âm");
            return false;
        }
        if (points > userPoints) {
            toast.error(`Bạn chỉ có ${userPoints} điểm, không thể sử dụng ${points} điểm`);
            return false;
        }
        if (points * 1000 > totalPrice * 0.2) {
            toast.error(`Không được giảm quá 20% hóa đơn (tối đa ${Math.floor(totalPrice * 0.2).toLocaleString('vi-VN')}đ)`);
            return false;
        }
        return true;
    };

    const handleSelect = (value) => {
        if (validatePointsUsage(value)) {
            setPointsToUse(value);
            onPointsChange(value);
        }
        setIsDropdownOpen(false);
    };

    const toggleDropdown = () => {
        if (usePoints) {
            setIsDropdownOpen(prev => !prev);
        }
    };

    const handleBlur = () => {
        setTimeout(() => setIsDropdownOpen(false), 200);
    };

    const getSelectedLabel = () => {
        const selected = pointOptions.find(option => option.value === pointsToUse);
        return selected ? selected.label : '0 điểm';
    };

    const formatPriceVN = (price) => {
        return price.toLocaleString("vi-VN") + " đ";
    };

    if (totalPrice < 5000) {
        return (
            <div className="line-booking-tickets mt-10">
                <div className="item-ticket flex-center">
                    <ul className="list-filter-checkbox">
                        <li className="mt-0">
                            <label className="cb-container">
                                <input
                                    type="checkbox"
                                    disabled
                                    checked={false}
                                />
                                <span className="text-sm-medium font-12 white-color">
                                    Sử dụng điểm tích lũy (Hóa đơn phải trên 5.000đ)
                                </span>
                                <span className="checkmark border-color font-12" />
                            </label>
                        </li>
                    </ul>
                </div>
                <div className="include-price mt-0">
                    <span className="white-color">-</span>
                </div>
            </div>
        );
    }

    return (
        <div className="line-booking-tickets mt-10">
            <div className="item-ticket flex-center">
                <ul className="list-filter-checkbox">
                    <li className="mt-0">
                        <label className="cb-container">
                            <input
                                type="checkbox"
                                checked={usePoints}
                                onChange={(e) => setUsePoints(e.target.checked)}
                            />
                            <span className="text-sm-medium font-12 white-color">
                                Sử dụng điểm tích lũy
                            </span>
                            <span className="checkmark border-color font-12" />
                        </label>
                    </li>
                </ul>
            </div>
            
            <div className="include-price mt-0">
                {usePoints ? (
                    <div className={styles.pointsSelectContainer}>
                        <div className={styles.customSelectWrapper} ref={dropdownRef}>
                            <div
                                className={styles.customSelectInput}
                                onClick={toggleDropdown}
                                onBlur={handleBlur}
                            >
                                <span className={styles.whiteColor}>
                                    {getSelectedLabel()}
                                </span>
                                <span className={styles.arrow}></span>
                            </div>
                            {isDropdownOpen && (
                                <div className={styles.customSelectList}>
                                    {pointOptions.map((option) => (
                                        <div
                                            key={option.value}
                                            className={`${styles.customSelectItem} ${option.value === pointsToUse ? styles.selected : ""}`}
                                            onClick={() => handleSelect(option.value)}
                                        >
                                            {option.label}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className={styles.pointsInfo}>
                            <span className="white-color font-10">
                                Tối đa: {maxPointsAllowed} điểm (có {userPoints} điểm)
                            </span>
                        </div>
                    </div>
                ) : (
                    <span className="white-color">-</span>
                )}
            </div>
        </div>
    );
} 