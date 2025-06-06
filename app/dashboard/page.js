'use client'

import MyTicket from "@/components/dashboard/MyTicket";
import InputSearch from "@/components/search/InputSearch";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { fetchOrderedTickets } from "../api/manage-workshop";
import { getUserInfo } from "../util/auth";
import { formatDateRange } from "../util/convert";
import styles from "./BookedTicketPage.module.css";
import Link from "next/link";

const PAGE_SIZE = 3;
const userInfo = getUserInfo();

export default function BookedTicketPage() {
  const [selectedTabTop, setSelectedTabTop] = useState("all");
  const [selectedTabBottom, setSelectedTabBottom] = useState("upcoming");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: orderTickets } = useQuery({
    queryKey: ["ordered-tickets"],
    queryFn: ({ signal }) =>
      fetchOrderedTickets({
        signal,
        pageNumber: 1,
        pageSize: 1000,
        userId: userInfo.id,
      }),
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
  });

  const today = new Date();

  const filteredTickets = useMemo(() => {
    if (!orderTickets) return [];

    return orderTickets.filter((ticket) => {
      const isStatusMatch =
        selectedTabTop === "all" ||
        (selectedTabTop === "success" && ticket.status === "Confirmed") ||
        (selectedTabTop === "processing" && ticket.status === "Pending") ||
        (selectedTabTop === "canceled" && ticket.status === "Cancelled");

      const isTimeMatch =
        selectedTabBottom === "upcoming"
          ? new Date(ticket.workshopStartDate) >= today
          : new Date(ticket.workshopEndDate) < today;

      const keyword = searchKeyword.toLowerCase();
      const isKeywordMatch =
        ticket.workshopTitle.toLowerCase().includes(keyword) ||
        ticket.workshopLocation.toLowerCase().includes(keyword);

      return isStatusMatch && isTimeMatch && isKeywordMatch;
    });
  }, [orderTickets, selectedTabTop, selectedTabBottom, searchKeyword]);

  // Reset page on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTabTop, selectedTabBottom, searchKeyword]);

  const totalPages = Math.ceil(filteredTickets.length / PAGE_SIZE);
  const displayedTickets = filteredTickets.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  ).sort((a, b) => Number(b.userBookingId) - Number(a.userBookingId));

  const generatePageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // If there are more than 5 pages, show a limited number of pages
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...');
      } else if (currentPage >= totalPages - 2) {
        pages.push('...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push('...', currentPage - 1, currentPage, currentPage + 1, '...');
      }
    }
    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className={styles.myEvent}>
      <div className="flex-space pb-20 border-1px-bottom">
        <h4 className="white-color">Vé đã đặt</h4>
        <InputSearch onSearch={setSearchKeyword} />
      </div>

      {/* Top Tabs */}
      <div className="flex-space mt-20">
        {["all", "success", "processing", "canceled"].map((tab) => (
          <div key={tab} className="col-lg-3 col-md-4 col-sm-6">
            <div
              className={`${selectedTabTop === tab ? "primary-background" : "main-background"
                } mr-15 ${styles.statusText}`}
              onClick={() => setSelectedTabTop(tab)}
            >
              <p className="white-color text-lg-bold text-center">
                {tab === "all"
                  ? "Tất cả"
                  : tab === "success"
                    ? "Thành công"
                    : tab === "processing"
                      ? "Đang xử lý"
                      : "Đã hủy"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Time Filter */}
      <div className="mt-25">
        <button
          className={`btn btn-default ${styles.subTabItem} ${selectedTabBottom === "upcoming"
            ? "primary-background border-1px-primary mr-15"
            : "secondary-background mr-15"
            }`}
          onClick={() => setSelectedTabBottom("upcoming")}
        >
          Sắp diễn ra
        </button>

        <button
          className={`btn btn-default ${styles.subTabItem} ${selectedTabBottom === "completed"
            ? "primary-background border-1px-primary mr-15"
            : "secondary-background mr-15"
            }`}
          onClick={() => setSelectedTabBottom("completed")}
        >
          Đã kết thúc
        </button>
      </div>

      {/* Tickets */}
      <div className="pt-40 pb-200">
        {displayedTickets.map((ticket, index) => (
          <MyTicket
            key={index}
            title={ticket.workshopTitle}
            time={formatDateRange(ticket.workshopStartDate, ticket.workshopEndDate)}
            address={ticket.workshopLocation}
            price={
              ticket.totalPrice === 0
                ? "Miễn phí"
                : `${ticket.totalPrice.toLocaleString()} VNĐ`
            }
            imageSrc="/assets/workshop/explore/detail/1.png"
            link={`/dashboard/ticket-detail/${ticket.userBookingId}`}
            buttonText="Chi tiết"
            isButtonVisible={false}
            isSuccess={
              ticket.status === "Confirmed"
                ? "success"
                : ticket.status === "Pending"
                  ? "waiting"
                  : "canceled"
            }
            fullName={ticket.userFullName}
            bookingCode={ticket.userBookingId}
            email={ticket.userEmail}
            quantity={ticket.quantity}
          />
        ))}

        {/* Pagination */}
        {totalPages > 1 && (
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <Link
                  className="page-link main-third-background white-color-4"
                  href="#"
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                >
                  &laquo;
                </Link>
              </li>
              {pageNumbers.map((page, index) => (
                <li
                  key={index}
                  className={`page-item ${currentPage === page ? "active" : ""} ${page === '...' ? 'disabled' : ''}`}
                >
                  <Link
                    className="page-link main-third-background white-color-4"
                    href="#"
                    onClick={() => {
                      if (page !== '...') {
                        setCurrentPage(page);
                      }
                    }}
                  >
                    {page}
                  </Link>
                </li>
              ))}
              <li
                className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
              >
                <Link
                  className="page-link main-third-background white-color-4"
                  href="#"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                >
                  &raquo;
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
}
