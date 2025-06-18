'use client'
import { useState } from 'react';
import { fetchDashboardWidget } from "@/app/api/dashboard";
import { fetchWorkshopRecentRegisterUser } from "@/app/api/dashboard";
import { fetchWorkshopByUsers } from "@/app/api/manage-workshop";
import { fetchWorkshopOfUsers } from "@/app/api/workshop";
import { getUserInfo } from "@/app/util/auth";
import { formatDateRange } from "@/app/util/convert";
import { useQuery } from "@tanstack/react-query";
import { toast } from 'react-toastify';
import styles from './ExportReport.module.css';

export default function ExportReport() {
    const [isExporting, setIsExporting] = useState(false);
    const userInfo = getUserInfo();

    const { data: statisticsData } = useQuery({
        queryKey: ['statistics-items'],
        queryFn: fetchDashboardWidget,
    });

    const { data: workshopDates } = useQuery({
        queryKey: ['workshop-dates'],
        queryFn: ({ signal }) => fetchWorkshopOfUsers({ signal, userId: userInfo.id }),
        staleTime: 1000 * 60 * 5,
        refetchInterval: 1000 * 60 * 5,
    });

    // Lấy tất cả sự kiện (không phân trang)
    const { data: allWorkshopsData } = useQuery({
        queryKey: ['all-workshops'],
        queryFn: ({ signal }) => fetchWorkshopByUsers(
            { signal, pageNumber: 1, pageSize: 1000, userId: userInfo?.id }),
    });

    const { data: registerUsersData } = useQuery({
        queryKey: ['recent-register-users'],
        queryFn: fetchWorkshopRecentRegisterUser,
    });

    const exportToCSV = async () => {
        setIsExporting(true);
        try {
            // Tạo dữ liệu cho CSV
            const csvData = [];
            
            // Thêm thống kê tổng quan
            csvData.push(['BÁO CÁO TỔNG QUAN']);
            csvData.push(['']);
            csvData.push(['Thống kê', 'Giá trị']);
            csvData.push(['Tổng số vé đã bán', statisticsData?.totalTicketsSold || 0]);
            csvData.push(['Doanh thu', statisticsData?.totalRevenue || 0]);
            csvData.push(['Số lượng khách hàng mới', statisticsData?.newCustomersThisWeek || 0]);
            csvData.push(['Số lượng workshop mới', statisticsData?.newWorkshopsThisWeek || 0]);
            csvData.push(['']);
            
            // Thêm thông tin về lịch sự kiện
            if (workshopDates?.result && workshopDates.result.length > 0) {
                csvData.push(['LỊCH SỰ KIỆN THEO THÁNG']);
                csvData.push(['']);
                csvData.push(['Tháng', 'Số lượng sự kiện']);
                
                // Nhóm sự kiện theo tháng
                const monthlyStats = {};
                workshopDates.result.forEach(date => {
                    const month = new Date(date).toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' });
                    monthlyStats[month] = (monthlyStats[month] || 0) + 1;
                });
                
                Object.entries(monthlyStats).forEach(([month, count]) => {
                    csvData.push([month, count]);
                });
                csvData.push(['']);
            }
            
            // Thêm danh sách tất cả sự kiện
            csvData.push(['DANH SÁCH TẤT CẢ SỰ KIỆN']);
            csvData.push(['']);
            csvData.push(['Tiêu đề', 'Thời gian', 'Địa điểm', 'Giá', 'Trạng thái', 'Mô tả', 'Số lượng vé', 'Doanh thu sự kiện']);
            
            if (allWorkshopsData?.workshops) {
                allWorkshopsData.workshops.forEach(event => {
                    const status = event.status === 0 ? 'Chờ duyệt' : 
                                 (new Date(event.startDate).getTime() < Date.now() ? 'Đã kết thúc' : 'Đang diễn ra');
                    
                    // Tính doanh thu sự kiện
                    const eventRevenue = event.isFree ? 0 : (event.price * (event.totalTickets || 0));
                    
                    csvData.push([
                        event.title,
                        formatDateRange(event.startDate, event.endDate),
                        event.location.replace("(credit-card-payment)", "").trim(),
                        event.isFree ? 'Miễn phí' : `${event.price.toLocaleString()} VNĐ`,
                        status,
                        event.description || 'Không có mô tả',
                        event.totalTickets || 0,
                        eventRevenue.toLocaleString() + ' VNĐ'
                    ]);
                });
            }
            csvData.push(['']);
            
            // Thêm thống kê chi tiết sự kiện
            if (allWorkshopsData?.workshops) {
                csvData.push(['THỐNG KÊ CHI TIẾT SỰ KIỆN']);
                csvData.push(['']);
                
                const totalEvents = allWorkshopsData.workshops.length;
                const freeEvents = allWorkshopsData.workshops.filter(e => e.isFree).length;
                const paidEvents = totalEvents - freeEvents;
                const completedEvents = allWorkshopsData.workshops.filter(e => 
                    new Date(e.startDate).getTime() < Date.now()
                ).length;
                const upcomingEvents = allWorkshopsData.workshops.filter(e => 
                    new Date(e.startDate).getTime() >= Date.now()
                ).length;
                const pendingEvents = allWorkshopsData.workshops.filter(e => e.status === 0).length;
                
                csvData.push(['Tổng số sự kiện', totalEvents]);
                csvData.push(['Sự kiện miễn phí', freeEvents]);
                csvData.push(['Sự kiện có phí', paidEvents]);
                csvData.push(['Sự kiện đã kết thúc', completedEvents]);
                csvData.push(['Sự kiện sắp diễn ra', upcomingEvents]);
                csvData.push(['Sự kiện chờ duyệt', pendingEvents]);
                csvData.push(['']);
            }
            
            // Thêm danh sách người dùng mới đăng ký
            csvData.push(['NGƯỜI DÙNG MỚI ĐĂNG KÝ']);
            csvData.push(['']);
            csvData.push(['Tên', 'Email', 'Số điện thoại', 'Avatar URL', 'Ngày đăng ký']);
            
            if (registerUsersData?.result) {
                registerUsersData.result.forEach(user => {
                    csvData.push([
                        user.userName,
                        user.userEmail,
                        user.userPhone || 'Không có',
                        user.avatarUrl || 'Không có',
                        user.createdDate ? new Date(user.createdDate).toLocaleDateString('vi-VN') : 'Không có'
                    ]);
                });
            }
            
            // Thêm thông tin tổng kết
            csvData.push(['']);
            csvData.push(['TỔNG KẾT']);
            csvData.push(['']);
            csvData.push(['Tổng số sự kiện', allWorkshopsData?.workshops?.length || 0]);
            csvData.push(['Tổng số người dùng mới', registerUsersData?.result?.length || 0]);
            csvData.push(['Tổng doanh thu', `${(statisticsData?.totalRevenue || 0).toLocaleString()} VNĐ`]);
            csvData.push(['Ngày xuất báo cáo', new Date().toLocaleDateString('vi-VN')]);

            // Tạo file CSV
            const csvContent = csvData.map(row => 
                row.map(cell => `"${cell}"`).join(',')
            ).join('\n');
            
            // Thêm BOM để hỗ trợ tiếng Việt
            const BOM = '\uFEFF';
            const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', `bao-cao-day-du-${new Date().toISOString().split('T')[0]}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Thông báo thành công
            toast.success('Xuất báo cáo đầy đủ thành công!');
        } catch (error) {
            console.error('Lỗi khi xuất CSV:', error);
            toast.error('Có lỗi xảy ra khi xuất file CSV: ' + error.message);
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className={styles.exportContainer}>
            <button
                onClick={exportToCSV}
                disabled={isExporting}
                className={`${styles.exportButton} ${styles.csvButton}`}
            >
                {isExporting ? (
                    <div className={`spinner-border spinner-border-sm ${styles.spinner}`} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                ) : (
                    <svg className={styles.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                )}
                Xuất báo cáo đầy đủ
            </button>
        </div>
    );
} 