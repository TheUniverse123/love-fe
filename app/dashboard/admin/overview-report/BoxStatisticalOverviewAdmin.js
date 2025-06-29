'use client'
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "react-bootstrap";
import StatisticsItem from "@/components/dashboard/StatisticsItem";
import { formatPrice } from "@/app/util/convert";
import { fetchAdminDashboardOverview } from "@/app/api/admin-dashboard";

export default function BoxStatisticalOverviewAdmin() {
    const { data, isPending } = useQuery({
        queryKey: ['statistics-admin-overview'],
        queryFn: fetchAdminDashboardOverview,
    })
    return (
        <div className="section-box box-statistical mt-35 mb-35">
            {isPending ? <Spinner /> : <div className="row">
                <StatisticsItem number={data?.totalTicketsSold} text="Tổng số vé đã bán" isUp={data?.ticketsSoldChangePercent} />
                <StatisticsItem number={formatPrice(data?.totalRevenue)} text="Doanh thu" isUp={data?.revenueChangePercent} />
                <StatisticsItem number={data?.totalOrganizers} text="Nhà tổ chức workshop" isUp={data?.organizersChangePercent} />
                <StatisticsItem number={data?.ongoingWorkshops} text="Workshop đang diễn ra" isUp={data?.ongoingWorkshopsChangePercent} />
            </div>}
        </div>
    )
}
