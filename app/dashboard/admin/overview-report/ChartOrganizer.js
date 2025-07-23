'use client'

import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend, LineController, BarController } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import styles from './ChartRevenue.module.css';
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, LineController, BarController);
function useXTicksFontSize() {
  const [fontSize, setFontSize] = useState(13);
  useEffect(() => {
    const updateFontSize = () => {
      if (window.innerWidth < 900) setFontSize(10);
      else if (window.innerWidth < 1500) setFontSize(11);
      else setFontSize(13);
    };
    updateFontSize();
    window.addEventListener('resize', updateFontSize);
    return () => window.removeEventListener('resize', updateFontSize);
  }, []);
  return fontSize;
}
const getNiceStepSize = (max) => {
  const niceNumbers = [1, 2, 5, 10, 20, 25, 50, 100, 200, 500, 1000, 2000, 5000];
  const targetSteps = 6;
  const roughStep = max / targetSteps;
  let niceStep = niceNumbers[0];
  for (let i = 0; i < niceNumbers.length; i++) {
    if (niceNumbers[i] >= roughStep) {
      if (i > 0 && niceNumbers[i] > roughStep * 2) {
        niceStep = niceNumbers[i - 1];
      } else {
        niceStep = niceNumbers[i];
      }
      break;
    }
  }
  return niceStep;
};

const defaultLabels = [
  '01/07/2025',
  '08/07/2025',
  '15/07/2025',
  '22/07/2025',
  '29/07/2025',
];
const defaultOrganizerData = [220, 200, 230, 220, 220];
const defaultWorkshopData = [180, 160, 160, 130, 150];

function ChartOrganizer({
  labels = defaultLabels,
  organizerData = defaultOrganizerData,
  workshopData = defaultWorkshopData,
  thirdData = [],
  title = 'Bên nhà tổ chức',
  organizerLabel = 'Số người tổ chức workshop',
  workshopLabel = 'Số workshop đã tạo',
  thirdLabel = 'Người tham dự',
}) {
  const fontSize = useXTicksFontSize();

  const maxOrganizer = Math.max(...organizerData, 1);
  const maxWorkshop = Math.max(...workshopData, 1);
  const maxThird = thirdData && thirdData.length > 0 ? Math.max(...thirdData, 1) : 1;
  const maxData = Math.max(maxOrganizer, maxWorkshop, maxThird);
  const stepSize = getNiceStepSize(maxData);
  const finalMax = stepSize * 6;

  const data = {
    labels,
    datasets: [
      {
        label: organizerLabel,
        data: organizerData,
        backgroundColor: '#5462F5',
        borderRadius: 5,
        barPercentage: 0.8,
        categoryPercentage: 0.8,
      },
      {
        label: workshopLabel,
        data: workshopData,
        backgroundColor: '#471ACD',
        borderRadius: 5,
        barPercentage: 0.8,
        categoryPercentage: 0.8,
      },
      thirdData && thirdData.length > 0 ? {
        label: thirdLabel,
        data: thirdData,
        backgroundColor: '#FBA018',
        borderRadius: 5,
        barPercentage: 0.8,
        categoryPercentage: 0.8,
      } : null,
    ].filter(Boolean),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#313131',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#737373',
        borderWidth: 1,
        padding: 12,
        caretSize: 6,
        cornerRadius: 8,
      },
    },
    layout: {
      padding: {
        top: 16,
        right: 16,
        left: 0,
        bottom: 0,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        stacked: false,
        ticks: {
          color: '#F2F2F2',
          font: { size: fontSize, weight: 400 },
          padding: 8,
        },
      },
      y: {
        grid: {
          display: false,
          drawBorder: false,
        },
        stacked: false,
        min: 0,
        max: finalMax,
        ticks: {
          color: '#F2F2F2',
          font: { size: 12, weight: 400 },
          padding: 8,
        },
      },
    },
  };

  // Custom plugin để hiển thị số trên đầu mỗi cột
  const renderValuePlugin = {
    id: 'renderValuePlugin',
    afterDatasetsDraw(chart) {
      const { ctx, data } = chart;
      ctx.save();
      data.datasets.forEach((dataset, datasetIndex) => {
        chart.getDatasetMeta(datasetIndex).data.forEach((bar, index) => {
          const value = dataset.data[index];
          if (value === undefined) return;
          ctx.font = 'bold 12px Inter, Roboto, Arial, sans-serif';
          let color = '#A5ACFF';
          if (datasetIndex === 1) color = '#7E55F9';
          if (datasetIndex === 2) color = '#FBA018';
          ctx.fillStyle = color;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';
          ctx.fillText(value, bar.x, bar.y - 6);
        });
      });
      ctx.restore();
    }
  };

  return (
    <div className={`${styles.chartCard} border-1px border-radius-10`}>
      <div className={`panel-head flex-space border-1px-bottom ${styles.sectionStyle}`}>
        <h6 className="text-xl-bold white-color">{title}</h6>
      </div>
      <div className={`panel-body ${styles.panelBody}`}>
        <div style={{ height: 250 }}>
          <Chart type='bar' data={data} options={options} plugins={[renderValuePlugin]} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
          <span style={{ color: '#8E8E8E', fontSize: 13, fontWeight: 400 }}>THEO THÁNG</span>
          <div className={styles.legend}>
            <div className={styles.legendItem}>
              <span style={{ background: '#5462F5' }} className={styles.dotTicket}></span>
              {organizerLabel}
            </div>
            <div className={styles.legendItem}>
              <span style={{ background: '#471ACD' }} className={styles.dotRevenue}></span>
              {workshopLabel}
            </div>
            {thirdData && thirdData.length > 0 && (
              <div className={styles.legendItem}>
                <span style={{ background: '#FBA018', width: 10, height: 10, borderRadius: '50%', display: 'inline-block' }}></span>
                {thirdLabel}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
function ChartOrganizerExample({ labels = [
  '01/07/2025',
  '08/07/2025',
  '15/07/2025',
  '22/07/2025',
  '29/07/2025',
], organizerData = [220, 200, 230, 220, 220], workshopData = [180, 160, 160, 130, 150], min = 0, max = 250, title = 'Bên nhà tổ chức', organizerLabel = 'Số người tổ chức workshop', workshopLabel = 'Số workshop đã tạo' }) {
  return organizerData && workshopData && organizerData.length > 0 && workshopData.length > 0 && (
    <ChartOrganizer
      labels={labels}
      organizerData={organizerData}
      workshopData={workshopData}
      min={min}
      max={max}
      title={title}
      organizerLabel={organizerLabel}
      workshopLabel={workshopLabel}
    />
  )
}
export default ChartOrganizerExample;
export { ChartOrganizer }; 