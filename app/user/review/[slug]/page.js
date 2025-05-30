'use client'

import { fetchWorkshopDetail } from "@/app/api/workshop";
import { formatDateRange, formatPrice } from "@/app/util/convert";
import BookingForm from "@/components/booking-form/BookingForm"
import WorkshopDetailItem from "@/components/explore/detail/WorkshopDetailItem"
import TicketDetail from "@/components/explore/TicketDetail"
import { useQuery } from "@tanstack/react-query";

export default function ReviewDetail({ params }) {
    const { data: workshopDetail } = useQuery({
        queryKey: ['workshop-detail'],
        queryFn: ({ signal }) => fetchWorkshopDetail({ signal, workshopId: params?.slug }),
    });

    return (
        <main className="main main-background">
            <TicketDetail
                discount={25}
                rating={workshopDetail?.averageRating}
                reviews={workshopDetail?.approvedReviewCount}
                title={workshopDetail?.title}
                time={formatDateRange(workshopDetail?.startDate, workshopDetail?.endDate)}
                address={workshopDetail?.location}
                price={formatPrice(workshopDetail?.price)}
                imageSrc={workshopDetail?.imagePath}
                link=""
                buttonText="Đặt ngay"
                mode="review"
                isButtonVisible={false}
            />
            <section className="box-section box-content-tour-detail main-background" style={{ paddingBottom: "290px" }}>
                <div className="container">
                    <div className="row mt-30">
                        <div className="col-lg-8 col-md-6 col-md-12">
                            <WorkshopDetailItem mode="review" workshopDetail={workshopDetail} />
                        </div>
                        <div className="col-lg-4 col-md-6 col-md-12">
                            <BookingForm mode="review" workshopDetail={workshopDetail} />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
