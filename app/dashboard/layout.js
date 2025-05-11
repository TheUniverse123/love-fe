import DashboardSidebar from "@/components/sidebar/DashboardSidebar";

export default function layout({ children }) {
    return (
        <main class="main d-flex">
            <DashboardSidebar />
            <div class="box-content sidebar-background" style={{ width: "100%" }}>
                {children}
            </div>
        </main>
    )
}
