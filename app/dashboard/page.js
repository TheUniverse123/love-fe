'use client'

import React, { useState } from "react";
import MyTicket from "@/components/dashboard/MyTicket";
import InputSearch from "@/components/search/InputSearch";
import { tickets } from "@/data";

export default function BookedTicketPage() {
  const [selectedTabTop, setSelectedTabTop] = useState("all");
  const [selectedTabBottom, setSelectedTabBottom] = useState("upcoming");
  return (
    <div style={{ marginRight: "300px", paddingLeft: "35px", paddingTop: "20px" }}>
      <div className="flex-space pb-20 border-1px-bottom">
        <h4 className="white-color">Vé đã đặt</h4>
        <InputSearch />
      </div>

      <div className="flex-space" style={{ marginTop: "22px" }}>
        {["all", "success", "processing", "canceled"].map((tab) => (
          <div key={tab} className="col-lg-3 col-md-4 col-sm-6">
            <div
              className={`${selectedTabTop === tab ? "primary-background" : "main-background"
                } mr-15`}
              style={{ cursor: "pointer", padding: "20px 0", borderRadius: "8px" }}
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

      <div className="mt-25">
        <button
          className={`btn btn-default ${selectedTabBottom === "upcoming"
            ? "primary-background border-1px-primary mr-15"
            : "secondary-background mr-15"
            }`}
          style={{ padding: "11px 27px!important" }}
          onClick={() => setSelectedTabBottom("upcoming")}
        >
          Sắp diễn ra
        </button>

        <button
          className={`btn btn-default ${selectedTabBottom === "completed"
            ? "primary-background border-1px-primary mr-15"
            : "secondary-background mr-15"
            }`}
          style={{ padding: "11px 27px!important" }}
          onClick={() => setSelectedTabBottom("completed")}
        >
          Đã kết thúc
        </button>
      </div>

      <div className="pt-40 pb-200">
        {tickets[selectedTabTop][selectedTabBottom].map((ticket, index) => (
          <MyTicket
            key={index}
            title={ticket.title}
            time={ticket.time}
            address={ticket.address}
            price={ticket.price}
            imageSrc={ticket.imageSrc}
            link={ticket.link}
            buttonText={ticket.buttonText}
            isButtonVisible={ticket.isButtonVisible}
          />
        ))}

        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <a
                className="page-link main-third-background white-color-4"
                href="#"
                aria-label="Previous"
              >
                <span aria-hidden="true">
                  <svg
                    style={{ stroke: "var(--bg-white-color-4) !important" }}
                    width={12}
                    height={12}
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6.00016 1.33325L1.3335 5.99992M1.3335 5.99992L6.00016 10.6666M1.3335 5.99992H10.6668" stroke strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
            </li>
            <li className="page-item">
              <a className="page-link main-third-background white-color-4" href="#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link secondary-background white-color active" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link main-third-background white-color-4" href="#">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link main-third-background white-color-4" href="#">
                4
              </a>
            </li>
            <li className="page-item">
              <a className="page-link main-third-background white-color-4" href="#">
                5
              </a>
            </li>
            <li className="page-item">
              <a className="page-link main-third-background white-color-4" href="#">
                ...
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link main-third-background white-color-4"
                href="#"
                aria-label="Next"
              >
                <span aria-hidden="true">
                  <svg
                    style={{ stroke: "var(--bg-white-color-4) !important" }}
                    width={12}
                    height={12}
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
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
