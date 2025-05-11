import FormCheckout from "@/components/checkout/FormCheckout"
import TicketCheckoutInformation from "@/components/checkout/TicketCheckoutInformation"
import TicketDetail from "@/components/explore/TicketDetail"

export default function ConfirmAndPaymentPage({ params }) {
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
                isButtonVisible={false}
            />
            <section className="box-section box-content-tour-detail main-background" style={{ paddingBottom: "290px" }}>
                <div className="container">
                    <div className="flex-space-start">
                        <div style={{ width: "59%!important" }}>
                            <FormCheckout />
                        </div>
                        <div style={{ width: "35%!important" }}>
                            <TicketCheckoutInformation />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
