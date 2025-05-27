'use client'

import React, { Suspense, useState } from 'react'
import ExploreBanner from '@/components/banner/ExploreBanner'
import ExploreSidebar from '@/components/explore/ExploreSidebar'
import ExploreWorkshops from '@/components/explore/ExploreWorkshops'

export default function ExplorePage() {
    const [filtersSelected, setFiltersSelected] = useState({
        range: 500000,
        filters: {},
        rating: [],
    });
    const onFiltersChange = (filterType, data) => {
        setFiltersSelected((prev) => ({
            ...prev,
            [filterType]: data,
        }));
    };

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <main className='main main-background'>
                <ExploreBanner />
                <section className="box-section block-content-tourlist main-background">
                    <div className="container">
                        <div className="box-content-main">
                            <ExploreWorkshops filtersSelected={filtersSelected} />
                            <ExploreSidebar
                                onFiltersChange={onFiltersChange}
                                filtersSelected={filtersSelected}
                            />
                        </div>
                    </div>
                </section>
            </main>
        </Suspense>
    )
}
