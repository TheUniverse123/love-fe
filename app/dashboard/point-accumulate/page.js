'use client'

import { fetchPoint, fetchPointHistory } from '@/app/api/point';
import { useQuery } from '@tanstack/react-query';
import styles from "./PointAccumulatePage.module.css";
import { Spinner } from 'react-bootstrap';
import { formatDate } from '@/app/util/convert';
import { useState } from 'react';

export default function PointAccumulatePage() {
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const [isPolicyOpen, setIsPolicyOpen] = useState(false);

    const { data: point, isLoading: isLoadingPoint } = useQuery({
        queryKey: ['point'],
        queryFn: () => fetchPoint(),
    })

    const { data: pointHistory } = useQuery({
        queryKey: ['pointHistory'],
        queryFn: () => fetchPointHistory(1, 1000),
    })

    const toggleHistory = () => setIsHistoryOpen(!isHistoryOpen);
    const togglePolicy = () => setIsPolicyOpen(!isPolicyOpen);

    return (
        <div className={styles.pointAccumulate}>
            <div className="flex-space pb-20 border-1px-bottom">
                <h4 className="white-color">Thông tin tích điểm</h4>
            </div>
            <div className='mt-30 mb-70 flex-center'>
                <div className='text-center'>
                    <img src='/assets/icon/ticket-point.svg' />
                    <h4 className='white-color flex-center mt-30'>
                        <span className='mr-10'>{isLoadingPoint ? <Spinner /> : point?.totalPoints}</span>
                        <img src='/assets/icon/star-dashboard.svg' width={51} height={51} />
                    </h4>
                    <p className='white-color text-xl-bold mt-20'>Chúc mừng bạn đã đặt level {point?.level}!</p>
                </div>
            </div>

            <div className='p-30 main-background border-1px'>
                <div className="group-collapse-expand main-background border-1px-color5 p-20">
                    <button 
                        className="btn btn-collapse p-0" 
                        type="button" 
                        onClick={toggleHistory}
                        aria-expanded={isHistoryOpen}
                    >
                        <p className="white-color text-md-bold">Lịch sử điểm thưởng</p>
                        <svg 
                            className={`stroke-white ${isHistoryOpen ? styles.rotate180 : ''}`} 
                            width={12} 
                            height={7} 
                            viewBox="0 0 12 7" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ transition: 'transform 0.3s ease' }}
                        >
                            <path d="M1 1L6 6L11 1" stroke strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <div className={`${isHistoryOpen ? 'show' : ''} mt-30`} style={{ display: isHistoryOpen ? 'block' : 'none' }}>
                        <div className="card card-body main-background">
                            <div className="list-questions">
                                {pointHistory?.items.map((item) => (
                                    <div className="item-question main-background border-color" key={item.id}>
                                        <div className="flex-space">
                                            <div>
                                                <p className="text-xl-bold neutral-400 mb-0">{formatDate(item.createdDate)}</p>
                                            </div>
                                            <div className="px-3 py-1">
                                                <p className={`mb-0 ${item.points > 0 ? styles.positive : styles.negative}`}>{item.points > 0 ? "+" : ""}{item.points} điểm</p>
                                            </div>
                                        </div>
                                        <div className="mt-10">
                                            <p className="white-color">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="group-collapse-expand main-background border-1px-color5 p-20">
                    <button 
                        className="btn btn-collapse p-0" 
                        type="button" 
                        onClick={togglePolicy}
                        aria-expanded={isPolicyOpen}
                    >
                        <p className="white-color text-md-bold">Chính sách thành viên</p>
                        <svg 
                            className={`stroke-white ${isPolicyOpen ? styles.rotate180 : ''}`} 
                            width={12} 
                            height={7} 
                            viewBox="0 0 12 7" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ transition: 'transform 0.3s ease' }}
                        >
                            <path d="M1 1L6 6L11 1" stroke strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <div className={`${isPolicyOpen ? 'show' : ''} mt-30`} style={{ display: isPolicyOpen ? 'block' : 'none' }}>
                        <div className="card card-body main-background">
                            <a rel='noopener noreferrer' target='_blank' href="https://firebasestorage.googleapis.com/v0/b/love-fe-71303.firebasestorage.app/o/policy%2FCh%C3%ADnh%20s%C3%A1ch%20th%C3%A0nh%20vi%C3%AAn.pdf?alt=media&token=f4491a3c-d142-4e91-8c2e-400c09253fa4" download className="d-flex align-items-center text-decoration-none">
                                <img src="/assets/icon/pdf-icon.svg" alt="PDF" className="me-2" width={24} height={24} />
                                <span className="white-color">Chính sách thành viên.pdf</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
