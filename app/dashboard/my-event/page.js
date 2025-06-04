'use client'

import styles from "./MyEvents.module.css"
import React, { useState, useMemo, useEffect } from 'react';
import MyEvent from '@/components/dashboard/MyEvent';
import InputSearch from '@/components/search/InputSearch';
import { fetchWorkshopByUsers } from "@/app/api/manage-workshop";
import { getUserInfo } from "@/app/util/auth";
import { useQuery } from "@tanstack/react-query";
import { formatDateRange } from "@/app/util/convert";

const PAGE_SIZE = 2;
const userInfo = getUserInfo();

export default function MyEvents() {
  const [selectedTab, setSelectedTab] = useState('upcoming');
  const [searchKeyword, setSearchKeyword] = useState('');

  const [pagination, setPagination] = useState({
    upcoming: 1,
    past: 1,
    waiting: 1,
  });

  const getTabClass = (tab) => {
    return selectedTab === tab ? 'primary-background mr-15 active' : 'main-background mr-15 border-1px';
  };

  const { data } = useQuery({
    queryKey: ['workshop-user'],
    queryFn: ({ signal }) => fetchWorkshopByUsers(
      { signal, pageNumber: 1, pageSize: 1000, userId: userInfo?.id }),
  });

  const filteredEvents = useMemo(() => {
    if (!data?.workshops) return { upcoming: [], past: [], waiting: [] };
    const now = Date.now();
    const upcoming = data.workshops.filter(item => new Date(item.startDate).getTime() > now);
    const past = data.workshops.filter(item => new Date(item.startDate).getTime() < now);
    const waiting = data.workshops.filter(item => item.status === 0);
    return { upcoming, past, waiting };
  }, [data]);

  const currentEvents = useMemo(() => {
    const keyword = searchKeyword.toLowerCase();
    const all = filteredEvents[selectedTab].filter(event =>
      event.title?.toLowerCase().includes(keyword) ||
      event.location?.toLowerCase().includes(keyword)
    );

    const start = (pagination[selectedTab] - 1) * PAGE_SIZE;
    return all.slice(start, start + PAGE_SIZE);
  }, [filteredEvents, selectedTab, pagination, searchKeyword]);

  const totalPages = useMemo(() => {
    const keyword = searchKeyword.toLowerCase();
    const filtered = filteredEvents[selectedTab].filter(event =>
      event.title?.toLowerCase().includes(keyword) ||
      event.location?.toLowerCase().includes(keyword)
    );
    return Math.ceil(filtered.length / PAGE_SIZE);
  }, [filteredEvents, selectedTab, searchKeyword]);

  useEffect(() => {
    setPagination(prev => ({ ...prev, [selectedTab]: 1 }));
  }, [searchKeyword, selectedTab]);

  const handlePageChange = (page) => {
    setPagination(prev => ({ ...prev, [selectedTab]: page }));
  };

  // Hàm render phân trang với dấu ...
  const renderPaginationItems = () => {
    const pages = [];
    const total = totalPages;
    const current = pagination[selectedTab];
    const delta = 2; // số trang trước và sau trang hiện tại được hiển thị

    if (total <= 5) {
      // Nếu tổng trang <=5 thì hiển thị hết
      for (let i = 1; i <= total; i++) {
        pages.push(
          <li key={i} className="page-item">
            <a
              href="#"
              className={`page-link ${current === i ? 'secondary-background white-color active' : 'main-third-background white-color-4'}`}
              onClick={e => { e.preventDefault(); handlePageChange(i); }}
            >
              {i}
            </a>
          </li>
        );
      }
      return pages;
    }

    // Với trang > 5 thì hiển thị rút gọn
    let left = current - delta;
    let right = current + delta;

    if (left < 2) {
      right += 2 - left;
      left = 2;
    }
    if (right > total - 1) {
      left -= right - (total - 1);
      right = total - 1;
    }

    left = Math.max(left, 2);
    right = Math.min(right, total - 1);

    pages.push(
      <li key={1} className="page-item">
        <a
          href="#"
          className={`page-link ${current === 1 ? 'secondary-background white-color active' : 'main-third-background white-color-4'}`}
          onClick={e => { e.preventDefault(); handlePageChange(1); }}
        >
          1
        </a>
      </li>
    );

    if (left > 2) {
      pages.push(
        <li key="left-ellipsis" className="page-item">
          <a className="page-link main-third-background white-color">...</a>
        </li>
      );
    }

    for (let i = left; i <= right; i++) {
      pages.push(
        <li key={i} className="page-item">
          <a
            href="#"
            className={`page-link ${current === i ? 'secondary-background white-color active' : 'main-third-background white-color-4'}`}
            onClick={e => { e.preventDefault(); handlePageChange(i); }}
          >
            {i}
          </a>
        </li>
      );
    }

    if (right < total - 1) {
      pages.push(
        <li key="right-ellipsis" className="page-item">
          <a className="page-link main-third-background white-color">...</a>
        </li>
      );
    }

    pages.push(
      <li key={total} className="page-item">
        <a
          href="#"
          className={`page-link ${current === total ? 'secondary-background white-color active' : 'main-third-background white-color-4'}`}
          onClick={e => { e.preventDefault(); handlePageChange(total); }}
        >
          {total}
        </a>
      </li>
    );

    return pages;
  };

  return (
    <div className={styles.myEvent}>
      <div className="flex-space pb-20 border-1px-bottom">
        <h4 className="white-color">Sự kiện của tôi</h4>
        <InputSearch onSearch={setSearchKeyword} />
      </div>

      {/* Tabs */}
      <div className="flex-space mt-20">
        {['upcoming', 'past', 'waiting'].map(tab => (
          <div key={tab} className="col-lg-4 col-md-4 col-sm-6">
            <div
              className={`${getTabClass(tab)} ${styles.tabItem}`}
              onClick={() => setSelectedTab(tab)}
            >
              <p className="white-color text-lg-bold text-center">
                {tab === 'upcoming' ? 'Sắp tới' : tab === 'past' ? 'Đã qua' : 'Chờ duyệt'}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Events */}
      <div className="pt-40 pb-200">
        {currentEvents.map((event, index) => (
          <MyEvent
            workshopId={event.workshopId}
            key={index}
            title={event.title}
            time={formatDateRange(event.startDate, event.endDate)}
            address={event.location}
            price={event.isFree ? 'Miễn phí' : `${event.price.toLocaleString()} VNĐ`}
            imageSrc={event.imagePath}
            buttonText="Chi tiết"
            isSuccess={
              event.status === 0
                ? 'waiting'
                : (new Date(event.startDate).getTime() < Date.now() ? 'success' : undefined)
            }
          />
        ))}

        {totalPages > 1 && (
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <a
                  className="page-link main-third-background white-color-4"
                  href="#"
                  onClick={e => {
                    e.preventDefault();
                    handlePageChange(Math.max(pagination[selectedTab] - 1, 1));
                  }}
                >
                  <span aria-hidden="true">
                    <svg className={styles.whiteTextsvg} width={12} height={12} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.00016 1.33325L1.3335 5.99992M1.3335 5.99992L6.00016 10.6666M1.3335 5.99992H10.6668" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </a>
              </li>

              {renderPaginationItems()}

              <li className="page-item">
                <a
                  className="page-link main-third-background white-color-4"
                  href="#"
                  onClick={e => {
                    e.preventDefault();
                    handlePageChange(Math.min(pagination[selectedTab] + 1, totalPages));
                  }}
                >
                  <span aria-hidden="true">
                    <svg className={styles.whiteTextsvg} width={12} height={12} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.99967 10.6666L10.6663 5.99992L5.99968 1.33325M10.6663 5.99992L1.33301 5.99992" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </a>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
}
