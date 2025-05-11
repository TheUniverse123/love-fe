'use client'

import React, { useState } from 'react';
import MyEvent from '@/components/dashboard/MyEvent';
import InputSearch from '@/components/search/InputSearch';
import { events } from '@/data';

export default function MyEvents() {
  const [selectedTab, setSelectedTab] = useState('upcoming'); // Default to 'Sắp tới'
  const getTabClass = (tab) => {
    return selectedTab === tab ? 'primary-background mr-15 active' : 'main-background mr-15 border-1px';
  };
  return (
    <div style={{ marginRight: "300px", paddingLeft: "35px", paddingTop: "20px" }}>
      <div className="flex-space pb-20 border-1px-bottom">
        <h4 className="white-color">Sự kiện của tôi</h4>
        <InputSearch />
      </div>

      <div className="flex-space" style={{ marginTop: "22px" }}>
        <div className="col-lg-3 col-md-4 col-sm-6">
          <div
            className={getTabClass('upcoming')}
            style={{ cursor: "pointer", padding: "20px 0", borderRadius: "8px" }}
            onClick={() => setSelectedTab('upcoming')}
          >
            <p className="white-color text-lg-bold text-center">Sắp tới</p>
          </div>
        </div>

        <div className="col-lg-3 col-md-4 col-sm-6">
          <div
            className={getTabClass('past')}
            style={{ cursor: "pointer", padding: "20px 0", borderRadius: "8px" }}
            onClick={() => setSelectedTab('past')}
          >
            <p className="white-color text-lg-bold text-center">Đã qua</p>
          </div>
        </div>

        <div className="col-lg-3 col-md-4 col-sm-6">
          <div
            className={getTabClass('waiting')}
            style={{ cursor: "pointer", padding: "20px 0", borderRadius: "8px" }}
            onClick={() => setSelectedTab('waiting')}
          >
            <p className="white-color text-lg-bold text-center">Chờ duyệt</p>
          </div>
        </div>

        <div className="col-lg-3 col-md-4 col-sm-6">
          <div
            className={getTabClass('draft')}
            style={{ cursor: "pointer", padding: "20px 0", borderRadius: "8px" }}
            onClick={() => setSelectedTab('draft')}
          >
            <p className="white-color text-lg-bold text-center">Nháp</p>
          </div>
        </div>
      </div>

      <div className="pt-40 pb-200">
        {events[selectedTab].map((event, index) => (
          <MyEvent
            key={index}
            title={event.title}
            time={event.time}
            address={event.address}
            price={event.price}
            imageSrc={event.imageSrc}
            link={event.link}
            buttonText={event.buttonText}
            isSuccess={event.isSuccess}
          />
        ))}

        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item"><a className="page-link main-third-background white-color-4" href="#" aria-label="Previous"><span aria-hidden="true">
              <svg style={{ stroke: "var(--bg-white-color-4) !important" }} width={12} height={12} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.00016 1.33325L1.3335 5.99992M1.3335 5.99992L6.00016 10.6666M1.3335 5.99992H10.6668" stroke strokeLinecap="round" strokeLinejoin="round" />
              </svg></span></a></li>
            <li className="page-item"><a className="page-link main-third-background white-color-4" href="#">1</a></li>
            <li className="page-item"><a className="page-link secondary-background white-color active" href="#">2</a></li>
            <li className="page-item"><a className="page-link main-third-background white-color-4" href="#">3</a></li>
            <li className="page-item"><a className="page-link main-third-background white-color-4" href="#">4</a></li>
            <li className="page-item"><a className="page-link main-third-background white-color-4" href="#">5</a></li>
            <li className="page-item"><a className="page-link main-third-background white-color-4" href="#">...</a></li>
            <li className="page-item"><a className="page-link main-third-background white-color-4" href="#" aria-label="Next"><span aria-hidden="true">
              <svg
                style={{ stroke: "var(--bg-white-color-4) !important" }}
                width={12} height={12} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.99967 10.6666L10.6663 5.99992L5.99968 1.33325M10.6663 5.99992L1.33301 5.99992" stroke strokeLinecap="round" strokeLinejoin="round" />
              </svg></span></a></li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
