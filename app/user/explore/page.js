import ExploreBanner from '@/components/banner/ExploreBanner'
import ExploreSidebar from '@/components/explore/ExploreSidebar'
import ExploreWorkshops from '@/components/explore/ExploreWorkshops'
import React, { Suspense } from 'react'

export default function ExplorePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <main className='main main-background'>
                <ExploreBanner />
                <section className="box-section block-content-tourlist main-background">
                    <div className="container">
                        <div className="box-content-main">
                            <ExploreWorkshops />
                            <ExploreSidebar />
                        </div>
                    </div>
                </section>
            </main>
        </Suspense>
    )
}
