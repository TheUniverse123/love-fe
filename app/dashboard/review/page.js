'use client'

import { fetchWorkshops } from "@/app/api/workshop";
import { formatDateRange } from "@/app/util/convert";
import MyEvent from '@/components/dashboard/MyEvent';
import InputSearch from '@/components/search/InputSearch';
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from 'react';
import styles from "../my-event/MyEvents.module.css";

export default function MyEvents() {
  const [selectedTab, setSelectedTab] = useState('upcoming');
  const [currentPages, setCurrentPages] = useState({
    upcoming: 1,
    past: 1,
    waiting: 1,
  });
  const [searchKeyword, setSearchKeyword] = useState('');

  const [pageSize] = useState(3);

  const getTabClass = (tab) => {
    return selectedTab === tab ? 'primary-background mr-15 active' : 'main-background mr-15 border-1px';
  };

  const { data } = useQuery({
    queryKey: ['workshops-review'],
    queryFn: ({ signal }) => fetchWorkshops({ signal, pageNumber: 1, pageSize: 1000 }),
  });

  const events = {
    upcoming: data ? data.filter(event => event.status === 0) : [],
    past: data ? data.filter(event => event.status === 1) : [],
    waiting: data ? data.filter(event => event.status === 2) : [],
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPages((prevState) => ({
      ...prevState,
      [selectedTab]: pageNumber,
    }));
  };

  const paginateData = (eventsData) => {
    const startIndex = (currentPages[selectedTab] - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return eventsData.slice(startIndex, endIndex);
  };

  const filteredEvents = events[selectedTab].filter((event) => {
    const keyword = searchKeyword.toLowerCase();
    return (
      event.title?.toLowerCase().includes(keyword) ||
      event.location?.toLowerCase().includes(keyword)
    );
  });
  const displayedEvents = paginateData(filteredEvents);

  // Hàm tính các trang cần hiển thị
  const getPageNumbers = (totalPages) => {
    const pages = [];
    if (totalPages <= 5) {
      // Nếu số trang nhỏ hơn hoặc bằng 5, hiển thị tất cả
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Nếu số trang lớn hơn 5, hiển thị một số trang
      pages.push(1);
      const rangeStart = Math.max(currentPages[selectedTab] - 2, 2);
      const rangeEnd = Math.min(currentPages[selectedTab] + 2, totalPages - 1);

      // Hiển thị dấu ba chấm nếu có trang ở giữa
      if (rangeStart > 2) pages.push('...');
      for (let i = rangeStart; i <= rangeEnd; i++) {
        pages.push(i);
      }
      if (rangeEnd < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  const totalPages = Math.ceil(filteredEvents.length / pageSize);
  const pageNumbers = getPageNumbers(totalPages);
  useEffect(() => {
    setCurrentPages({
      upcoming: 1,
      past: 1,
      waiting: 1,
    })
  }, [searchKeyword, selectedTab]);
  return (
    <div className={styles.myEvent}>
      <div className="flex-space pb-20 border-1px-bottom">
        <h4 className="white-color">Xét duyệt sự kiện</h4>
        <InputSearch onSearch={setSearchKeyword} />
      </div>

      <div className="flex-space mt-20">
        <div className="col-lg-4 col-md-4 col-sm-6">
          <div
            className={`${getTabClass('upcoming')} ${styles.tabItem}`}
            onClick={() => {
              setSelectedTab('upcoming');
              setCurrentPages((prevState) => ({ ...prevState, upcoming: 1 }));
            }}
          >
            <p className="white-color text-lg-bold text-center">Chờ duyệt</p>
          </div>
        </div>

        <div className="col-lg-4 col-md-4 col-sm-6">
          <div
            className={`${getTabClass('past')} ${styles.tabItem}`}
            onClick={() => {
              setSelectedTab('past');
              setCurrentPages((prevState) => ({ ...prevState, past: 1 }));
            }}
          >
            <p className="white-color text-lg-bold text-center">Đã duyệt</p>
          </div>
        </div>

        <div className="col-lg-4 col-md-4 col-sm-6">
          <div
            className={`${getTabClass('waiting')} ${styles.tabItem}`}
            onClick={() => {
              setSelectedTab('waiting');
              setCurrentPages((prevState) => ({ ...prevState, waiting: 1 }));
            }}
          >
            <p className="white-color text-lg-bold text-center">Từ chối</p>
          </div>
        </div>
      </div>

      <div className="pt-40 pb-200">
        {displayedEvents.map((event, index) => (
          <MyEvent
            key={index}
            title={event.title}
            time={formatDateRange(event.startDate, event.endDate)}
            address={event.location}
            price={event.isFree ? 'Miễn phí' : `${event.price} VND`}
            imageSrc={event.imagePath}
            buttonText={event.isFree ? "Đặt ngay" : "Mua vé"}
            isSuccess={event.status === 1 ? "success" : event.status === 2 ? "waiting" : "pending"}
            mode="review"
            tab={selectedTab}
            workshopId={event.workshopId}
          />
        ))}

        <nav aria-label="Page navigation example">
          <ul className="pagination">
            {/* Previous Button */}
            <li className="page-item">
              <a
                className="page-link main-third-background white-color-4"
                href="#"
                aria-label="Previous"
                onClick={() => currentPages[selectedTab] > 1 && handlePageChange(currentPages[selectedTab] - 1)}
              >
                <span aria-hidden="true">
                  <svg className={styles.whiteTextsvg} width={12} height={12} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.00016 1.33325L1.3335 5.99992M1.3335 5.99992L6.00016 10.6666M1.3335 5.99992H10.6668" stroke strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
            </li>

            {/* Render số trang */}
            {pageNumbers.map((page, index) => (
              <li key={index} className="page-item">
                {page === '...' ? (
                  <a className="page-link main-third-background white-color-4">...</a>
                ) : (
                  <a
                    className={`page-link ${page === currentPages[selectedTab] ? 'secondary-background white-color active' : 'main-third-background white-color-4'}`}
                    href="#"
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </a>
                )}
              </li>
            ))}

            {/* Next Button */}
            <li className="page-item">
              <a
                className="page-link main-third-background white-color-4"
                href="#"
                aria-label="Next"
                onClick={() => currentPages[selectedTab] < totalPages && handlePageChange(currentPages[selectedTab] + 1)}
              >
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
