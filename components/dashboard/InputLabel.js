import React from 'react'

export default function InputLabel({ label, isRequired = true, isMarginLeft = false }) {
    return (
        <p className={`mb-15 text-md-bold white-color ${isMarginLeft ? "ml-25" : ""}`}>
            {isRequired ? <span style={{ color: "red" }}>*</span> : undefined}
            {label}
        </p>
    )
}
