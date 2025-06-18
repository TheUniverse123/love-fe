'use client'

import { fetchMostBookedWorkshops, fetchWorkshopDetail } from "@/app/api/workshop"
import { convertRemarkedWorkshop, formatDateRange, formatPrice, shuffleArray } from "@/app/util/convert"
import BookingForm from "@/components/booking-form/BookingForm"
import WorkshopDetailItem from "@/components/explore/detail/WorkshopDetailItem"
import PopularPostsSidebar from "@/components/explore/PopularPostsSidebar"
import TicketDetail from "@/components/explore/TicketDetail"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useRef, useState } from "react"

export default function WorkshopDetailPage({ params }) {
    const { data: remarkedWorkshops } = useQuery({
        queryKey: ['remarked-workshops'],
        queryFn: ({ signal }) => fetchMostBookedWorkshops({ signal, pageNumber: 1, pageSize: 5 }),
    });

    const { data: workshopDetail } = useQuery({
        queryKey: ['workshop-detail'],
        queryFn: ({ signal }) => fetchWorkshopDetail({ signal, workshopId: params?.slug }),
    });
    const [workshopDetailItem, setWorkshopDetailItem] = useState({})
    useEffect(() => {
        setWorkshopDetailItem(workshopDetail)
    }, [workshopDetail])

    const bookingFormRef = useRef(null);
    const scrollToBookingForm = () => {
        bookingFormRef.current.scrollIntoView({ behavior: "smooth" });
    };

    const result = shuffleArray(remarkedWorkshops || []);
    return (
        <main className="main main-background">
            <TicketDetail
                discount={25}
                rating={workshopDetailItem?.averageRating}
                reviews={workshopDetailItem?.approvedReviewCount}
                title={workshopDetailItem?.title}
                time={formatDateRange(workshopDetailItem?.startDate,
                    workshopDetailItem?.endDate)}
                address={workshopDetailItem?.location}
                price={formatPrice(workshopDetailItem?.price)}
                imageSrc={workshopDetailItem?.imagePath}
                link="#"
                buttonText="Đặt ngay"
                onClick={scrollToBookingForm}
                workshopId={params?.slug}
            />
            <section className="box-section box-content-tour-detail main-background" style={{ paddingBottom: "290px" }}>
                <div className="container">
                    <div className="row mt-30">
                        <div className="col-lg-8 col-md-6 col-md-12">
                            <WorkshopDetailItem workshopDetail={workshopDetailItem} />
                        </div>
                        <div className="col-lg-4 col-md-6 col-md-12">
                            <BookingForm ref={bookingFormRef} workshopDetail={workshopDetailItem} />
                            <PopularPostsSidebar title="Có thể bạn sẽ thích" posts={convertRemarkedWorkshop(result)} />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
