'use client'

import ConfirmSuccessClient from '@/components/confirm/ConfirmSuccessClient'
import { Suspense } from 'react'

export default function VerificationSuccessPage() {
    return (
        <Suspense fallback={<div>Đang xác thực...</div>}>
            <ConfirmSuccessClient />
        </Suspense>
    )
}
