'use client'

import { filters, posts } from '@/data';
import FilterBlock from './FilterBlock';
import PopularPostsSidebar from './PopularPostsSidebar';
import FilterRange from './FilterRange';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchMostBookedWorkshops } from '@/app/api/workshop';
import { convertRemarkedWorkshop, shuffleArray } from '@/app/util/convert';

export default function ExploreSidebar({ onFiltersChange, filtersSelected }) {
    const [isRatingOpen, setIsRatingOpen] = useState(true);

    const handleRatingChange = (ratingValue, checked) => {
        let newRating = [...filtersSelected.rating];
        if (checked) {
            if (!newRating.includes(ratingValue)) newRating.push(ratingValue);
        } else {
            newRating = newRating.filter(r => r !== ratingValue);
        }
        onFiltersChange('rating', newRating);
    };

    const { data: remarkedWorkshops } = useQuery({
        queryKey: ['remarked-workshops'],
        queryFn: ({ signal }) => fetchMostBookedWorkshops({ signal, pageNumber: 1, pageSize: 5 }),
    });

    const result = shuffleArray(remarkedWorkshops || []);

    // Hàm toggle collapse phần đánh giá
    const toggleRatingCollapse = () => {
        setIsRatingOpen(prev => !prev);
    };

    return (
        <div className="content-left order-lg-first">
            <div className="sidebar-left border-1 main-secondary-background border-color">
                <div className="box-filters-sidebar">
                    <FilterRange
                        selectedRange={filtersSelected.range}
                        onChange={(rangeValue) => onFiltersChange('range', rangeValue)}
                    />
                    {filters.map((filter, index) => (
                        <FilterBlock
                            key={index}
                            title={filter.title}
                            items={filter.items}
                            selectedItems={filtersSelected.filters[filter.title] || []}
                            onChange={(selectedItems) => {
                                onFiltersChange('filters', {
                                    ...filtersSelected.filters,
                                    [filter.title]: selectedItems,
                                });
                            }}
                        />
                    ))}
                    <div className="block-filter border-1 border-color">
                        <h6
                            className="text-lg-bold item-collapse white-color"
                            style={{ cursor: 'pointer' }}
                            onClick={toggleRatingCollapse}
                        >
                            Đánh giá
                        </h6>
                        {isRatingOpen && (
                            <div className="box-collapse scrollFilter">
                                <ul className="list-filter-checkbox">
                                    {[5, 4, 3, 2, 1].map(star => (
                                        <li key={star}>
                                            <label className="cb-container">
                                                <input
                                                    type="checkbox"
                                                    checked={filtersSelected.rating.includes(star)}
                                                    onChange={(e) => handleRatingChange(star, e.target.checked)}
                                                />
                                                <span className="text-sm-medium white-color">
                                                    {Array(star).fill(0).map((_, i) => (
                                                        <img
                                                            key={i}
                                                            src="/assets/lib/user/imgs/template/icons/star-yellow.svg"
                                                            alt="star"
                                                        />
                                                    ))}
                                                    {Array(5 - star).fill(0).map((_, i) => (
                                                        <img
                                                            key={i}
                                                            src="/assets/lib/user/imgs/template/icons/star-grey.svg"
                                                            alt="star"
                                                        />
                                                    ))}
                                                </span>
                                                <span className="checkmark black-color" />
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <PopularPostsSidebar title="Workshop nổi bật" posts={convertRemarkedWorkshop(result)} />
            <div className="mb-10">
                <img src="/assets/banner/banner-small.png" alt="banner-small" />
            </div>
            <div className="mb-10">
                <img src="/assets/banner/banner-small.png" alt="banner-small" />
            </div>
        </div>
    );
}
