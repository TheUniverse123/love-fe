import StatisticsItem from "./StatisticsItem";

export default function BoxStatistical() {
    return (
        <div className="section-box box-statistical mt-35 mb-35">
            <div className="row">
                <StatisticsItem number="162" percent="25" text="Tổng số vé đã bán" isSuccess={true} />
                <StatisticsItem number="930" percent="15" text="Doanh thu" isSuccess={true} />
                <StatisticsItem number="27" percent="-3" text="Số lượng khách hàng mới" isSuccess={false} />
                <StatisticsItem number="16" percent="14" text="Số lượng workshop mới" isSuccess={true} />
            </div>
        </div>
    )
}
