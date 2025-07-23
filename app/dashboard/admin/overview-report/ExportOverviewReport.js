'use client'
import { useState } from 'react';
import * as XLSX from 'xlsx';
import { useQuery } from "@tanstack/react-query";
import { toast } from 'react-toastify';
import styles from '@/components/dashboard/ExportReport.module.css';
import { formatPrice } from '@/app/util/convert';
import { fetchAdminDashboardOverview, fetchRecentCreatedWorkshops, fetchWorkshopTopRevenue, fetchWorkshopBottomRevenue, fetchWorkshopOrganizer, fetchWorkshopParticipant, fetchWorkshopRevenue } from '@/app/api/admin-dashboard';
import { fetchAllBookings } from '@/app/api/manage-workshop';

export default function ExportOverviewReport() {
    const [isExporting, setIsExporting] = useState(false);

    // Tổng quan
    const { data: overviewData } = useQuery({
        queryKey: ['statistics-admin-overview'],
        queryFn: fetchAdminDashboardOverview,
    });
    // Tất cả booking (để tính vé có phí)
    const { data: allBookings } = useQuery({
        queryKey: ['all-bookings-statistics'],
        queryFn: ({ signal }) => fetchAllBookings({ signal, pageNumber: 1, pageSize: 1000 }),
    });
    // Chart/weekly
    const { data: revenueWeekly } = useQuery({
        queryKey: ['revenue-data'],
        queryFn: fetchWorkshopRevenue,
    });
    const { data: organizerWeekly } = useQuery({
        queryKey: ['organizer-data'],
        queryFn: fetchWorkshopOrganizer,
    });
    const { data: participantWeekly } = useQuery({
        queryKey: ['participant-data'],
        queryFn: fetchWorkshopParticipant,
    });
    // Top/bottom revenue
    const { data: topRevenue } = useQuery({
        queryKey: ['top-revenue-data'],
        queryFn: fetchWorkshopTopRevenue,
    });
    const { data: bottomRevenue } = useQuery({
        queryKey: ['bottom-revenue-data'],
        queryFn: fetchWorkshopBottomRevenue,
    });
    // Recent created events
    const { data: recentCreatedWorkshops } = useQuery({
        queryKey: ['recent-created-workshops'],
        queryFn: ({ signal }) => fetchRecentCreatedWorkshops({ signal, pageNumber: 1, pageSize: 100 }),
    });

    const exportToXLSX = async () => {
        setIsExporting(true);
        try {
            const reportData = [];
            // Tổng quan
            reportData.push(['BÁO CÁO TỔNG QUAN ADMIN']);
            reportData.push(['']);
            reportData.push(['Thống kê', 'Giá trị']);
            reportData.push(['Tổng vé đã bán', overviewData?.totalTicketsSold || 0]);
            const paidTicketsCount = allBookings?.filter(b => b.ticketPrice > 0).reduce((t, b) => t + b.quantity, 0) || 0;
            reportData.push(['Vé có phí', paidTicketsCount]);
            reportData.push(['Doanh thu', formatPrice(overviewData?.totalRevenue) || 0]);
            reportData.push(['Nhà tổ chức workshop', overviewData?.totalOrganizers || 0]);
            reportData.push(['Workshop đã tạo', overviewData?.ongoingWorkshops || 0]);
            reportData.push(['']);

            // Thống kê theo tuần (doanh thu, vé, tổ chức, người tham gia)
            reportData.push(['THỐNG KÊ THEO TUẦN']);
            reportData.push(['']);
            if (revenueWeekly?.weeks) {
                reportData.push(['Tuần', 'Doanh thu', 'Số vé']);
                revenueWeekly.weeks.forEach(week => {
                    reportData.push([week.label, formatPrice(week.totalRevenue), week.totalTickets]);
                });
                reportData.push(['']);
            }
            if (organizerWeekly?.weeks) {
                reportData.push(['Tuần', 'Nhà tổ chức', 'Workshop']);
                organizerWeekly.weeks.forEach(week => {
                    reportData.push([week.label, week.totalOrganizers, week.totalWorkshops]);
                });
                reportData.push(['']);
            }
            if (participantWeekly?.weeks) {
                reportData.push(['Tuần', 'Tài khoản mới', 'Người tham gia']);
                participantWeekly.weeks.forEach(week => {
                    reportData.push([week.label, week.totalNewUsers, week.totalParticipants]);
                });
                reportData.push(['']);
            }

            // Top 5 workshop doanh thu cao nhất
            reportData.push(['TOP 5 WORKSHOP DOANH THU CAO NHẤT']);
            reportData.push(['']);
            reportData.push(['Hạng', 'Nhà tổ chức', 'Tên workshop', 'Doanh thu']);
            topRevenue?.forEach((item, idx) => {
                reportData.push([idx + 1, item.organizationName, item.workshopTitle, formatPrice(item.revenue)]);
            });
            reportData.push(['']);
            // Top 5 workshop doanh thu thấp nhất
            reportData.push(['TOP 5 WORKSHOP DOANH THU THẤP NHẤT']);
            reportData.push(['']);
            reportData.push(['Hạng', 'Nhà tổ chức', 'Tên workshop', 'Doanh thu']);
            bottomRevenue?.forEach((item, idx) => {
                reportData.push([idx + 1, item.organizationName, item.workshopTitle, formatPrice(item.revenue)]);
            });
            reportData.push(['']);

            // Sự kiện đã tạo gần đây
            reportData.push(['SỰ KIỆN ĐÃ TẠO GẦN ĐÂY']);
            reportData.push(['']);
            reportData.push(['Tiêu đề', 'Thời gian', 'Địa điểm', 'Trạng thái']);
            recentCreatedWorkshops?.items?.forEach(event => {
                console.log(event)
                const status = event.status === 0 ? 'Chờ duyệt' : (new Date(event.startDate).getTime() < Date.now() ? 'Đã kết thúc' : 'Đang diễn ra');
                reportData.push([
                    event.workshopName,
                    event.startDate && event.endDate ? `${event.startDate} - ${event.endDate}` : '',
                    event.location?.replace("(credit-card-payment)", "").trim(),
                    status
                ]);
            });
            reportData.push(['']);

            // Tổng kết
            reportData.push(['TỔNG KẾT']);
            reportData.push(['']);
            reportData.push(['Tổng số sự kiện gần đây', recentCreatedWorkshops?.items?.length || 0]);
            reportData.push(['Tổng doanh thu', formatPrice(overviewData?.totalRevenue || 0)]);
            reportData.push(['Ngày xuất báo cáo', new Date().toLocaleDateString('vi-VN')]);

            // Tạo worksheet từ dữ liệu
            const ws = XLSX.utils.aoa_to_sheet(reportData);
            // Tự động điều chỉnh độ rộng cột
            const maxColLengths = {};
            reportData.forEach(row => {
                row.forEach((cell, i) => {
                    const cellLength = cell ? String(cell).length : 0;
                    if (!maxColLengths[i] || cellLength > maxColLengths[i]) {
                        maxColLengths[i] = cellLength;
                    }
                });
            });
            ws['!cols'] = Object.keys(maxColLengths).map(i => ({
                wch: maxColLengths[i] + 2
            }));
            // Tạo workbook và thêm worksheet vào
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'BaoCaoTongQuanAdmin');
            // Xuất file
            XLSX.writeFile(wb, `bao-cao-tong-quan-admin-${new Date().toISOString().split('T')[0]}.xlsx`);
            toast.success('Xuất báo cáo tổng quan admin thành công!');
        } catch (error) {
            toast.error('Có lỗi xảy ra khi xuất file XLSX: ' + error.message);
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className={styles.exportContainer}>
            <button
                onClick={exportToXLSX}
                disabled={isExporting}
                className={`${styles.exportButton} ${styles.csvButton}`}
            >
                {isExporting ? (
                    <div className={`spinner-border spinner-border-sm ${styles.spinner}`} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                ) : (
                    <svg className={styles.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )}
                Xuất báo cáo tổng quan
            </button>
        </div>
    );
} 