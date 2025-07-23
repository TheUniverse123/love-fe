'use client'

import BoxStatisticalOverviewAdmin from "../overview-report/BoxStatisticalOverviewAdmin";
import styles from "@/components/dashboard/ReportContent.module.css"
import { useQuery } from "@tanstack/react-query";
import { fetchWorkshopTopRevenue } from "@/app/api/admin-dashboard";
import { useEffect, useState } from "react";
import { fetchListParticipants, fetchListUsers, fetchListWorkshops } from "@/app/api/admin-dashboard-detail";
import { formatDate, formatPrice } from "@/app/util/convert";
import { fetchRegisteredWorkshopsByUser } from "@/app/api/workshop";
import Link from "next/link";

export default function DetailReport() {
    const [isMediumScreen, setIsMediumScreen] = useState(false)
    const [activeTab, setActiveTab] = useState('organizer');
    const [search, setSearch] = useState('');
    const [organizerPage, setOrganizerPage] = useState(1);
    const organizerPageSize = 10;
    const [organizerPackage, setOrganizerPackage] = useState(""); // '', 'diamond', 'gold', 'silver', 'copper'
    const [organizerSearch, setOrganizerSearch] = useState("");

    // State cho filter, search, phân trang workshop
    const [workshopPage, setWorkshopPage] = useState(1);
    const workshopPageSize = 10;
    const [workshopCategory, setWorkshopCategory] = useState(""); // '' hoặc tên thể loại
    const [workshopDate, setWorkshopDate] = useState(""); // '' hoặc ngày (YYYY-MM-DD)
    const [workshopLocation, setWorkshopLocation] = useState(""); // '' hoặc địa điểm
    const [workshopOrganizer, setWorkshopOrganizer] = useState(""); // '' hoặc tên tổ chức
    const [workshopSearch, setWorkshopSearch] = useState("");

    // State cho filter, search, phân trang participant
    const [participantPage, setParticipantPage] = useState(1);
    const participantPageSize = 10;
    const [participantDate, setParticipantDate] = useState(""); // '' hoặc ngày (YYYY-MM-DD)
    const [participantSearch, setParticipantSearch] = useState("");

    // State cho expand/collapse participant workshop
    const [expandedParticipant, setExpandedParticipant] = useState(null); // userId
    const [registeredWorkshops, setRegisteredWorkshops] = useState({}); // { [userId]: [workshop, ...] }
    const [loadingWorkshops, setLoadingWorkshops] = useState({}); // { [userId]: boolean }

    useEffect(() => {
        const checkScreenSize = () => {
            const width = window.innerWidth;
            setIsMediumScreen(width >= 1400 && width <= 1600);
        };
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);
    const tableClass = isMediumScreen ? styles.tableTopRevenueMedium : styles.tableTopRevenue;
    // Tab labels
    const tabs = [
        { key: 'organizer', label: 'Tài khoản' },
        { key: 'workshop', label: 'Workshop' },
        { key: 'participant', label: 'Người tham gia' },
    ];

    const { data: listParticipants, isPending: isPendingListParticipants } = useQuery({
        queryKey: ['list-participants-data-detail'],
        queryFn: ({ signal }) => fetchListParticipants({
            signal,
            pageNumber: 1,
            pageSize: 1000,
        }),
    })

    const { data: listUsers, isPending: isPendingListUsers } = useQuery({
        queryKey: ['list-users-data-detail'],
        queryFn: ({ signal }) => fetchListUsers({
            signal,
            pageNumber: 1,
            pageSize: 1000,
        }),
    })

    const { data: listWorkshops, isPending: isPendingListWorkshops } = useQuery({
        queryKey: ['list-workshops-data-detail'],
        queryFn: ({ signal }) => fetchListWorkshops({
            signal,
            pageNumber: 1,
            pageSize: 1000,
        }),
    })

    // Thêm hàm chuyển đổi tên và màu gói dịch vụ
    const getPackageInfo = (address) => {
        if (!address) return { name: 'Đồng', color: '#D76A0B' };
        const addr = address.toLowerCase();
        if (addr.includes('kim cương') || addr.includes('diamond')) {
            return { name: 'Kim cương', color: '#007F92' };
        } else if (addr.includes('vàng') || addr.includes('gold')) {
            return { name: 'Vàng', color: '#CA8C00' };
        } else if (addr.includes('bạc') || addr.includes('silver')) {
            return { name: 'Bạc', color: '#898A8C' };
        } else {
            return { name: 'Đồng', color: '#D76A0B' };
        }
    }

    // Lọc user không phải admin
    let organizers = Array.isArray(listUsers)
        ? listUsers.filter(item => !(item.roles && item.roles.includes('Admin')))
        : [];
    // Filter theo gói dịch vụ
    if (organizerPackage) {
        organizers = organizers.filter(item => {
            const addr = (item.address || "").toLowerCase();
            if (organizerPackage === "diamond") return addr.includes("kim cương") || addr.includes("diamond");
            if (organizerPackage === "gold") return addr.includes("vàng") || addr.includes("gold");
            if (organizerPackage === "silver") return addr.includes("bạc") || addr.includes("silver");
            if (organizerPackage === "copper") return !addr.includes("kim cương") && !addr.includes("diamond") && !addr.includes("vàng") && !addr.includes("gold") && !addr.includes("bạc") && !addr.includes("silver");
            return true;
        });
    }
    // Search theo tên/email/số điện thoại
    if (organizerSearch.trim()) {
        const searchLower = organizerSearch.trim().toLowerCase();
        organizers = organizers.filter(item =>
            (item.fullName && item.fullName.toLowerCase().includes(searchLower)) ||
            (item.email && item.email.toLowerCase().includes(searchLower)) ||
            (item.phoneNumber && item.phoneNumber.toLowerCase().includes(searchLower))
        );
    }
    // Phân trang
    const totalOrganizerPages = Math.ceil(organizers.length / organizerPageSize);
    const pagedOrganizers = organizers.slice((organizerPage - 1) * organizerPageSize, organizerPage * organizerPageSize);

    // Mapping categoryId sang tên thể loại
    const categoryMap = {
        1: "Nghệ thuật & thủ công",
        2: "Ẩm thực & pha chế",
        3: "Sức khỏe",
        4: "Phát triển kỹ năng"
    };
    // Lấy danh sách categoryId duy nhất (chỉ 1-4)
    const workshopCategories = [1, 2, 3, 4];

    // Xử lý workshop
    let workshops = Array.from(listWorkshops?.items || []);
    // Filter theo categoryId
    if (workshopCategory) {
        workshops = workshops.filter(item => String(item.categoryId) === String(workshopCategory));
    }
    // Filter theo ngày
    if (workshopDate) {
        workshops = workshops.filter(item => (item.startDate || "").slice(0, 10) === workshopDate);
    }
    // Filter theo địa điểm
    if (workshopLocation) {
        workshops = workshops.filter(item => (item.location || "") === workshopLocation);
    }
    // Filter theo nhà tổ chức
    if (workshopOrganizer) {
        workshops = workshops.filter(item => (item.organizationName || "") === workshopOrganizer);
    }
    // Search theo tên workshop, tổ chức, địa điểm
    if (workshopSearch.trim()) {
        const searchLower = workshopSearch.trim().toLowerCase();
        workshops = workshops.filter(item =>
            (item.title && item.title.toLowerCase().includes(searchLower)) ||
            (item.organizationName && item.organizationName.toLowerCase().includes(searchLower)) ||
            (item.location && item.location.toLowerCase().includes(searchLower))
        );
    }
    // Phân trang
    const totalWorkshopPages = Math.ceil(workshops.length / workshopPageSize);
    const pagedWorkshops = workshops.slice((workshopPage - 1) * workshopPageSize, workshopPage * workshopPageSize);

    // Thêm lại biến workshopDates sau khi đã filter workshops
    const workshopDates = Array.from(new Set(workshops.map(w => w.startDate?.slice(0, 10)).filter(Boolean)));
    // Thêm lại biến workshopLocations sau khi đã filter workshops
    const workshopLocations = Array.from(new Set(workshops.map(w => w.location).filter(Boolean)));
    // Thêm lại biến workshopOrganizers sau khi đã filter workshops
    const workshopOrganizers = Array.from(new Set(workshops.map(w => w.organizationName).filter(Boolean)));

    // Xử lý participant
    let participants = Array.isArray(listParticipants?.items)
        ? listParticipants.items.filter(p => p.workshopCount > 0)
        : [];
    // Lấy danh sách ngày đăng ký duy nhất
    const participantDates = Array.from(new Set(participants.map(p => p.createdDate?.slice(0, 10)).filter(Boolean)));
    // Filter theo ngày đăng ký
    if (participantDate) {
        participants = participants.filter(item => (item.createdDate || '').slice(0, 10) === participantDate);
    }
    // Search theo tên, email, SĐT, ID
    if (participantSearch.trim()) {
        const searchLower = participantSearch.trim().toLowerCase();
        participants = participants.filter(item =>
            (item.fullName && item.fullName.toLowerCase().includes(searchLower)) ||
            (item.email && item.email.toLowerCase().includes(searchLower)) ||
            (item.phoneNumber && item.phoneNumber.toLowerCase().includes(searchLower)) ||
            (item.userId && item.userId.toLowerCase().includes(searchLower))
        );
    }
    // Phân trang
    const totalParticipantPages = Math.ceil(participants.length / participantPageSize);
    const pagedParticipants = participants.slice((participantPage - 1) * participantPageSize, participantPage * participantPageSize);

    // Hàm lấy các trang hiển thị (giống explore)
    function getVisiblePages(current, total) {
        const delta = 2;
        const pages = [];
        const left = Math.max(2, current - delta);
        const right = Math.min(total - 1, current + delta);
        pages.push(1);
        if (left > 2) pages.push("...");
        for (let i = left; i <= right; i++) pages.push(i);
        if (right < total - 1) pages.push("...");
        if (total > 1) pages.push(total);
        return pages;
    }

    // Hàm handle expand
    const handleExpandParticipant = async (userId) => {
        if (expandedParticipant === userId) {
            setExpandedParticipant(null);
            return;
        }
        setExpandedParticipant(userId);
        if (!registeredWorkshops[userId]) {
            setLoadingWorkshops(prev => ({ ...prev, [userId]: true }));
            const data = await fetchRegisteredWorkshopsByUser({ userId, pageNumber: 1, pageSize: 100 });
            setRegisteredWorkshops(prev => ({ ...prev, [userId]: data?.items || [] }));
            setLoadingWorkshops(prev => ({ ...prev, [userId]: false }));
        }
    };

    const formatWorkshopDateTime = (start, end) => {
        if (!start) return "N/A";

        const startDate = new Date(start);
        const startTime = `${String(startDate.getHours()).padStart(2, '0')}:${String(startDate.getMinutes()).padStart(2, '0')}`;
        const startDateStr = `${String(startDate.getDate()).padStart(2, '0')}/${String(startDate.getMonth() + 1).padStart(2, '0')}/${startDate.getFullYear()}`;

        if (!end) {
            return `${startDateStr} lúc ${startTime}`;
        }

        const endDate = new Date(end);
        const endTime = `${String(endDate.getHours()).padStart(2, '0')}:${String(endDate.getMinutes()).padStart(2, '0')}`;
        const endDateStr = `${String(endDate.getDate()).padStart(2, '0')}/${String(endDate.getMonth() + 1).padStart(2, '0')}/${endDate.getFullYear()}`;

        if (startDateStr === endDateStr) {
            return `${startDateStr}, ${startTime} - ${endTime}`;
        } else {
            return `${startTime} ${startDateStr} - ${endTime} ${endDateStr}`;
        }
    };

    return (
        <div style={{ paddingLeft: "35px", paddingTop: "20px", paddingRight: "36px" }}>
            <div className="flex-space pb-20 border-1px-bottom">
                <h4 className="white-color" style={{ fontSize: 38, fontWeight: 700 }}>Thông tin chi tiết</h4>
            </div>
            <div className="row" style={{ marginTop: 24 }}>
                <div className="col-md-12">
                    <BoxStatisticalOverviewAdmin />
                </div>
            </div>
            <div className="row mb-200">
                <div className="col-md-12">
                    <div className="section-box main-background border-1px border-radius-10 mb-25">
                        <div className="p-0">
                            <div className="panel-white">
                                <div className={styles.tabBar}>
                                    {tabs.map(tab => (
                                        <div
                                            key={tab.key}
                                            onClick={() => setActiveTab(tab.key)}
                                            className={activeTab === tab.key ? `${styles.tabItem} ${styles.tabItemActive}` : styles.tabItem}
                                            style={{
                                                color: activeTab === tab.key ? '#fff' : '#A1A1A1',
                                                borderBottom: activeTab === tab.key ? '3px solid #2EC4F1' : '3px solid transparent',
                                                fontWeight: 700,
                                                fontSize: 22,
                                                background: 'transparent',
                                            }}
                                        >
                                            {tab.label}
                                        </div>
                                    ))}
                                </div>
                                <div className={styles.filterRow}>
                                    {activeTab === 'organizer' && (
                                        <>
                                            <div className={`d-flex ${styles['detail-filterRow']}`} style={{ gap: 12 }}>
                                                <select className={styles.filterSelect} value={organizerPackage} onChange={e => { setOrganizerPackage(e.target.value); setOrganizerPage(1); }}>
                                                    <option value="">Chọn gói dịch vụ</option>
                                                    <option value="diamond">Kim cương</option>
                                                    <option value="gold">Vàng</option>
                                                    <option value="silver">Bạc</option>
                                                    <option value="copper">Đồng</option>
                                                </select>
                                                <button className={styles['detail-filterIconBtn']}>
                                                    <img src="/assets/icon/filter-icon.svg" alt="filter" width={22} height={22} />
                                                </button>
                                            </div>
                                            <div className={styles.searchBox}>
                                                <input
                                                    type="text"
                                                    value={organizerSearch}
                                                    onChange={e => { setOrganizerSearch(e.target.value); setOrganizerPage(1); }}
                                                    placeholder="Tìm kiếm tên, SĐT"
                                                />
                                                <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="9" r="8" stroke="#A1A1A1" strokeWidth="2" /><path d="M15 15L18 18" stroke="#A1A1A1" strokeWidth="2" strokeLinecap="round" /></svg>
                                            </div>
                                        </>
                                    )}
                                    {activeTab === 'workshop' && (
                                        <>
                                            <select className={styles.filterSelect} value={workshopCategory} onChange={e => { setWorkshopCategory(e.target.value); setWorkshopPage(1); }}>
                                                <option value="">Chọn thể loại</option>
                                                {workshopCategories.map(id => (
                                                    <option key={id} value={id}>{categoryMap[id]}</option>
                                                ))}
                                            </select>
                                            <select className={styles.filterSelect} value={workshopDate} onChange={e => { setWorkshopDate(e.target.value); setWorkshopPage(1); }}>
                                                <option value="">Tất cả ngày</option>
                                                {workshopDates.map(date => (
                                                    <option key={date} value={date}>{date}</option>
                                                ))}
                                            </select>
                                            <select className={styles.filterSelect} value={workshopLocation} onChange={e => { setWorkshopLocation(e.target.value); setWorkshopPage(1); }}>
                                                <option value="">Địa điểm</option>
                                                {workshopLocations.map(loc => (
                                                    <option key={loc} value={loc}>{loc}</option>
                                                ))}
                                            </select>
                                            <select className={styles.filterSelect} value={workshopOrganizer} onChange={e => { setWorkshopOrganizer(e.target.value); setWorkshopPage(1); }}>
                                                <option value="">Nhà tổ chức</option>
                                                {workshopOrganizers.map(org => (
                                                    <option key={org} value={org}>{org}</option>
                                                ))}
                                            </select>
                                            <button className={styles['detail-filterIconBtn']}>
                                                <img src="/assets/icon/filter-icon.svg" alt="filter" width={22} height={22} />
                                            </button>
                                            <div className={styles.searchBox}>
                                                <input
                                                    type="text"
                                                    value={workshopSearch}
                                                    onChange={e => { setWorkshopSearch(e.target.value); setWorkshopPage(1); }}
                                                    placeholder="Tìm kiếm tên, tổ chức, địa điểm"
                                                />
                                                <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="9" r="8" stroke="#A1A1A1" strokeWidth="2" /><path d="M15 15L18 18" stroke="#A1A1A1" strokeWidth="2" strokeLinecap="round" /></svg>
                                            </div>
                                        </>
                                    )}
                                    {activeTab === 'participant' && (
                                        <>
                                            <div className={`d-flex ${styles['detail-filterRow']}`} style={{ gap: 12 }}>
                                                <select className={styles.filterSelect} value={participantDate} onChange={e => { setParticipantDate(e.target.value); setParticipantPage(1); }}>
                                                    <option value="">Tất cả ngày đăng ký</option>
                                                    {participantDates.map(date => (
                                                        <option key={date} value={date}>{date}</option>
                                                    ))}
                                                </select>
                                                <button className={styles['detail-filterIconBtn']}>
                                                    <img src="/assets/icon/filter-icon.svg" alt="filter" width={22} height={22} />
                                                </button>
                                            </div>
                                            <div className={styles.searchBox}>
                                                <input
                                                    type="text"
                                                    value={participantSearch}
                                                    onChange={e => { setParticipantSearch(e.target.value); setParticipantPage(1); }}
                                                    placeholder="Tìm kiếm tên, SĐT, ID"
                                                />
                                                <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="9" r="8" stroke="#A1A1A1" strokeWidth="2" /><path d="M15 15L18 18" stroke="#A1A1A1" strokeWidth="2" strokeLinecap="round" /></svg>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className={`panel-body ${styles.panelBody}`}>
                                    <div className="table-background border-1px p-15 border-radius-10">
                                        <table className={`${tableClass} ${styles['detail-table']} table-background border-1px`}>
                                            <thead>
                                                <tr>
                                                    {activeTab === 'organizer' && (
                                                        <>
                                                            <th className={`${styles.rank} ${styles['detail-tableHeader']} ${styles['detail-colIndex']}`}>#</th>
                                                            <th className={`${styles.organizer} ${styles['detail-tableHeader']}`}>Nhà tổ chức</th>
                                                            <th className={styles['detail-tableHeader']}>Thông tin liên hệ</th>
                                                            <th className={styles['detail-tableHeader']}>Ngày tạo tài khoản</th>
                                                            <th className={styles['detail-tableHeader']}>Gói dịch vụ</th>
                                                        </>
                                                    )}
                                                    {activeTab === 'workshop' && (
                                                        <>
                                                            <th className={`${styles['detail-tableHeader']} ${styles['detail-colIndex']}`}>#</th>
                                                            <th className={styles['detail-tableHeader']}>Tên Workshop</th>
                                                            <th className={styles['detail-tableHeader']}>Thể loại</th>
                                                            <th className={styles['detail-tableHeader']}>Địa điểm</th>
                                                            <th className={styles['detail-tableHeader']}>Nhà tổ chức</th>
                                                            <th className={styles['detail-tableHeader']}>Thời gian diễn ra</th>
                                                            <th className={styles['detail-tableHeader']}>Doanh thu (VNĐ)</th>
                                                        </>
                                                    )}
                                                    {activeTab === 'participant' && (
                                                        <>
                                                            <th className={`${styles['detail-tableHeader']} ${styles['detail-colId']}`}>ID</th>
                                                            <th className={styles['detail-tableHeader']}>Họ và tên</th>
                                                            <th className={styles['detail-tableHeader']}>Số điện thoại</th>
                                                            <th className={styles['detail-tableHeader']}>Ngày đăng ký</th>
                                                            <th className={styles['detail-tableHeader']}>Số workshop</th>
                                                            <th className={styles['detail-tableHeader']}>Trạng thái</th>
                                                        </>
                                                    )}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {activeTab === 'organizer' && (
                                                    isPendingListUsers ? (
                                                        <tr><td colSpan={5} style={{ textAlign: 'center' }}>Đang tải dữ liệu...</td></tr>
                                                    ) : (
                                                        pagedOrganizers.map((item, idx) => (
                                                            <tr key={item.id}>
                                                                <td className={`${styles.rank} ${styles['detail-tableCell']} ${styles['detail-colIndex']}`}>{(organizerPage - 1) * organizerPageSize + idx + 1}</td>
                                                                <td className={`${styles.organizer} ${styles['detail-tableCell']} ${styles['detail-cellName']}`}>
                                                                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                                                        <img
                                                                            className={styles.image}
                                                                            src={item.avatarUrl || "/assets/icon/user.svg"}
                                                                            alt="icon"
                                                                        />
                                                                        <div>
                                                                            <div className={styles.organizerName} style={{ fontWeight: 600, color: '#fff' }}>{item.fullName}</div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className={`${styles['detail-tableCell']} ${styles['detail-cellEmail']}`}>
                                                                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                                                                        <span>
                                                                            <svg className={styles['detail-contactIcon']} width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Z" stroke="#6674FF" strokeWidth="1.5" /><path d="M2.5 4.5 8 9l5.5-4.5" stroke="#6674FF" strokeWidth="1.5" /></svg>
                                                                            {item.email}
                                                                        </span>
                                                                        <span>
                                                                            <svg className={styles['detail-contactIcon']} width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="4" width="12" height="8" rx="2" stroke="#6674FF" strokeWidth="1.5" /><path d="M4 8h8" stroke="#6674FF" strokeWidth="1.5" /></svg>
                                                                            {item.phoneNumber || "N/A"}
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                                <td className={`${styles['detail-tableCell']} ${styles['detail-cellAddress']}`}>{formatDate(item.createdDate)}</td>
                                                                <td className={styles['detail-tableCell']}>
                                                                    {(() => {
                                                                        const pkg = getPackageInfo(item.address);
                                                                        return (
                                                                            <button className={styles['detail-serviceButton']} style={{ background: pkg.color, color: '#fff' }}>{pkg.name}</button>
                                                                        );
                                                                    })()}
                                                                </td>
                                                            </tr>
                                                        ))
                                                    )
                                                )}
                                                {activeTab === 'workshop' && (
                                                    isPendingListWorkshops ? (
                                                        <tr><td colSpan={7} style={{ textAlign: 'center' }}>Đang tải dữ liệu...</td></tr>
                                                    ) : (
                                                        pagedWorkshops.map((item, idx) => (
                                                            <tr key={item.workshopId}>
                                                                <td className={`${styles['detail-tableCell']} ${styles['detail-colIndex']}`}>{(workshopPage - 1) * workshopPageSize + idx + 1}</td>
                                                                <td className={`${styles['detail-tableCell']} ${styles['detail-cellWorkshop']}`}>{item.title}</td>
                                                                <td className={`${styles['detail-tableCell']} ${styles['detail-cellType']}`}>{categoryMap[item.categoryId] || ''}</td>
                                                                <td className={`${styles['detail-tableCell']} ${styles['detail-cellAddress']}`}>{item.location}</td>
                                                                <td className={`${styles['detail-tableCell']} ${styles['detail-cellName']}`}>{item.organizationName}</td>
                                                                <td className={`${styles['detail-tableCell']} ${styles['detail-cellDate']}`}>{formatWorkshopDateTime(item.startDate, item.endDate)}</td>
                                                                <td className={`${styles['detail-tableCell']} ${styles['detail-cellDate']} font-15`} style={{ fontWeight: 600 }}>{formatPrice(item.totalPriceWorkshop)}</td>
                                                            </tr>
                                                        ))
                                                    )
                                                )}
                                                {activeTab === 'participant' && (
                                                    isPendingListParticipants ? (
                                                        <tr><td colSpan={8} style={{ textAlign: 'center' }}>Đang tải dữ liệu...</td></tr>
                                                    ) : (
                                                        pagedParticipants.flatMap((item, idx) => [
                                                            <tr key={item.userId}>
                                                                <td className={`${styles['detail-tableCell']} ${styles['detail-colId']}`}>{item.userId}</td>
                                                                <td className={`${styles['detail-tableCell']} ${styles['detail-cellName']}`}>{item.fullName}</td>
                                                                <td className={styles['detail-tableCell']}>{item.phoneNumber || "N/A"}</td>
                                                                <td className={`${styles['detail-tableCell']} ${styles['detail-cellDate']}`}>{item.createdDate?.slice(0, 10)}</td>
                                                                <td className={styles['detail-tableCell']}
                                                                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
                                                                    onClick={() => handleExpandParticipant(item.userId)}
                                                                >
                                                                    {item.workshopCount?.toString().padStart(2, '0')}
                                                                    <svg
                                                                        width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"
                                                                        style={{ transform: expandedParticipant === item.userId ? 'rotate(180deg)' : 'rotate(0deg)', transition: '0.2s' }}
                                                                    >
                                                                        <path d="M6 9L11 14L16 9" stroke="#A1A1A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                    </svg>
                                                                </td>
                                                                <td className={`${styles['detail-tableCell']} ${styles['detail-cellStatus']}`}>{item.isActive ? "Đang hoạt động" : "Ngưng hoạt động"}</td>
                                                            </tr>,
                                                            expandedParticipant === item.userId && (
                                                                <tr key={item.userId + '-expand'}>
                                                                    <td colSpan={8} style={{ background: '#232323', padding: 0 }}>
                                                                        {loadingWorkshops[item.userId] ? (
                                                                            <div style={{ padding: 16, textAlign: 'center' }}>Đang tải workshop...</div>
                                                                        ) : (
                                                                            (registeredWorkshops[item.userId]?.length > 0 ? (
                                                                                <table style={{ width: '100%', background: 'transparent', color: '#fff', margin: 0 }}>
                                                                                    <thead>
                                                                                        <tr>
                                                                                            <th style={{ textAlign: 'left', padding: 8 }} className={styles.detailTableHeaderBold}>Tên workshop</th>
                                                                                            <th style={{ textAlign: 'left', padding: 8 }} className={styles.detailTableHeaderBold}>Thể loại</th>
                                                                                            <th style={{ textAlign: 'left', padding: 8 }}>Địa điểm</th>
                                                                                            <th style={{ textAlign: 'left', padding: 8 }}>Nhà tổ chức</th>
                                                                                            <th style={{ textAlign: 'left', padding: 8 }}>Thời gian diễn ra</th>
                                                                                            <th style={{ textAlign: 'left', padding: 8 }}>Giá</th>
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody>
                                                                                        {registeredWorkshops[item.userId].map((w, widx) => (
                                                                                            <tr key={w.workshopId || widx} style={{ background: 'transparent' }}>
                                                                                                <td style={{ padding: 8 }}><span style={{ fontWeight: 700 }}>{w.title}</span></td>
                                                                                                <td style={{ padding: 8 }}><span style={{ fontWeight: 700 }}>{w.categoryName}</span></td>
                                                                                                <td style={{ padding: 8 }}>{w.location}</td>
                                                                                                <td style={{ padding: 8 }}>{w.organizationName}</td>
                                                                                                <td style={{ padding: 8 }}>{formatWorkshopDateTime(w.startDate, w.endDate)}</td>
                                                                                                <td style={{ padding: 8 }}>{formatPrice(w.price)}</td>
                                                                                            </tr>
                                                                                        ))}
                                                                                    </tbody>
                                                                                </table>
                                                                            ) : (
                                                                                <div style={{ padding: 16, textAlign: 'center', color: '#aaa' }}>Không có workshop nào</div>
                                                                            ))
                                                                        )}
                                                                    </td>
                                                                </tr>
                                                            )
                                                        ])
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                        {activeTab === 'organizer' && totalOrganizerPages > 1 && (
                                            <nav aria-label="Page navigation example" style={{ marginTop: 24 }}>
                                                <ul className="pagination">
                                                    <li className={`page-item ${organizerPage === 1 ? "disabled" : ""}`}>
                                                        <a
                                                            className="page-link main-third-background white-color-4"
                                                            href="#"
                                                            onClick={e => { e.preventDefault(); if (organizerPage > 1) setOrganizerPage(organizerPage - 1); }}
                                                            aria-label="Previous"
                                                        >
                                                            <span aria-hidden="true">&lt;</span>
                                                        </a>
                                                    </li>
                                                    {getVisiblePages(organizerPage, totalOrganizerPages).map((num, idx) => (
                                                        <li key={idx} className="page-item">
                                                            {num === "..." ? (
                                                                <Link href="#" className="page-link main-third-background white-color-4">...</Link>
                                                            ) : (
                                                                <a
                                                                    href="#"
                                                                    className={`page-link ${organizerPage === num ? "secondary-background white-color active" : "main-third-background white-color-4"}`}
                                                                    onClick={e => { e.preventDefault(); setOrganizerPage(num); }}
                                                                >
                                                                    {num}
                                                                </a>
                                                            )}
                                                        </li>
                                                    ))}
                                                    <li className={`page-item ${organizerPage === totalOrganizerPages ? "disabled" : ""}`}>
                                                        <a
                                                            className="page-link main-third-background white-color-4"
                                                            href="#"
                                                            onClick={e => { e.preventDefault(); if (organizerPage < totalOrganizerPages) setOrganizerPage(organizerPage + 1); }}
                                                            aria-label="Next"
                                                        >
                                                            <span aria-hidden="true">&gt;</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </nav>
                                        )}
                                        {activeTab === 'workshop' && totalWorkshopPages > 1 && (
                                            <nav aria-label="Page navigation example" style={{ marginTop: 24 }}>
                                                <ul className="pagination">
                                                    <li className={`page-item ${workshopPage === 1 ? "disabled" : ""}`}>
                                                        <a
                                                            className="page-link main-third-background white-color-4"
                                                            href="#"
                                                            onClick={e => { e.preventDefault(); if (workshopPage > 1) setWorkshopPage(workshopPage - 1); }}
                                                            aria-label="Previous"
                                                        >
                                                            <span aria-hidden="true">&lt;</span>
                                                        </a>
                                                    </li>
                                                    {getVisiblePages(workshopPage, totalWorkshopPages).map((num, idx) => (
                                                        <li key={idx} className="page-item">
                                                            {num === "..." ? (
                                                                <Link href="#" className="page-link main-third-background white-color-4">...</Link>
                                                            ) : (
                                                                <a
                                                                    href="#"
                                                                    className={`page-link ${workshopPage === num ? "secondary-background white-color active" : "main-third-background white-color-4"}`}
                                                                    onClick={e => { e.preventDefault(); setWorkshopPage(num); }}
                                                                >
                                                                    {num}
                                                                </a>
                                                            )}
                                                        </li>
                                                    ))}
                                                    <li className={`page-item ${workshopPage === totalWorkshopPages ? "disabled" : ""}`}>
                                                        <a
                                                            className="page-link main-third-background white-color-4"
                                                            href="#"
                                                            onClick={e => { e.preventDefault(); if (workshopPage < totalWorkshopPages) setWorkshopPage(workshopPage + 1); }}
                                                            aria-label="Next"
                                                        >
                                                            <span aria-hidden="true">&gt;</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </nav>
                                        )}
                                        {activeTab === 'participant' && totalParticipantPages > 1 && (
                                            <nav aria-label="Page navigation example" style={{ marginTop: 24 }}>
                                                <ul className="pagination">
                                                    <li className={`page-item ${participantPage === 1 ? "disabled" : ""}`}>
                                                        <a
                                                            className="page-link main-third-background white-color-4"
                                                            href="#"
                                                            onClick={e => { e.preventDefault(); if (participantPage > 1) setParticipantPage(participantPage - 1); }}
                                                            aria-label="Previous"
                                                        >
                                                            <span aria-hidden="true">&lt;</span>
                                                        </a>
                                                    </li>
                                                    {getVisiblePages(participantPage, totalParticipantPages).map((num, idx) => (
                                                        <li key={idx} className="page-item">
                                                            {num === "..." ? (
                                                                <Link href="#" className="page-link main-third-background white-color-4">...</Link>
                                                            ) : (
                                                                <a
                                                                    href="#"
                                                                    className={`page-link ${participantPage === num ? "secondary-background white-color active" : "main-third-background white-color-4"}`}
                                                                    onClick={e => { e.preventDefault(); setParticipantPage(num); }}
                                                                >
                                                                    {num}
                                                                </a>
                                                            )}
                                                        </li>
                                                    ))}
                                                    <li className={`page-item ${participantPage === totalParticipantPages ? "disabled" : ""}`}>
                                                        <a
                                                            className="page-link main-third-background white-color-4"
                                                            href="#"
                                                            onClick={e => { e.preventDefault(); if (participantPage < totalParticipantPages) setParticipantPage(participantPage + 1); }}
                                                            aria-label="Next"
                                                        >
                                                            <span aria-hidden="true">&gt;</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </nav>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}