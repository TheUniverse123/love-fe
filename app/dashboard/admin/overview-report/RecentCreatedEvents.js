import React from 'react';
import Link from 'next/link';
import MyEvent from '@/components/dashboard/MyEvent'; // Cập nhật lại đường dẫn nếu cần
import { Spinner } from 'react-bootstrap'; // Cập nhật lại đường dẫn nếu cần

function RecentCreatedEvents({
  workshops = [],
  isPending = false,
  handlePreviousPage,
  handleNextPage,
  handlePageChange,
  generatePagination,
  currentPage,
  formatDateRange,
  styles
}) {
  return (
    <div className="section-box main-background border-1px border-radius-10">
      <div className="container p-0">
        <div className="panel-white">
          <div className={`panel-head flex-space border-1px-bottom ${styles.sectionStyle}`}>
            <h6 className="text-xl-bold white-color">Sự kiện đã tạo gần đây</h6>
          </div>
          <div className={`panel-body ${styles.eventList}`}>
            <div className="box-list-tours list-tours wow fadeIn">
              {isPending ? <Spinner /> : workshops.map((event, index) => (
                <MyEvent
                  workshopId={event.workshopId}
                  key={index}
                  title={event.title}
                  time={formatDateRange(event.startDate, event.endDate)}
                  address={event.location.replace("(credit-card-payment)", "").trim()}
                  imageSrc={event.imagePath}
                  buttonText="Chi tiết"
                  isButtonVisible={false}
                  isSuccess={event.status === 0
                    ? 'waiting'
                    : (new Date(event.startDate).getTime() < Date.now() ? 'success' : undefined)}
                />
              ))}
            </div>
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                {/* Nút Previous */}
                <li className="page-item">
                  <Link
                    className="page-link main-third-background white-color-4"
                    href="#"
                    onClick={handlePreviousPage}
                    aria-label="Previous"
                  >
                    <span aria-hidden="true">
                      <svg
                        className={styles.whiteTextsvg}
                        width={12} height={12} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.00016 1.33325L1.3335 5.99992M1.3335 5.99992L6.00016 10.6666M1.3335 5.99992H10.6668" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </Link>
                </li>
                {/* Các trang */}
                {generatePagination().map((page, index) => (
                  <li key={index} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                    <Link className="page-link main-third-background white-color-4 flex-center" href="#"
                      onClick={() => handlePageChange(page)}>
                      {page}
                    </Link>
                  </li>
                ))}
                {/* Nút Next */}
                <li className="page-item">
                  <Link
                    className="page-link main-third-background white-color-4"
                    href="#"
                    onClick={handleNextPage}
                    aria-label="Next"
                  >
                    <span aria-hidden="true">
                      <svg
                        className={styles.whiteTextsvg}
                        width={12} height={12} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.99967 10.6666L10.6663 5.99992L5.99968 1.33325M10.6663 5.99992L1.33301 5.99992" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecentCreatedEvents; 