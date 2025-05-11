import React from 'react'
import styles from "./Button.module.css"
export default function Button({ text, link = "#", icon, color = "primary",
    textColor = "white", size = "normal", isSignIn = false, ...props }) {
    let sizeClass = styles.btnNormal
    if (size === "small") {
        sizeClass = styles.btnSmall
    } else if (size === "large") {
        sizeClass = styles.btnLarge
    }

    let colorClass = styles.colorPrimary

    if (color === "dark") {
        colorClass = styles.colorDark
    } else if (color === "grey") {
        colorClass = styles.colorGrey
    } else if (color === "primary2") {
        colorClass = styles.colorPrimary2
    } else if (color === "white") {
        colorClass = styles.colorWhite
    } else if (color === "secondary") {
        colorClass = styles.colorSecondary
    }

    let textColorClass = styles.textWhite
    if (textColor === "dark") {
        textColorClass === styles.textColorDark
    }

    return (
        <>
            <a
                className={`btn btn-default ${isSignIn ? 'btn-signin' : ''} ${styles.button} ${sizeClass} ${colorClass} ${textColorClass}`}
                href={link} {...props}>
                {text} {icon}
            </a>
        </>
    )
}