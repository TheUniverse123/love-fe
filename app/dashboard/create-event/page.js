'use client';
import { useState } from "react";
import EventInformationForm from "@/components/dashboard/EventInformationForm";
import CheckoutInformationForm from "@/components/dashboard/CheckoutInformationForm";
import TimeAndTicket from "@/components/dashboard/TimeAndTicket";
import styles from "./CreateEventPage.module.css"

export default function CreateEventPage() {
    const [activeTab, setActiveTab] = useState(1);

    const handleContinue = () => {
        setActiveTab(prevTab => prevTab + 1)
    }

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
                        className={`btn btn-default ${activeTab === 3 ? 'primary-background' : 'border-1px-primary border-background'}`}
                        style={{ padding: "11px 27px!important" }}
                    >
                        Thông tin thanh toán
                    </button>
                </div>
            </div>

            <div className={styles.tabContent}>
                <div className={`tab-pane ${activeTab === 1 ? 'show' : 'hide'}`}>
                    <EventInformationForm onContinue={handleContinue} />
                </div>
                <div className={`tab-pane ${activeTab === 2 ? 'show' : 'hide'}`}>
                    <TimeAndTicket onContinue={handleContinue} onBack={handleBack} />
                </div>
                <div className={`tab-pane ${activeTab === 3 ? 'show' : 'hide'}`}>
                    <CheckoutInformationForm onContinue={handleContinue} onBack={handleBack} />
                </div>
            </div>
        </div>
    );
}