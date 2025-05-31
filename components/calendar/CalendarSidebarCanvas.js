'use client';
import { useEffect, useState } from "react";
import styles from './Calendar.module.css';

const CalendarSidebarCanvas = ({ dataDates, background }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedHour, setSelectedHour] = useState("00");
    const [selectedMinute, setSelectedMinute] = useState("00");
    const [inputValue, setInputValue] = useState("");
    const [hoursList, setHoursList] = useState(generateTimeList("hour"));
    const [minutesList, setMinutesList] = useState(generateTimeList("minute"));

    console.log(dataDates)
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
    const days = generateCalendar(currentMonth);
    const prevMonth = () => {
        setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)));
    };
    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)));
    };
    const highlightedDays = dataDates
        ? dataDates
            .map(dateStr => new Date(dateStr))
            .filter(d => d.getFullYear() === currentMonth.getFullYear() && d.getMonth() === currentMonth.getMonth())
            .map(d => d.getDate())
        : [];

    return (
        <div className={styles.calendarContainer}>
            <div className="d-flex">
                <div className={background === "none" ? styles.calendarTransparent
                    : styles.calendarSidebarCanvas}>
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
                            {days.map((day, index) => {
                                const isSelectedDate = selectedDate && selectedDate.getDate() === day;
                                const isHighlighted = highlightedDays.includes(day);

                                return (
                                    <div
                                        className={`${styles.calendarDate} ${day ? "" : styles.empty} ${isSelectedDate || isHighlighted ? styles.selected : ""
                                            }`}
                                        key={index}
                                        onClick={() => handleDateClick(day)}
                                    >
                                        {day}
                                    </div>
                                );
                            })}
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

export default CalendarSidebarCanvas;
