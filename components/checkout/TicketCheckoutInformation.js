'use client'

import { formatPrice } from "@/app/util/convert"
import styles from "./TicketCheckoutInformation.module.css"
import { fetchCheckout } from "@/app/api/manage-workshop"
import { toast } from "react-toastify"
import Link from "next/link"
import { Spinner } from "react-bootstrap"
import { useMutation } from "@tanstack/react-query"
export default function TicketCheckoutInformation() {
    const workshopBookingInfo = JSON.parse(localStorage.getItem("booking-info"))
    const { mutate, isPending } = useMutation({
        mutationKey: ['checkout'],
        mutationFn: (bookingInfo) => fetchCheckout(bookingInfo),
        onSuccess: (response) => {
            if (response.statusCode === 201) {
                if (workshopBookingInfo.totalPrice > 0) {
                    toast.success("Đang chuyển đến trang thanh toán")
                    window.location.href = response.result.paymentUrl
                } else {
                    toast.success("Đặt vé thành công")
                    setTimeout(() =>
                        window.location.href = "/payment/success"
                        , 2000)
                }
            } else {
                toast.error(response[0])
            }
        },
        onError: () => {
            toast.error("Có lỗi xảy ra, vui lòng thử lại sau!")
        }
    })
    async function handleCheckout() {
        const bookingInfo = {
            workshopId: workshopBookingInfo.id,
            quantity: workshopBookingInfo.quantity,
            includeAdditionalService: workshopBookingInfo.addtionalService > 0 ? true : false,
            additionalServicePrice: workshopBookingInfo.addtionalService,
            additionalServiceDescription: workshopBookingInfo.description
        }
        mutate(bookingInfo)
    }
    return (
        <section className="main-background box-section pt-20">
            <div className="secondary-background border-radius-25 p-20 mb-35">
                <div className="form-title pb-20 border-1px-white-2-bottom flex-space">
                    <h5 className="white-color">Thông tin đặt vé</h5>
                    <Link href="#" className="primary-color">Chọn lại vé</Link>
                </div>

                <div className="form-title pt-20 pb-5">
                    <p className="white-color text-md-bold mb-15">{workshopBookingInfo.name}</p>
                </div>

                <div className="flex-space pb-20 border-1px-white-2-bottom">
                    <div className="flex-center">
                        <img src="/assets/icon/ticket.svg" alt="icon ticket" />
                        <p className="primary-color">x{workshopBookingInfo.quantity}</p>
                    </div>
                    <p className="white-color text-md-bold font-20">{formatPrice(workshopBookingInfo.price)}</p>
                </div>
                <div className="row mt-25 pb-20 border-1px-white-2-bottom">
                    <div className="flex-space mb-5">
                        <p className="white-color font-16">Tạm tính</p>
                        <p className="white-color font-16">{formatPrice(workshopBookingInfo.quantity * workshopBookingInfo.price)}</p>
                    </div>
                    <div className="flex-space mb-5">
                        <p className="white-color font-16">Giảm giá</p>
                        <p className="white-color font-16">0 đ</p>
                    </div>
                    <div className="flex-space">
                        <p className="white-color font-16">Dịch vụ bổ sung</p>
                        <p className="white-color font-16">{formatPrice(workshopBookingInfo.addtionalService)}</p>
                    </div>
                </div>

                <div className="pb-20 pt-20 flex-space pb-20">
                    <h6 className="white-color">Tổng tiền</h6>
                    <h6 className="primary-color">{formatPrice(workshopBookingInfo.totalPrice)}</h6>
                </div>

                <div className="box-button-book mt-10 mr-20 ml-20 mb-25" >
                    <Link
                        href=""
                        onClick={handleCheckout}
                        className={`btn btn-book primary-background white-color hover-primary ${styles.buttonPayment}`}>
                        {isPending ? <Spinner /> : "Thanh toán"}
                    </Link>
                </div>
            </div>
        </section>
    )
}
