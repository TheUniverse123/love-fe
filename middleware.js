export function middleware(request) {
    // const url = request.url;
    // const response = NextResponse.next();

    // // Kiểm tra URL để xác định trang
    // const isUserPage = !url.includes("/dashboard");
    // const isDashboardPage = url.includes("/dashboard");

    // if (isUserPage) {
    //     response.cookies.set("isUserPage", "true", { path: "/" });
    //     response.cookies.set("isDashboardPage", "false", { path: "/" });
    // } else if (isDashboardPage) {
    //     response.cookies.set("isUserPage", "false", { path: "/" });
    //     response.cookies.set("isDashboardPage", "true", { path: "/" });
    // }

    // return response;
}

export const config = {
    matcher: "/:path*",
};
