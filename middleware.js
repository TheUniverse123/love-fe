import { NextResponse } from 'next/server'

export function middleware(request) {
    const userInfoRaw = request.cookies.get('userInfo')?.value

    if (!userInfoRaw) {
        console.log('Cookie userInfo không tồn tại')
        return NextResponse.redirect(new URL('/', request.url))
    }

    let accessToken
    try {
        const userInfo = JSON.parse(userInfoRaw)
        accessToken = userInfo.accessToken
    } catch (e) {
        console.log('Lỗi parse JSON:', e)
        return NextResponse.redirect(new URL('/', request.url))
    }

    if (!accessToken) {
        console.log('accessToken không tồn tại trong userInfo')
        return NextResponse.redirect(new URL('/', request.url))
    }

    console.log('accessToken:', accessToken)

    return NextResponse.next()
}

export const config = {
    matcher: ['/admin/:path*', '/dashboard/:path*'], // Chỉ áp dụng middleware cho những route này
}