'use client'
import { fetchDashboardWidget } from "@/app/api/dashboard";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "react-bootstrap";
import StatisticsItem from "./StatisticsItem";
import { formatPrice } from "@/app/util/convert";

export default function BoxStatistical() {
    const { data, isPending } = useQuery({
        queryKey: ['statistics-items'],
        queryFn: fetchDashboardWidget,
    })
    return (
        <div className="section-box box-statistical mt-35 mb-35">
            {isPending ? <Spinner /> : <div className="row">
                <StatisticsItem number={data?.totalTicketsSold} text="Tổng số vé đã bán" />
                <StatisticsItem number={formatPrice(data?.totalRevenue)} text="Doanh thu" />
                <StatisticsItem number={data?.newCustomersThisWeek} text="Số lượng khách hàng mới" />
                <StatisticsItem number={data?.newWorkshopsThisWeek} text="Workshop đã tạo" />
            </div>}
        </div>
    )
}
