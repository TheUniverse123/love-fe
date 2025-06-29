'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserInfo } from "@/app/util/auth";
import { fetchUserInfo } from "@/app/api/account";
import { useQuery } from "@tanstack/react-query";
import BoxStatisticalOverviewAdmin from "./BoxStatisticalOverviewAdmin";
import ReportContentOverviewAdmin from "./ReportContentOverviewAdmin";

export default function OverviewReportPage() {
    const router = useRouter();
    const userInfo = getUserInfo();
    const [isAuthorized, setIsAuthorized] = useState(false);

    const { data: userData, isLoading } = useQuery({
        queryKey: ['user-info'],
        queryFn: ({ signal }) => fetchUserInfo({ signal, userId: userInfo?.id }),
        enabled: !!userInfo?.id,
    });

    useEffect(() => {
        if (!isLoading && userData) {
            const hasAdminRole = userData?.result?.roles?.includes("Admin");
            if (!hasAdminRole) {
                router.push('/dashboard');
            } else {
                setIsAuthorized(true);
            }
        }
    }, [userData, isLoading, router]);

    if (isLoading) {
        return (
            <div style={{ paddingLeft: "35px", paddingTop: "20px", marginRight: "36px" }}>
                <div className="flex-space pb-20 border-1px-bottom">
                    <h4 className="white-color">Đang tải...</h4>
                </div>
            </div>
        );
    }

    if (!isAuthorized) {
        return null;
    }

    return (
        <div style={{ paddingLeft: "35px", paddingTop: "20px", marginRight: "36px" }}>
            <div className="flex-space pb-20 border-1px-bottom">
                <h4 className="white-color">Quản lí báo cáo</h4>
            </div>
            <div>
                <BoxStatisticalOverviewAdmin />
                <ReportContentOverviewAdmin />
            </div>
        </div>
    )
}