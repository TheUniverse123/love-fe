'use client';
import { useRef, useState } from "react";
import EventInformationForm from "@/components/dashboard/EventInformationForm";
import CheckoutInformationForm from "@/components/dashboard/CheckoutInformationForm";
import TimeAndTicket from "@/components/dashboard/TimeAndTicket";
import styles from "./CreateEventPage.module.css"
import { fetchCreateTicket, fetchCreateWorkshop } from "@/app/api/manage-workshop";
import { uploadImageToFirebase } from "@/app/util/uploadImage";
import { toast } from "react-toastify";

export default function CreateEventPage() {
    const [activeTab, setActiveTab] = useState(1);
    const eventFormRef = useRef();
    const ticketFormRef = useRef();
    const checkoutFormRef = useRef();
    const handleContinue = () => {
        setActiveTab(prevTab => prevTab + 1)
    }
    const handleCreateWorkshopAndTicket = async () => {
        try {
            const eventData = eventFormRef.current?.getData();
            const ticketData = ticketFormRef.current?.getData();
            const checkoutData = checkoutFormRef.current?.getData();

            const [
                eventLogoUrl,
                backgroundUrl,
                organizerLogoUrl,
                ticketImageUrl
            ] = await Promise.all([
                uploadImageToFirebase(eventData.eventLogoPath, 'eventLogoPath'),
                uploadImageToFirebase(eventData.imagePath, 'imagePath'),
                uploadImageToFirebase(eventData.organizationLogoPath, 'organizationLogoPath'),
                uploadImageToFirebase(ticketData.ticketPath, 'ticketImagePath'),
            ]);

            const workshopInfo = {
                eventType: eventData.paymentMethod,
                placeName: eventData.eventAddressName,
                province: eventData.province,
                district: eventData.district,
                ward: eventData.ward,
                street: eventData.houseNumber,
                title: eventData.eventName,
                description: eventData.eventDescription,
                imagePath: backgroundUrl,
                eventLogoPath: eventLogoUrl,
                ticketImagePath: ticketImageUrl,
                startDate: ticketData.eventStartDate,
                endDate: ticketData.eventEndDate,
                isFree: ticketData.isChecked === true,
                price: Number(ticketData.ticketPrice),
                totalTickets: Number(ticketData.totalTickets),
                categoryId: Number(eventData.categoryId),
                organizationName: eventData.organizerName,
                organizationInfo: eventData.organizerInfo,
                organizationLogoPath: organizerLogoUrl,
                accountHolder: checkoutData.accountHolder,
                accountNumber: checkoutData.accountNumber,
                bankName: checkoutData.bankName,
                branch: checkoutData.branch,
                isBusiness: checkoutData.businessType === 'business',
                invoiceName: checkoutData.fullName,
                invoiceAddress: checkoutData.address,
                taxCode: checkoutData.businessType === 'business' ? checkoutData.taxCode : 'none'
            };

            const workshopResponse = await fetchCreateWorkshop(workshopInfo);

            if (!workshopResponse?.result.workshopId) {
                throw new Error("Tạo workshop thất bại hoặc không trả về ID.");
            }

            // Gọi API tạo ticket
            const ticketInfo = {
                workshopId: workshopResponse?.result.workshopId,
                ticketName: ticketData.ticketName,
                minQuantityPerOrder: Number(ticketData.minTickets),
                maxQuantityPerOrder: Number(ticketData.maxTickets),
                saleStartDate: ticketData.ticketSaleStartDate,
                saleEndDate: ticketData.ticketSaleEndDate,
            };
            await fetchCreateTicket(ticketInfo);
            toast.success("🎉 Tạo sự kiện và vé thành công!");
        } catch (err) {
            console.error("❌ Lỗi khi tạo workshop/ticket:", err);
            toast.error("Đã có lỗi xảy ra, vui lòng thử lại.");
        }
    };


    const handleBack = () => {
        setActiveTab(prevTab => prevTab - 1)
    }
    return (
        <div className={styles.container} style={{ marginRight: activeTab === 2 ? "100px" : "380px", paddingLeft: "35px", paddingTop: "20px" }}>
            <div className="flex-space pb-20 border-1px-bottom">
                <h4 className="white-color">Tạo sự kiện</h4>
            </div>

            <div className="tab-buttons">
                <div className="mt-30 flex-center">
                    <button
                        className={`${styles.tab} btn btn-default ${activeTab === 1 ? 'primary-background' : 'border-1px-primary border-background'}`}
                    >
                        Thông tin sự kiện
                    </button>

                    <div className={`separator primary-background ${styles.seperator}`}></div>

                    <button
                        className={`${styles.tab} btn btn-default ${activeTab === 2 ? 'primary-background' : 'border-1px-primary border-background'}`}
                    >
                        Thời gian và giá vé
                    </button>

                    <div className={`separator primary-background ${styles.seperator}`}></div>

                    <button
                        className={`${styles.tab} btn btn-default ${activeTab === 3 ? 'primary-background' : 'border-1px-primary border-background'}`}
                    >
                        Thông tin thanh toán
                    </button>
                </div>
            </div>

            <div className={styles.tabContent}>
                <div className={`tab-pane ${activeTab === 1 ? 'show' : 'hide'}`}>
                    <EventInformationForm formRef={eventFormRef} onContinue={handleContinue} />
                </div>
                <div className={`tab-pane ${activeTab === 2 ? 'show' : 'hide'}`}>
                    <TimeAndTicket formRef={ticketFormRef} onContinue={handleContinue} onBack={handleBack} />
                </div>
                <div className={`tab-pane ${activeTab === 3 ? 'show' : 'hide'}`}>
                    <CheckoutInformationForm formRef={checkoutFormRef} onBack={handleBack} onCreate={handleCreateWorkshopAndTicket} />
                </div>
            </div>
        </div>
    );
}