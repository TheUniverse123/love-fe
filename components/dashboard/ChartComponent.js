'use client';
import { fetchMonthlyStats } from '@/app/api/dashboard';
import { ChartOrganizer } from '@/app/dashboard/admin/overview-report/ChartOrganizer';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from 'react-bootstrap';

const ChartComponent = () => {
    const { data, isPending } = useQuery({
        queryKey: ['statistics-monthly'],
        queryFn: fetchMonthlyStats,
    });

    // Xử lý dữ liệu chỉ lấy các tháng có số liệu
    const filtered = data ? data.filter(item => item.soLuongVeDaDat > 0 || item.doanhThu > 0 || item.nguoiThamDu > 0) : [];
    // Lấy 4 tháng gần nhất so với hiện tại
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const months = [];
    for (let i = 3; i >= 0; i--) {
        let m = currentMonth - i;
        if (m <= 0) m += 12;
        months.push(m);
    }
    const filteredLabels = months.map(m => String(m).padStart(2, '0'));
    // Map dữ liệu đúng thứ tự tháng, nếu không có thì điền 0
    const monthDataMap = filtered.reduce((acc, item) => {
        acc[item.month] = item;
        return acc;
    }, {});
    const soLuongVeDaDat = months.map(m => monthDataMap[m]?.soLuongVeDaDat || 0);
    const doanhThu = months.map(m => monthDataMap[m]?.doanhThu ? Math.round(monthDataMap[m].doanhThu / 1000) : 0);
    const nguoiThamDu = months.map(m => monthDataMap[m]?.nguoiThamDu || 0);

    return (
        <div>
            {isPending ? (
                <Spinner />
            ) : (
                <ChartOrganizer
                    labels={filteredLabels}
                    organizerData={soLuongVeDaDat}
                    workshopData={doanhThu}
                    thirdData={nguoiThamDu}
                    title="Thống kê theo quý"
                    organizerLabel="Số lượng vé đã đặt"
                    workshopLabel="Doanh thu (nghìn VND)"
                    thirdLabel="Người tham dự"
                />
            )}
        </div>
    );
};

export default ChartComponent;

