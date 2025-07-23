import { NextResponse } from 'next/server'

export function middleware(request) {
    const userInfoRaw = request.cookies.get('userInfo')?.value

    if (!userInfoRaw) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    let accessToken
    try {
        const userInfo = JSON.parse(userInfoRaw)
        accessToken = userInfo.accessToken
    } catch (e) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    if (!accessToken) {
        return NextResponse.redirect(new URL('/', request.url))
    }
    return NextResponse.next()
}

export const config = {
    matcher: ['/admin/:path*', '/dashboard/:path*'], // Chỉ áp dụng middleware cho những route này
}