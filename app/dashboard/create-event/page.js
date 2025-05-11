'use client';
import { useState } from "react";
import EventInformationForm from "@/components/dashboard/EventInformationForm";
import CheckoutInformationForm from "@/components/dashboard/CheckoutInformationForm";
import TimeAndTicket from "@/components/dashboard/TimeAndTicket";

export default function CreateEventPage() {
    const [activeTab, setActiveTab] = useState(1);
    const handleTabChange = (tabIndex) => {
        setActiveTab(tabIndex);
    };

    return (
        <div style={{ marginRight: activeTab === 2 ? "160px" : "380px", paddingLeft: "35px", paddingTop: "20px" }}>
            <div className="flex-space pb-20 border-1px-bottom">
                <h4 className="white-color">Tạo sự kiện</h4>
            </div>

            <div className="tab-buttons">
                <div className="mt-30 flex-center">
                    <button
                        onClick={() => handleTabChange(1)} // Gọi hàm chuyển tab
                        className={`btn btn-default ${activeTab === 1 ? 'primary-background' : 'border-1px-primary border-background'}`}
                        style={{ padding: "11px 27px!important" }}
                    >
                        Thông tin sự kiện
                    </button>

                    <div className="separator primary-background" style={{
                        width: "58px",
                        height: "1px",
                        backgroundColor: "#E0E0E0",
                    }}></div>

                    <button
                        onClick={() => handleTabChange(2)} // Gọi hàm chuyển tab
                        className={`btn btn-default ${activeTab === 2 ? 'primary-background' : 'border-1px-primary border-background'}`}
                        style={{ padding: "11px 27px!important" }}
                    >
                        Thời gian và giá vé
                    </button>

                    <div className="separator primary-background" style={{
                        width: "58px",
                        height: "1px",
                        backgroundColor: "#E0E0E0",
                    }}></div>

                    <button
                        onClick={() => handleTabChange(3)} // Gọi hàm chuyển tab
                        className={`btn btn-default ${activeTab === 3 ? 'primary-background' : 'border-1px-primary border-background'}`}
                        style={{ padding: "11px 27px!important" }}
                    >
                        Thông tin thanh toán
                    </button>
                </div>
            </div>

            {activeTab === 1 && <EventInformationForm />}
            {activeTab === 2 && <TimeAndTicket />}
            {activeTab === 3 && <CheckoutInformationForm />}
        </div>
    );
}
