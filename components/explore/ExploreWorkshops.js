'use client'

import { fetchWorkshopsExploreAll, fetchSearchWorkshops } from "@/app/api/workshop";
import { convertWorkshopApi } from "@/app/util/convert";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import ExploreBoxViewResult from "./ExploreBoxViewResult";
import ExploreWorkshopItem from "./ExploreWorkshopItem";
import styles from "./ExploreWorkshops.module.css";
import Link from "next/link";

const categoryMap = {
    art: 1,
    food: 2,
    health: 3,
    skill: 4,
    other: 5
};

export default function ExploreWorkshops({ filtersSelected }) {
    const [workshops, setWorkshops] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selected, setSelected] = useState("Mới nhất");
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen(!isOpen);
    const pageSize = 15;

    useEffect(() => {
        setPage(1);
    }, [filtersSelected]);

    const { data } = useQuery({
        queryKey: ["workshop-filtered", filtersSelected, page, selected],
        queryFn: async ({ signal }) => {
            // Kiểm tra có filter hay không
            const hasFilter =
                filtersSelected &&
                ((filtersSelected.filters && Object.keys(filtersSelected.filters).length > 0) ||
                    (filtersSelected.range && filtersSelected.range > 0) ||
                    (filtersSelected.rating && filtersSelected.rating.length > 0));

            // Lấy giá trị filter
            const districts = filtersSelected.filters?.["Vị trí"] || [];
            const categories = filtersSelected.filters?.["Thể loại"] || [];
            const categoryIds = categories.map((cat) => categoryMap[cat]).filter(Boolean);
            const maxPrice = filtersSelected.range || 0;
            const ratingFilter = filtersSelected.rating || [];

            // Hàm gọi API từng cặp (district, categoryId)
            async function fetchByDistrictCategory(district, categoryId) {
                return fetchSearchWorkshops({
                    signal,
                    pageNumber: 1,     // luôn lấy trang 1
                    pageSize: 1000,    // lấy nhiều nhất có thể để gom
                    search: {
                        district: district || "",
                        categoryId: categoryId || "",
                        maxPrice: maxPrice > 0 ? maxPrice : "",
                        // Không truyền rating vì backend có thể không hỗ trợ filter này
                    },
                });
            }

            // Nếu không có filter thì gọi API lấy phân trang thật (phân trang backend)
            if (!hasFilter) {
                return fetchWorkshopsExploreAll({ signal, pageNumber: page, pageSize });
            }

            // Nếu districts hoặc categoryIds trống thì thay bằng [""] để gọi lấy tất cả
            const districtsToUse = districts.length > 0 ? districts : [""];
            const categoryIdsToUse = categoryIds.length > 0 ? categoryIds : [""];

            // Gọi API cho tất cả tổ hợp district x category
            const promises = [];
            for (const d of districtsToUse) {
                for (const c of categoryIdsToUse) {
                    promises.push(fetchByDistrictCategory(d, c));
                }
            }

            const results = await Promise.all(promises);

            // Gom items tất cả kết quả
            let combinedItems = [];
            results.forEach((res) => {
                if (res && res.items) {
                    combinedItems = combinedItems.concat(res.items);
                }
            });

            // Loại bỏ trùng workshop theo workshopId
            const map = new Map();
            combinedItems.forEach((item) => {
                map.set(item.workshopId, item);
            });
            combinedItems = Array.from(map.values());

            // Lọc theo rating (client filter)
            if (ratingFilter.length > 0) {
                combinedItems = combinedItems.filter((item) =>
                    ratingFilter.includes(Math.floor(item.averageRating))
                );
            }

            // Lọc thêm theo maxPrice nếu backend chưa lọc
            if (maxPrice > 0) {
                combinedItems = combinedItems.filter((item) => item.price <= maxPrice);
            }

            // Sắp xếp theo selected
            if (selected === "Mới nhất") {
                combinedItems.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
            } else if (selected === "Nổi bật nhất") {
                combinedItems.sort((a, b) => b.averageRating - a.averageRating);
            }

            // Phân trang thủ công
            const totalPagesCalc = Math.ceil(combinedItems.length / pageSize);
            const startIndex = (page - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            const pagedItems = combinedItems.slice(startIndex, endIndex);

            // Trả dữ liệu theo chuẩn để set state
            return {
                items: pagedItems,
                totalPages: totalPagesCalc,
                totalCount: combinedItems.length,
                currentPage: page,
            };
        },
        keepPreviousData: true,
    });

    useEffect(() => {
        if (data) {
            setWorkshops(convertWorkshopApi(data?.items));
            setTotalPages(data?.totalPages);
            if (data?.currentPage && data.currentPage !== page) {
                setPage(data.currentPage);
            }
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [data]);

    function handleChange(num) {
        setPage(num);
    }

    function getVisiblePages(current, total) {
        const delta = 2;
        const pages = [];

        const left = Math.max(2, current - delta);
        const right = Math.min(total - 1, current + delta);

        pages.push(1);

        if (left > 2) {
            pages.push("...");
        }

        for (let i = left; i <= right; i++) {
            pages.push(i);
        }

        if (right < total - 1) {
            pages.push("...");
        }

        if (total > 1) {
            pages.push(total);
        }

        return pages;
    }

    const handleSelect = (label) => {
        setSelected(label);
    };

    return (
        <div className="content-right">
            <div className="box-filters mb-25 pb-5 border-1 border-bottom-custom">
                <div className="row align-items-center">
                    <div className="col-xl-4 col-md-4 mb-10 text-lg-start text-center">
                        <ExploreBoxViewResult numberFound={data?.totalCount} />
                    </div>
                    <div className="col-xl-8 col-md-8 mb-10 text-lg-end text-center">
                        <div className="box-item-sort">
                            <Link className="btn btn-sort" href="#">
                                <svg
                                    style={{ stroke: "white" }}
                                    width={18}
                                    height={18}
                                    viewBox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M8.25 6L5.25 3M5.25 3L2.25 6M5.25 3L5.25 15"
                                        stroke
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M9.75 12L12.75 15M12.75 15L15.75 12M12.75 15L12.75 3"
                                        stroke
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </Link>

                            <div className="item-sort border-1 border-color flex-space pt-0 pb-0 pl-15">
                                <span className="neutral-500 mr-10">Sắp xếp theo:</span>

                                {/* Custom Select */}
                                <div className={styles.customSelectContainer}>
                                    <div
                                        className={styles.customSelect}
                                        onClick={toggleDropdown}
                                    >
                                        <span className="mr-20">{selected}</span>
                                        <span className={styles.arrow}></span>
                                    </div>

                                    {isOpen && (
                                        <div className={`${styles.dropdown} border-1px`}>
                                            {["Mới nhất", "Nổi bật nhất"].map((label) => (
                                                <div
                                                    key={label}
                                                    className={styles.option}
                                                    onClick={() => handleSelect(label)}
                                                >
                                                    {label}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="box-grid-tours wow fadeIn">
                <div className="row">
                    {workshops?.map((card, index) => (
                        <ExploreWorkshopItem key={index} {...card} />
                    ))}
                </div>
            </div>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                        <Link
                            className="page-link main-third-background white-color-4"
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                if (page > 1) handleChange(page - 1);
                            }}
                            aria-label="Previous"
                        >
                            <span aria-hidden="true">
                                <svg className={styles.whiteTextsvg} width={12} height={12} viewBox="0 0 12 12">
                                    <path d="M6 1.33L1.33 6M1.33 6L6 10.67M1.33 6H10.67" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                        </Link>
                    </li>

                    {getVisiblePages(page, totalPages).map((num, idx) => (
                        <li key={idx} className="page-item">
                            {num === "..." ? (
                                <li className="page-item">
                                    <Link className="page-link main-third-background white-color-4" href="#">
                                        ...
                                    </Link>
                                </li>
                            ) : (
                                <Link
                                    href="#"
                                    className={`page-link ${page === num ? "secondary-background white-color active" : "main-third-background white-color-4"
                                        }`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleChange(num);
                                    }}
                                >
                                    {num}
                                </Link>
                            )}
                        </li>
                    ))}

                    <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
                        <Link
                            className="page-link main-third-background white-color-4"
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                if (page < totalPages) handleChange(page + 1);
                            }}
                            aria-label="Next"
                        >
                            <span aria-hidden="true">
                                <svg className={styles.whiteTextsvg} width={12} height={12} viewBox="0 0 12 12">
                                    <path d="M6 10.67L10.67 6L6 1.33M10.67 6H1.33" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}