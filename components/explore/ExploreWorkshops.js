'use client'

import styles from "./ExploreWorkshops.module.css"
import ExploreBoxViewResult from "./ExploreBoxViewResult";
import ExploreWorkshopItem from "./ExploreWorkshopItem";
import { useQuery } from "@tanstack/react-query";
import { fetchWorkshops } from "@/app/api/workshop";
import { converWorkshopApi } from "@/app/util/convert";
import { useEffect, useState } from "react";

export default function ExploreWorkshops() {
    const [workshops, setWorkshops] = useState([])
    const [page, setPage] = useState(1);

    const { data } = useQuery({
        queryKey: ['workshop-all', page],
        queryFn: ({ signal }) => fetchWorkshops({ signal, pageNumber: page, pageSize: 15 }),
    });
    
    function handleChange(num) {
        setPage(num)
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

    useEffect(() => {
        if (data?.statusCode === 200) {
            setWorkshops(converWorkshopApi(data.result));
        }
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [data]);

    return (
        <div className="content-right">
            <div className="box-filters mb-25 pb-5 border-1 border-bottom-custom">
                <div className="row align-items-center">
                    <div className="col-xl-4 col-md-4 mb-10 text-lg-start text-center">
                        <ExploreBoxViewResult numberFound={64} />
                    </div>
                    <div className="col-xl-8 col-md-8 mb-10 text-lg-end text-center">
                        <div className="box-item-sort">
                            <a className="btn btn-sort" href="#">
                                <svg style={{ stroke: "white" }} width={18} height={18} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.25 6L5.25 3M5.25 3L2.25 6M5.25 3L5.25 15" stroke strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M9.75 12L12.75 15M12.75 15L15.75 12M12.75 15L12.75 3" stroke strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>

                            <div className="item-sort border-1 border-color px-15 py-7">
                                <span className="text-xs-medium neutral-500 mr-5">Sắp xếp theo:</span>
                                <div className="dropdown dropdown-sort border-1-right">
                                    <button className={`btn dropdown-toggle ${styles.buttonArrow}`} id="dropdownSort" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <span className="white-color">Mới nhất</span>
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-light m-0" aria-labelledby="dropdownSort">
                                        <li><a className="dropdown-item active" href="#">Mới nhất</a></li>
                                        <li><a className="dropdown-item" href="#">Nổi bật nhất</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="box-grid-tours wow fadeIn">
                <div className="row">
                    {workshops.map((card, index) => (
                        <ExploreWorkshopItem key={index} {...card} />
                    ))}
                </div>
            </div>
            <nav aria-label="Page navigation example">
                <ul className="pagination">

                    <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                        <a
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
                        </a>
                    </li>

                    {getVisiblePages(page, 100).map((num, idx) => (
                        <li key={idx} className="page-item">
                            {num === "..." ? (
                                <li className="page-item">
                                    <a className="page-link main-third-background white-color-4" href="#">...</a>
                                </li>
                            ) : (
                                <a
                                    href="#"
                                    className={`page-link ${page === num ? "secondary-background white-color active" : "main-third-background white-color-4"}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleChange(num);
                                    }}
                                >
                                    {num}
                                </a>
                            )}
                        </li>
                    ))}

                    <li className={`page-item ${page === 100 ? "disabled" : ""}`}>
                        <a
                            className="page-link main-third-background white-color-4"
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                if (page < 100) handleChange(page + 1);
                            }}
                            aria-label="Next"
                        >
                            <span aria-hidden="true">
                                <svg className={styles.whiteTextsvg} width={12} height={12} viewBox="0 0 12 12">
                                    <path d="M6 10.67L10.67 6L6 1.33M10.67 6H1.33" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
