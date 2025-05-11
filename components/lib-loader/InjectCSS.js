'use client';
import { useEffect } from "react";
const InjectCSS = ({ url }) => {
    useEffect(() => {
        const link = document.createElement("style");
        link.type = "text/css";
        link.innerHTML = `@import url('${url}');`;
        document.head.appendChild(link);

        return () => {
            document.head.removeChild(link);
        };
    }, [url]);
    return null;
};

export default InjectCSS;