'use client';
import styles from "./SavedEventPage.module.css"
import React, { useState } from 'react';
import SavedEvent from '@/components/dashboard/SavedEvent';
import InputSearch from '@/components/search/InputSearch';
import { fetchWorkshopsSaved } from "@/app/api/saved-workshops";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@/app/util/auth";
import { formatPrice } from "@/app/util/convert";
const userInfo = getUserInfo()

export default function SavedEventPage() {
  const [selectedTab, setSelectedTab] = useState('upcoming'); // Default tab is 'Sắp diễn ra'
  const [currentPage, setCurrentPage] = useState(1); // Track the current page

  const { data: workshopSaved, isLoading, isError } = useQuery({
    queryKey: ['workshop-saved', currentPage],
    queryFn: ({ signal }) => fetchWorkshopsSaved(
      { signal, pageNumber: currentPage, pageSize: 5, userId: userInfo.id }), // Set page size to 5
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
  });

  // Check if data is available
  const events = workshopSaved ? workshopSaved.items : [];
  const totalPages = workshopSaved ? workshopSaved.totalPages : 1;

  // Get today's date for filtering
  const today = new Date();

  // Logic to categorize events into 'upcoming' and 'past'
  const upcomingEvents = events.filter((event) => new Date(event.startDate) > today);
  const pastEvents = events.filter((event) => new Date(event.endDate) < today);

  // Handle pagination logic
  const handlePageClick = (page) => {
    if (page < 1 || page > totalPages) return; // Prevent going out of bounds
    setCurrentPage(page);
  };

  // Generate page numbers for pagination (max 10 pages, rest as ...)
  const pageNumbers = [];
  if (totalPages <= 10) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    pageNumbers.push(1);
    for (let i = Math.max(currentPage - 4, 2); i <= Math.min(currentPage + 4, totalPages - 1); i++) {
      pageNumbers.push(i);
    }
    if (currentPage < totalPages - 4) {
      pageNumbers.push('...');
    }
    pageNumbers.push(totalPages);
  }

  // Select the events based on the selected tab
  const eventsToShow = selectedTab === 'upcoming' ? upcomingEvents : pastEvents;

  return (
    <div className={styles.myEvent}>
      <div className="flex-space pb-20 border-1px-bottom">
        <h4 className="white-color">Sự kiện đã lưu</h4>
        <InputSearch />
      </div>

      <div className="mt-25">
        <button
          className={`btn btn-default ${styles.subTabItem} ${selectedTab === 'upcoming' ? 'primary-background border-1px-primary mr-15' : 'secondary-background mr-15'}`}
          onClick={() => setSelectedTab('upcoming')}
        >
          Sắp diễn ra
        </button>

        <button
          className={`btn btn-default ${styles.subTabItem} ${selectedTab === 'past' ? 'primary-background border-1px-primary mr-15' : 'secondary-background mr-15'}`}
          onClick={() => setSelectedTab('past')}
        >
          Đã kết thúc
        </button>
      </div>

      <div className="pt-40 pb-200">
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Error loading events</p>
        ) : (
          eventsToShow.map((event, index) => (
            <SavedEvent
              key={index}
              rating={event.averageRating}
              reviews={event.approvedReviewCount}
              title={event.title}
              time={`${event.startDate} - ${event.endDate}`}
              address={event.location}
              price={event.isFree ? "Miễn phí" : formatPrice(event.price)}
              imageSrc={event.imagePath}
              link={`workshop-detail/${event.workshopId}`}
              buttonText="Đặt ngay"
              isButtonVisible={false}
            />
          ))
        )}

        {/* Pagination */}
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            {/* Prev Button */}
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <a className="page-link main-third-background white-color-4" href="#" onClick={() => handlePageClick(currentPage - 1)} aria-label="Previous">
                <span aria-hidden="true">
                  <svg className={styles.whiteTextsvg} width={12} height={12} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.00016 1.33325L1.3335 5.99992M1.3335 5.99992L6.00016 10.6666M1.3335 5.99992H10.6668" stroke strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
            </li>

            {/* Page Numbers */}
            {pageNumbers.map((page, index) => (
              <li key={index} className={`page-item ${page === currentPage ? 'active' : ''} ${page === '...' ? 'disabled' : ''}`}>
                <a className="page-link main-third-background white-color-4" href="#" onClick={() => handlePageClick(page)}>{page}</a>
              </li>
            ))}

            {/* Next Button */}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <a className="page-link main-third-background white-color-4" href="#" onClick={() => handlePageClick(currentPage + 1)} aria-label="Next">
                <span aria-hidden="true">
                  <svg className={styles.whiteTextsvg} width={12} height={12} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.99967 10.6666L10.6663 5.99992L5.99968 1.33325M10.6663 5.99992L1.33301 5.99992" stroke strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
