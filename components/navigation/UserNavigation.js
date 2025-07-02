import Link from "next/link"
import InputSearch from "../search/InputSearch"
import styles from "./UserNavigation.module.css"
import { useState, useRef, useEffect } from "react";
import { fetchWorkshops } from "@/app/api/workshop";
import { convertWorkshopApi } from "@/app/util/convert";
import ExploreWorkshopItem from "../explore/ExploreWorkshopItem";

export default function UserNavigation() {
    const [searchResults, setSearchResults] = useState([]);
    const [searching, setSearching] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const searchTimeout = useRef();
    const containerRef = useRef();
    const [allWorkshops, setAllWorkshops] = useState([]);
    const [fetched, setFetched] = useState(false);

    // Đóng kết quả khi click ra ngoài
    useEffect(() => {
        function handleClickOutside(e) {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setShowResults(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    async function handleSearch(keyword) {
        if (searchTimeout.current) clearTimeout(searchTimeout.current);
        if (!fetched) {
            setSearching(true);
            // Lấy tối đa 500 workshop, có thể điều chỉnh nếu cần
            const data = await fetchWorkshops({ pageNumber: 1, pageSize: 500 });
            setAllWorkshops(data || []);
            setFetched(true);
            setSearching(false);
        }
        if (!keyword.trim()) {
            setSearchResults([]);
            setShowResults(false);
            return;
        }
        setSearching(true);
        searchTimeout.current = setTimeout(() => {
            const keywordLower = keyword.trim().toLowerCase();
            const filtered = (allWorkshops || []).filter(item =>
                (item.title && item.title.toLowerCase().includes(keywordLower)) ||
                (item.location && item.location.toLowerCase().includes(keywordLower))
            );
            setSearchResults(convertWorkshopApi(filtered));
            setShowResults(true);
            setSearching(false);
        }, 200);
    }

    return (
        <nav className="nav-main-menu" ref={containerRef} style={{ position: 'relative' }}>
            <InputSearch onSearch={handleSearch} />
            {showResults && (
                <div className={styles.searchResultContainer}>
                    {searching ? (
                        <div style={{ color: '#fff', textAlign: 'center', padding: 16 }}>Đang tìm kiếm...</div>
                    ) : searchResults.length > 0 ? (
                        searchResults.map(item => (
                            <div key={item.workshopId} className={styles.searchResultItem} onClick={() => { window.location.href = item.link; }}>
                                <img src={item.imgSrc} alt={item.title} className={styles.searchResultImage} />
                                <div className={styles.searchResultInfo}>
                                    <div className={styles.searchResultTitle}>{item.title}</div>
                                    <div className={styles.searchResultLocation}>{item.location || ""}</div>
                                    <div className={styles.searchResultPrice}>{item.price}</div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div style={{ color: '#aaa', textAlign: 'center', padding: 16 }}>Không tìm thấy sự kiện phù hợp</div>
                    )}
                </div>
            )}
            <ul className="main-menu">
                <li><Link className={styles.colorNeutral1000} href="/">Trang chủ</Link></li>
                <li><Link className={styles.colorNeutral1000} href="/user/explore">Khám phá</Link></li>
                <li><Link className={styles.colorNeutral1000} href="/user/help-center">Trợ giúp</Link></li>
            </ul>
        </nav >
    )
}
