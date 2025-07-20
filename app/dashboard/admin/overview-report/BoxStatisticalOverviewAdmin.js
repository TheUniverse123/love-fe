'use client'
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "react-bootstrap";
import StatisticsItem from "@/components/dashboard/StatisticsItem";
import { formatPrice } from "@/app/util/convert";
import { fetchAdminDashboardOverview } from "@/app/api/admin-dashboard";
import { fetchAllBookings } from "@/app/api/manage-workshop";

export default function BoxStatisticalOverviewAdmin() {
    const { data, isPending } = useQuery({
        queryKey: ['statistics-admin-overview'],
        queryFn: fetchAdminDashboardOverview,
    })

    const { data: allBookings, isPending: bookingsPending } = useQuery({
        queryKey: ['all-bookings-statistics'],
        queryFn: ({ signal }) => fetchAllBookings({ signal, pageNumber: 1, pageSize: 1000 }),
    })

    const paidTicketsCount = allBookings
        ?.filter(booking => {
            return booking.ticketPrice > 0
        })
        ?.reduce((total, booking) => total + booking.quantity, 0) || 0;

    return (
        <div className="section-box box-statistical mt-35 mb-35">
            {isPending ? <Spinner /> : <div className="row">
                <StatisticsItem number={data?.totalTicketsSold} text="Vé có phí / tổng vé" isUp={Math.round(data?.ticketsSoldChangePercent)} isAdditional={paidTicketsCount} />
                <StatisticsItem number={formatPrice(data?.totalRevenue)} text="Doanh thu" isUp={Math.round(data?.revenueChangePercent)} />
                <StatisticsItem number={data?.totalOrganizers} text="Nhà tổ chức workshop" isUp={Math.round(data?.organizersChangePercent)} />
                <StatisticsItem number={data?.ongoingWorkshops} text="Workshop đang diễn ra" isUp={Math.round(data?.ongoingWorkshopsChangePercent)} />
            </div>}
        </div>
    )
}
