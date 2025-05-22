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

            return isLoaded;
        };

        const loader = document.getElementById("loader");
        const onCSSLoad = () => {
            if (loader && checkCSSLoading()) {
                loader.style.display = "none";
            }
        };

        const links = document.querySelectorAll('link[rel="stylesheet"]');
        links.forEach((link) => {
            link.addEventListener('load', onCSSLoad);
            link.addEventListener('error', onCSSLoad);
        });

        if (loader && checkCSSLoading()) {
            setTimeout(() => loader.style.display = "none", 300);
        }
        return () => {
            links.forEach((link) => {
                link.removeEventListener('load', onCSSLoad);
                link.removeEventListener('error', onCSSLoad);
            });
        };
    }, []);

    return null;
}
