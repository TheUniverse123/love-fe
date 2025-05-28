import styles from './TimePicker.module.css';  // Import CSS Module

export default function TimePicker({ time }) {
    return (
        <label className={`${styles.timePickerLabel} mb-0 flex-center`}>
            {/* <input type="radio" name="time" className={styles.timePickerInput} /> */}
            {/* <span className={styles.timePickerCircle}>
                <span className={styles.innerCircle}></span>
            </span> */}
            <span className='white-color'>{time}</span>
        </label>
    );
}
