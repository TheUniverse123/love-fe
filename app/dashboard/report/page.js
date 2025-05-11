import BoxStatistical from "@/components/dashboard/BoxStatistical";
import ReportContent from "@/components/dashboard/ReportContent";

export default function ReportPage() {
    return (
        <div style={{ paddingLeft: "35px", paddingTop: "20px", marginRight: "36px" }}>
            <div className="flex-space pb-20 border-1px-bottom">
                <h4 className="white-color">Quản lí báo cáo</h4>
            </div>
            <div>
                <BoxStatistical />
                <ReportContent />
            </div>
        </div>
    )
}
