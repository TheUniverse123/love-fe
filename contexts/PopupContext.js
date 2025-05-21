'use client'

import { createContext, useContext, useState } from 'react'

const PopupContext = createContext()

export const PopupProvider = ({ children }) => {
    const [isPopupVisible, setIsPopupVisible] = useState(false)

    const openPopup = () => setIsPopupVisible(true)
    const closePopup = () => setIsPopupVisible(false)

    return (
        <PopupContext.Provider value={{ isPopupVisible, openPopup, closePopup }}>
            {children}
        </PopupContext.Provider>
    )
}

export const usePopup = () => useContext(PopupContext)