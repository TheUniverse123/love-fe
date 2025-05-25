'use client'
import { useState } from "react";
import styles from "./FilterRange.module.css"

export default function FilterRange() {
    const [value, setValue] = useState(500000);
    const min = 0;
    const max = 1000000;

    const handleChange = (e) => {
        const newValue = parseInt(e.target.value);
        setValue(newValue);
        const percentage = ((newValue - min) / (max - min)) * 100;
        e.target.style.background = `linear-gradient(to right, white ${percentage}%, #444 ${percentage}%)`;
    };

    return (
        <div className="block-filter border-1">
            <h6
                className="text-lg-bold item-collapse white-color"
                style={{ cursor: "pointer" }}
            >
                Lọc theo giá
            </h6>
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

        </div>
    )
}
