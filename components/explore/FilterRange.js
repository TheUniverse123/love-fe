'use client'
import { useState } from "react";
import styles from "./FilterRange.module.css";
import { getUserInfo } from "@/app/util/auth";

const userInfo = getUserInfo()
export default function FilterRange({ selectedRange, onChange }) {
    const min = 0;
    const max = 1000000;

    // State quản lý việc collapse
    const [isOpen, setIsOpen] = useState(true);

    // Nếu selectedRange không có, fallback về min
    const value = selectedRange ?? min;

    const handleChange = (e) => {
        const newValue = parseInt(e.target.value);
        if (onChange) onChange(newValue);

        const percentage = ((newValue - min) / (max - min)) * 100;
        e.target.style.background = `linear-gradient(to right, white ${percentage}%, #444 ${percentage}%)`;
    };

    // Hàm toggle collapse
    const toggleCollapse = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <div className="block-filter border-1">
            <h6
                className="text-lg-bold item-collapse white-color"
                style={{ cursor: "pointer" }}
                onClick={toggleCollapse}
            >
                Lọc theo giá
            </h6>

            {/* Ẩn/hiện phần nội dung theo state isOpen */}
            {isOpen && (
                <div className="box-collapse scrollFilter">
                    <div className={styles.container}>
                        <div className={`${styles.sliderWrapper}`}>
                            <div className={styles.valueLabel}>
                                {value.toLocaleString('vi-VN')}đ
                            </div>
                            <input
                                type="range"
                                min={min}
                                max={max}
                                step={1000}
                                value={value}
                                onChange={handleChange}
                                className={styles.rangeInput}
                            />
                            <div className={styles.rangeLabels}>
                                <span>0</span>
                                <span>{max.toLocaleString('vi-VN')}Đ</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
