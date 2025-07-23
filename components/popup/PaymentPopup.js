import React, { useState, useEffect } from "react";
import { fetchWorkshopDetail, fetchAllBookings, fetchUpdateWorkshop } from "../../app/api/manage-workshop";
import styles from "./PaymentPopup.module.css";
import { useQuery } from "@tanstack/react-query";

export default function PaymentPopup({ open, onClose, workshopId, onConfirmPayment }) {
    const [workshopInfo, setWorkshopInfo] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [revenue, setRevenue] = useState(0);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        if (open && workshopId) {
            fetchWorkshopData();
        }
    }, [open, workshopId]);
    const fetchWorkshopData = async () => {
        setLoading(true);

        try {
            // Fetch workshop details
            const workshopData = await fetchWorkshopDetail({ workshopId });
            setWorkshopInfo(workshopData);

            // Fetch all bookings for this workshop
            const bookingsData = await fetchAllBookings({
                pageNumber: 1,
                pageSize: 1000
            });

            // Filter bookings for this specific workshop by workshopId
            const workshopBookings = bookingsData?.filter(booking =>
                booking.workshopTitle === workshopData.title
            ) || [];

            setBookings(workshopBookings);
            // Calculate total revenue from confirmed/completed bookings only
            const totalRevenue = workshopBookings.reduce((sum, booking) =>
                sum + (booking.totalPrice || 0), 0);

            setRevenue(totalRevenue);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    const handleConfirmPayment = async () => {
        if (!workshopInfo) return;
        setUpdating(true);
        try {
            // Tạo body đủ field, chỉ thay đổi accountNumber
            const body = {
                eventType: workshopInfo.eventType,
                placeName: workshopInfo.placeName,
                province: workshopInfo.province,
                district: workshopInfo.district,
                ward: workshopInfo.ward,
                street: workshopInfo.street,
                title: workshopInfo.title,
                description: workshopInfo.description,
                startDate: workshopInfo.startDate,
                endDate: workshopInfo.endDate,
                price: workshopInfo.price,
                totalTickets: workshopInfo.totalTickets,
                categoryId: workshopInfo.categoryId,
                organizationName: workshopInfo.organizationName,
                organizationInfo: workshopInfo.organizationInfo,
                location: workshopInfo.location,
                imagePath: workshopInfo.imagePath,
                organizationLogoPath: workshopInfo.organizationLogoPath,
                eventLogoPath: workshopInfo.eventLogoPath,
                ticketImagePath: workshopInfo.ticketImagePath,
                accountHolder: workshopInfo.accountHolder,
                accountNumber: (workshopInfo.accountNumber || "") + "paid",
                bankName: workshopInfo.bankName,
                branch: workshopInfo.branch,
                isBusiness: workshopInfo.isBusiness,
                invoiceName: workshopInfo.invoiceName,
                invoiceAddress: workshopInfo.invoiceAddress,
                taxCode: workshopInfo.taxCode,
                onlineMettingUrl: workshopInfo.onlineMettingUrl
            };
            await fetchUpdateWorkshop(workshopId, body);
            if (onConfirmPayment) {
                onConfirmPayment({ ...workshopInfo, accountNumber: body.accountNumber }, revenue);
            }
            onClose();
        } catch (e) {
            alert("Có lỗi khi xác nhận thanh toán!");
        } finally {
            setUpdating(false);
        }
    };

    const handleCancelPayment = () => {
        onClose();
    };

    if (!open) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.popup}>
                <div className={styles.closeButton} onClick={onClose}>
                    <span>&times;</span>
                </div>

                <div className={styles.content}>
                    <h2 className={styles.title}>Thông Tin Thanh Toán</h2>

                    {loading ? (
                        <div className={styles.loading}>Đang tải thông tin...</div>
                    ) : workshopInfo ? (
                        <>
                            {/* Workshop Information */}
                            <div className={styles.section}>
                                <h3 className={styles.sectionTitle}>Thông Tin Workshop</h3>
                                <div className={styles.workshopInfo}>
                                    <div className={styles.infoRow}>
                                        <span className={styles.label}>Tên workshop:</span>
                                        <span className={styles.value}>{workshopInfo.title}</span>
                                    </div>
                                    <div className={styles.infoRow}>
                                        <span className={styles.label}>Tổ chức:</span>
                                        <span className={styles.value}>{workshopInfo.organizationName}</span>
                                    </div>
                                    <div className={styles.infoRow}>
                                        <span className={styles.label}>Giá vé:</span>
                                        <span className={styles.value}>
                                            {workshopInfo.isFree ? 'Miễn phí' : `${workshopInfo.price?.toLocaleString('vi-VN')} VNĐ`}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Bank Account Information */}
                            <div className={styles.section}>
                                <h3 className={styles.sectionTitle}>Thông Tin Tài Khoản</h3>
                                <div className={styles.bankInfo}>
                                    <div className={styles.infoRow}>
                                        <span className={styles.label}>Chủ tài khoản:</span>
                                        <span className={styles.value}>{workshopInfo.accountHolder}</span>
                                    </div>
                                    <div className={styles.infoRow}>
                                        <span className={styles.label}>Số tài khoản:</span>
                                        <span className={styles.value}>{workshopInfo.accountNumber}</span>
                                    </div>
                                    <div className={styles.infoRow}>
                                        <span className={styles.label}>Ngân hàng:</span>
                                        <span className={styles.value}>{workshopInfo.bankName}</span>
                                    </div>
                                    <div className={styles.infoRow}>
                                        <span className={styles.label}>Chi nhánh:</span>
                                        <span className={styles.value}>{workshopInfo.branch}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Revenue Information */}
                            <div className={styles.section}>
                                <h3 className={styles.sectionTitle}>Thống Kê Doanh Thu</h3>
                                <div className={styles.revenueInfo}>
                                    <div className={styles.infoRow}>
                                        <span className={styles.label}>Tổng số đặt vé:</span>
                                        <span className={styles.value}>{bookings.length}</span>
                                    </div>
                                    <div className={styles.infoRow}>
                                        <span className={styles.label}>Vé đã xác nhận:</span>
                                        <span className={styles.value}>
                                            {bookings.filter(b => b.status !== 'Expired' && b.status !== 'Cancelled').length}
                                        </span>
                                    </div>
                                    <div className={styles.infoRow}>
                                        <span className={styles.label}>Vé đã hết hạn:</span>
                                        <span className={styles.value}>
                                            {bookings.filter(b => b.status === 'Expired').length}
                                        </span>
                                    </div>
                                    <div className={styles.infoRow}>
                                        <span className={styles.label}>Tổng doanh thu:</span>
                                        <span className={styles.value}>{revenue.toLocaleString('vi-VN')} VNĐ</span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className={styles.actions}>
                                <button
                                    className={`${styles.button} ${styles.confirmButton}`}
                                    onClick={handleConfirmPayment}
                                    disabled={updating}
                                >
                                    {updating ? 'Đang xác nhận...' : 'Xác Nhận Thanh Toán'}
                                </button>
                                <button
                                    className={`${styles.button} ${styles.cancelButton}`}
                                    onClick={handleCancelPayment}
                                    disabled={updating}
                                >
                                    Hủy Thanh Toán
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className={styles.error}>Không thể tải thông tin workshop</div>
                    )}
                </div>
            </div>
        </div>
    );
} 