'use client';
import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto'; // Import Chart.js
import styles from './ChartComponent.module.css'; // Import CSS module
import { useQuery } from '@tanstack/react-query';
import { fetchMonthlyStats } from '@/app/api/dashboard';
import { Spinner } from 'react-bootstrap';

const ChartComponent = () => {
    const chartRef = useRef(null);
    const [legend, setLegend] = useState([{
        text: 'Số lượng vé đã đặt',
        fillStyle: '#03D40B', // Xanh lá cây
    }, {
        text: 'Doanh thu',
        fillStyle: '#FB18E4', // Xanh dương
    }, {
        text: 'Người tham dự',
        fillStyle: '#FBA018', // Cam
    }]);

    const [chartData, setChartData] = useState({
        soLuongVeDaDat: [120, 150, 180, 220, 210, 200, 180, 160, 170, 180, 250, 220],
        doanhThu: [150, 180, 210, 240, 230, 220, 190, 200, 220, 210, 250, 200],
        nguoiThamDu: [100, 130, 160, 190, 180, 170, 150, 140, 160, 170, 200, 230],
    })
    const { data, isPending } = useQuery({
        queryKey: ['statistics-monthly'],
        queryFn: fetchMonthlyStats,
    })
    useEffect(() => {
        if (data) {
            setChartData({
                soLuongVeDaDat: data.map(item => item.soLuongVeDaDat),
                doanhThu: data.map(item => item.doanhThu / 26000),
                nguoiThamDu: data.map(item => item.nguoiThamDu),
            });
        }
    }, [data]);
    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'], // Tháng
                datasets: [{
                    label: 'Số lượng vé đã đặt',
                    data: chartData.soLuongVeDaDat,
                    borderColor: '#03D40B', // Xanh lá cây
                    backgroundColor: 'transparent',
                    borderWidth: 1,
                    tension: 0.4, // Đường cong
                    pointStyle: 'dash' // Loại bỏ dấu chấm
                }, {
                    label: 'Doanh thu',
                    data: chartData.doanhThu,
                    borderColor: '#FB18E4', // Xanh dương
                    backgroundColor: 'transparent',
                    borderWidth: 1,
                    tension: 0.4, // Đường cong
                    pointStyle: 'dash' // Loại bỏ dấu chấm
                }, {
                    label: 'Người tham dự',
                    data: chartData.nguoiThamDu,
                    borderColor: '#FBA018', // Cam
                    backgroundColor: 'transparent',
                    borderWidth: 1,
                    tension: 0.4, // Đường cong
                    pointStyle: 'dash' // Loại bỏ dấu chấm
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false, // Ẩn thanh mô tả mặc định
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: true,
                            color: 'transparent', // Lưới màu trắng mờ
                            lineWidth: 0.5,
                            borderDash: [5, 5], // Lưới cách nhau một khoảng
                        },
                        ticks: {
                            color: 'white', // Màu của nhãn trục X
                        }
                    },
                    y: {
                        grid: {
                            display: true,
                            color: 'transparent', // Lưới màu trắng mờ
                            lineWidth: 0.5,
                            borderDash: [5, 5], // Lưới cách nhau một khoảng
                        },
                        ticks: {
                            color: 'white', // Màu của nhãn trục Y
                            stepSize: 10,
                        }
                    }
                }
            }
        });
        const customLegend = myChart.data.datasets.map((dataset, i) => ({
            text: dataset.label,
            fillStyle: dataset.borderColor,
        }));
        setLegend(customLegend);

        return () => {
            myChart.destroy();
        };
    }, [chartData]);
    return (
        <div className={styles.chartContainer}>
            <canvas ref={chartRef} className={styles.chartCanvas}></canvas>
            <div className={`${styles.chartLegend} d-flex mt-30`}>
                {isPending ? <Spinner /> : legend.map((item, index) => (
                    <div key={index} className="chart-legend mr-20">
                        <span className='flex-center' style={{ color: "#737373" }}>
                            <div
                                className='mr-5'
                                style={{ backgroundColor: item.fillStyle, width: "8px", height: "8px", borderRadius: "50%" }}
                            ></div>
                            {item.text}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChartComponent;

