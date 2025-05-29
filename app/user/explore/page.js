'use client'

import ExploreBanner from '@/components/banner/ExploreBanner'
import ExploreSidebar from '@/components/explore/ExploreSidebar'
import ExploreWorkshops from '@/components/explore/ExploreWorkshops'
import { Suspense, useEffect, useState } from 'react'

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
    useEffect(() => {
        // Kiểm tra window có tồn tại (chỉ client)
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            const v = params.get("value");
            if (v) {
                setFiltersSelected({
                    range: 500000,
                    filters: {
                        ["Thể loại"]: [v]
                    },
                    rating: []
                })
            }
        }
    }, [])
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
