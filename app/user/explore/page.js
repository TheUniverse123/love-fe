import ExploreBanner from '@/components/banner/ExploreBanner'
import ExploreSidebar from '@/components/explore/ExploreSidebar'
import ExploreWorkshops from '@/components/explore/ExploreWorkshops'
import React from 'react'

export default function ExplorePage() {
    return (
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
    )
}
