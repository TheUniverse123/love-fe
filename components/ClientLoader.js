"use client";

import { useEffect } from "react";

export default function ClientLoader() {
    useEffect(() => {
        const checkCSSLoading = () => {
            const links = document.querySelectorAll('link[rel="stylesheet"]');
            let isLoaded = true;

            links.forEach((link) => {
                // Kiểm tra nếu không có thuộc tính 'sheet' thì chứng tỏ chưa tải xong CSS
                if (!link.sheet) {
                    isLoaded = false;
                }
            });

            return isLoaded;
        };

        const loader = document.getElementById("loader");

        // Kiểm tra CSS đã tải và ẩn loader
        const onCSSLoad = () => {
            if (loader && checkCSSLoading()) {
                loader.style.display = "none";
            }
        };

        // Đăng ký sự kiện 'load' cho tất cả các link CSS
        const links = document.querySelectorAll('link[rel="stylesheet"]');
        links.forEach((link) => {
            link.addEventListener('load', onCSSLoad);
            link.addEventListener('error', onCSSLoad); // Xử lý khi có lỗi tải CSS
        });

        // Kiểm tra ngay lập tức nếu CSS đã tải từ trước
        if (loader && checkCSSLoading()) {
            loader.style.display = "none";
        }

        return () => {
            // Gỡ bỏ sự kiện khi component bị unmount
            links.forEach((link) => {
                link.removeEventListener('load', onCSSLoad);
                link.removeEventListener('error', onCSSLoad);
            });
        };
    }, []);

    return null;
}
