import styles from './TimePicker.module.css';  // Import CSS Module

export default function TimePicker({ time }) {
    return (
        <label className={`${styles.timePickerLabel} mb-0 flex-center`}>
            <span className='white-color'>{time}</span>
        </label>
    );
}
