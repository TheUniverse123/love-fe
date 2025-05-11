import BookingForm from "@/components/booking-form/BookingForm"
import WorkshopDetailItem from "@/components/explore/detail/WorkshopDetailItem"
import PopularPostsSidebar from "@/components/explore/PopularPostsSidebar"
import TicketDetail from "@/components/explore/TicketDetail"
import { posts } from "@/data"

export default function WorkshopDetailPage({ params }) {
    console.log(params.slug)

    return (
        <main className="main main-background">
            <TicketDetail
                discount={25}
                rating={4.96}
                reviews={672}
                title="WORKSHOP 'Sáng Tạo' Góc Quay Nấu Ăn Tại Nhà"
                time="10:00 - 11:30, 27 tháng 02, 2025"
                address="53/104 Trần Khánh Dư, phường Tân Định, Quận 1, Thành Phố Hồ Chí Minh"
                price="100.000"
                imageSrc="/assets/workshop/explore/detail/1.png"
                link="room-detail-2.html"
                buttonText="Đặt ngay"
            />
            <section className="box-section box-content-tour-detail main-background" style={{ paddingBottom: "290px" }}>
                <div className="container">
                    <div className="row mt-30">
                        <div className="col-md-8">
                            <WorkshopDetailItem />
                        </div>
                        <div className="col-md-4">
                            <BookingForm />
                            <PopularPostsSidebar title="Có thể bạn sẽ thích" posts={posts} />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
