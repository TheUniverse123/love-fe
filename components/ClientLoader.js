"use client";

import { useEffect } from "react";
export default function ClientLoader() {
    useEffect(() => {
        const checkCSSLoading = () => {
            const links = document.querySelectorAll('link[rel="stylesheet"]');
            let isLoaded = true;

            links.forEach((link) => {
                if (!link.sheet) {
                    isLoaded = false;
                }
            });
            return isLoaded
        };
        const loader = document.getElementById("loader");
        if (loader && checkCSSLoading()) {
            loader.style.display = "none";
        }
    }, []);
    
    return null;
}
