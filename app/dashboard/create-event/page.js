'use client';
import { useEffect, useRef, useState } from "react";
import EventInformationForm from "@/components/dashboard/EventInformationForm";
import CheckoutInformationForm from "@/components/dashboard/CheckoutInformationForm";
import TimeAndTicket from "@/components/dashboard/TimeAndTicket";
import styles from "./CreateEventPage.module.css"
import { fetchCreateTicket, fetchCreateWorkshop, fetchUpdateTicket, fetchUpdateWorkshop } from "@/app/api/manage-workshop";
import { uploadImageToFirebase } from "@/app/util/uploadImage";
import { toast } from "react-toastify";
import EventPendingPopup from "@/components/popup/EventPendingPopup";

const convertToVietnamTime = (dateString) => {
    if (!dateString) return dateString;
    const date = new Date(dateString);
    return new Date(date.getTime() + (7 * 60 * 60 * 1000)).toISOString();
};

export default function CreateEventPage({ mode = 'create', initialWorkshop = null, initialTicket = null }) {
    const [activeTab, setActiveTab] = useState(1);
    const eventFormRef = useRef();
    const ticketFormRef = useRef();
    const checkoutFormRef = useRef();
    const [showPendingPopup, setShowPendingPopup] = useState(false);
    const handleContinue = () => {
        setActiveTab(prevTab => prevTab + 1)
    }
    useEffect(() => {
        if (mode === 'edit' && initialWorkshop && eventFormRef.current) {
            eventFormRef.current.prefillData(initialWorkshop);
        }

        if (mode === 'edit' && initialTicket && ticketFormRef.current) {
            ticketFormRef.current.prefillData({ ...initialWorkshop });
        }

        if (mode === 'edit' && initialWorkshop && checkoutFormRef.current) {
            checkoutFormRef.current.prefillData(initialWorkshop);
        }
    }, [mode, initialWorkshop, initialTicket]);
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
                startDate: convertToVietnamTime(ticketData.eventStartDate),
                endDate: convertToVietnamTime(ticketData.eventEndDate),
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

            if (workshopResponse.statusCode !== 201) {
                toast.error(workshopResponse[0])
                return
            }

            // Gọi API tạo ticket
            const ticketInfo = {
                workshopId: workshopResponse?.result.workshopId,
                ticketName: ticketData.ticketName,
                minQuantityPerOrder: Number(ticketData.minTickets),
                maxQuantityPerOrder: Number(ticketData.maxTickets),
                saleStartDate: convertToVietnamTime(ticketData.ticketSaleStartDate),
                saleEndDate: convertToVietnamTime(ticketData.ticketSaleEndDate),
            };
            const ticketResponse = await fetchCreateTicket(ticketInfo);
            if (ticketResponse.statusCode !== 201) {
                toast.error(ticketResponse[0])
                return
            }
            toast.success("🎉 Tạo sự kiện và vé thành công!");
            localStorage.setItem("activeItem", "event")
            setShowPendingPopup(true);
        } catch (err) {
            toast.error("Đã có lỗi xảy ra, vui lòng thử lại.");
        }
    };

    const handleUpdateWorkshopAndTicket = async () => {
        try {
            const eventData = eventFormRef.current.getData();
            const ticketData = ticketFormRef.current.getData();
            const checkoutData = checkoutFormRef.current.getData();
            const [
                eventLogoUrl,
                backgroundUrl,
                organizerLogoUrl,
                ticketImageUrl
            ] = await Promise.all([
                eventData.eventLogoPath !== initialWorkshop.eventLogoPath ?
                    uploadImageToFirebase(eventData.eventLogoPath, 'eventLogoPath') :
                    initialWorkshop.eventLogoPath,
                eventData.imagePath !== initialWorkshop.imagePath ?
                    uploadImageToFirebase(eventData.imagePath, 'imagePath') :
                    initialWorkshop.imagePath,
                eventData.organizationLogoPath !== initialWorkshop.organizationLogoPath ?
                    uploadImageToFirebase(eventData.organizationLogoPath, 'organizationLogoPath') :
                    initialWorkshop.organizationLogoPath,
                ticketData.ticketPath !== initialWorkshop.ticketImagePath ?
                    uploadImageToFirebase(ticketData.ticketPath, 'ticketImagePath') :
                    initialWorkshop.ticketImagePath,
            ]);

            const updatedWorkshop = {
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
                startDate: convertToVietnamTime(ticketData.eventStartDate),
                endDate: convertToVietnamTime(ticketData.eventEndDate),
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
                taxCode: checkoutData.businessType === 'business' ? checkoutData.taxCode : 'none',
                workshopId: initialWorkshop.workshopId
            };
            await fetchUpdateWorkshop(initialWorkshop.workshopId, updatedWorkshop);

            const updatedTicket = {
                workshopId: initialWorkshop.workshopId,
                ticketName: ticketData.ticketName,
                minQuantityPerOrder: Number(ticketData.minTickets),
                maxQuantityPerOrder: Number(ticketData.maxTickets),
                saleStartDate: convertToVietnamTime(ticketData.ticketSaleStartDate),
                saleEndDate: convertToVietnamTime(ticketData.ticketSaleEndDate)
            };

            const ticketResponse = await fetchUpdateTicket(initialTicket.workshopTicketInfoId, updatedTicket);
            if (ticketResponse.statusCode !== 200) {
                toast.error(ticketResponse[0])
                return
            }
            toast.success("🎉 Cập nhật thành công!");
            localStorage.setItem("activeItem", "event")
            setTimeout(() => {
                window.location.href = "/dashboard/my-event"
            }, 2000)
        } catch (err) {
            toast.error("❌ Có lỗi xảy ra khi cập nhật.");
        }
    };
    const handleBack = () => {
        setActiveTab(prevTab => prevTab - 1)
    }
    return (
        <div className={styles.container} style={{ marginRight: activeTab === 2 ? "100px" : "380px", paddingLeft: "35px", paddingTop: "20px" }}>
            <div className="flex-space pb-20 border-1px-bottom">
                <h4 className="white-color">{mode === 'edit' ? "Cập nhật sự kiện" : "Tạo sự kiện"}</h4>
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
                    <CheckoutInformationForm formRef={checkoutFormRef} onBack={handleBack} onCreate={mode === "create" ? handleCreateWorkshopAndTicket : handleUpdateWorkshopAndTicket} />
                </div>
            </div>
            <EventPendingPopup open={showPendingPopup} onClose={() => setShowPendingPopup(false)} />
        </div>
    );
}