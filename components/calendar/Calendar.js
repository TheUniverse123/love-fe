'use client';
import { useState, useEffect } from "react";
import styles from './Calendar.module.css';

const Calendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedHour, setSelectedHour] = useState("00");
    const [selectedMinute, setSelectedMinute] = useState("00");
    const [inputValue, setInputValue] = useState("");
    const [hoursList, setHoursList] = useState(generateTimeList("hour"));
    const [minutesList, setMinutesList] = useState(generateTimeList("minute"));

    useEffect(() => {
        setInputValue("Chọn ngày, giờ");
    }, [selectedHour, selectedMinute]);

    const generateCalendar = (month) => {
        const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
        const firstDayOfMonth = new Date(month.getFullYear(), month.getMonth(), 1).getDay();
        let days = [];

        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(null);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            days.push(day);
        }

        return days;
    };

    const handleDateClick = (day) => {
        if (day) {
            setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
        }
    };

    const handleSave = () => {
        // Nếu không chọn ngày, giờ hoặc phút, lấy giá trị mặc định là hiện tại
        const dateToSave = selectedDate || new Date();
        const hourToSave = selectedHour || dateToSave.getHours();
        const minuteToSave = selectedMinute || dateToSave.getMinutes();

        const dateString = `${dateToSave.toLocaleDateString()} ${hourToSave}:${minuteToSave}`;
        setInputValue(dateString);
    };

    const days = generateCalendar(currentMonth);

    const prevMonth = () => {
        setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)));
    };

    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)));
    };

    return (
        <div className={styles.calendarContainer}>
            {/* Thanh input */}
            <div className={`${styles.inputContainer} col-md-12 w-100 main-fourth-background border-radius-25`}>
                <input
                    type="text"
                    value={inputValue}
                    placeholder="Chọn ngày, giờ"
                    className={styles.inputField}
                    readOnly
                />
                <img src="/assets/icon/arrow-down-dashboard.svg" />
            </div>

            <div className="d-flex">
                <div className={styles.calendar}>
                    <div className={`${styles.calendarHeader} mb-30`}>
                        <button onClick={prevMonth}>
                            <img src="/assets/icon/arrows-left.svg" />
                        </button>
                        <span className="grey-color-text text-xl-bold">{currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}</span>
                        <button onClick={nextMonth}>
                            <img src="/assets/icon/arrows-right.svg" />
                        </button>
                    </div>

                    <div className={styles.calendarBody}>
                        <div className={styles.calendarDays}>
                            {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((day) => (
                                <div className={styles.calendarDay} key={day}>{day}</div>
                            ))}
                        </div>
                        <div className={styles.calendarDates}>
                            {days.map((day, index) => (
                                <div
                                    className={`${styles.calendarDate} ${day ? "" : styles.empty} ${selectedDate && selectedDate.getDate() === day ? styles.selected : ""}`}
                                    key={index}
                                    onClick={() => handleDateClick(day)}
                                >
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Nút lưu */}
                        <div className={styles.saveButton}>
                            <button onClick={handleSave} className={`${styles.saveBtn} flex-center`}>
                                <span className="text-md-bold mr-10">Lưu</span>
                                <img src="/assets/icon/tick.svg" alt="Save" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Cuộn giờ và phút */}
                <div className={styles.timePicker}>
                    <div className={styles.timeColumn}>
                        <div className={styles.scrollableList}>
                            {hoursList.map((hour) => (
                                <div
                                    key={hour}
                                    className={`${styles.timeItem} ${selectedHour === hour ? styles.selectedTime : ""}`}
                                    onClick={() => setSelectedHour(hour)}
                                >
                                    {hour}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.timeColumn}>
                        <div className={styles.scrollableList}>
                            {minutesList.map((minute) => (
                                <div
                                    key={minute}
                                    className={`${styles.timeItem} ${selectedMinute === minute ? styles.selectedTime : ""}`}
                                    onClick={() => setSelectedMinute(minute)}
                                >
                                    {minute}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Tạo danh sách giờ hoặc phút
function generateTimeList(type) {
    const list = [];
    if (type === "hour") {
        for (let i = 0; i < 24; i++) {
            list.push(String(i).padStart(2, "0"));
        }
    } else if (type === "minute") {
        for (let i = 0; i < 60; i++) {
            list.push(String(i).padStart(2, "0"));
        }
    }
    return list;
}

export default Calendar;
