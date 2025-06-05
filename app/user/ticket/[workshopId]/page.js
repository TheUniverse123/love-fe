'use client'
import { fetchWorkshopDetail } from "@/app/api/workshop"
import styles from "./ConfirmAndPaymentPage.module.css"

import FormCheckout from "@/components/checkout/FormCheckout"
import TicketCheckoutInformation from "@/components/checkout/TicketCheckoutInformation"
import TicketDetail from "@/components/explore/TicketDetail"
import { formatDateRange, formatPrice } from "@/app/util/convert"
import { useQuery } from "@tanstack/react-query"

export default function ConfirmAndPaymentPage({ params }) {
    const { data: workshopDetail } = useQuery({
        queryKey: ['workshop-detail'],
        queryFn: ({ signal }) => fetchWorkshopDetail({ signal, workshopId: params?.workshopId }),
    });

    return (
        <main className="main main-background">
            <TicketDetail
                discount={25}
                rating={workshopDetail?.averageRating}
                reviews={workshopDetail?.approvedReviewCount}
                title={workshopDetail?.title}
                time={formatDateRange(workshopDetail?.startDate,
                    workshopDetail?.endDate)}
                address={workshopDetail?.location}
                price={formatPrice(workshopDetail?.price)}
                imageSrc={workshopDetail?.imagePath}
                link=""
                buttonText="Đặt ngay"
                isButtonVisible={false}
            />
            <section className="box-section box-content-tour-detail main-background" style={{ paddingBottom: "290px" }}>
                <div className="container">
                    <div className="flex-space-start">
                        <div className={styles.formLeft}>
                            <FormCheckout />
                        </div>
                        <div className={styles.formRight}>
                            <TicketCheckoutInformation />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
