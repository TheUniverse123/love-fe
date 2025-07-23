import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Legend, Tooltip, LineController, BarController } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import styles from './ChartRevenue.module.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Legend, Tooltip, LineController, BarController);

const getXTicksFontSize = () => {
  if (typeof window !== 'undefined') {
    if (window.innerWidth < 900) return 10;
    if (window.innerWidth < 1500) return 11;
  }
  return 13;
};
// Hàm tính bước nhảy đẹp
const getNiceStepSize = (max) => {
  const niceNumbers = [1, 2, 5, 10, 20, 25, 50, 100, 200, 500, 1000, 2000, 5000];
  const targetSteps = 10;
  const roughStep = max / targetSteps;

  // Tìm số đẹp gần nhất nhưng không quá lớn
  let niceStep = niceNumbers[0];
  for (let i = 0; i < niceNumbers.length; i++) {
    if (niceNumbers[i] >= roughStep) {
      // Nếu số này tạo ra quá ít bước, thử số nhỏ hơn
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

function ChartRevenue({
  labels = [],
  revenueData = [],
  ticketData = [],
  min = 100,
  max = 500
}) {
  // Convert revenue to thousands of VND for better display
  const normalizedRevenueData = revenueData.map(revenue => Math.round(revenue / 1000));

  // Calculate dynamic min/max for better scale
  const maxRevenue = Math.max(...normalizedRevenueData, 1);
  const maxTickets = Math.max(...ticketData, 1);

  // Use separate scales for better visualization - ensure 10 steps
  const revenueStepSize = getNiceStepSize(maxRevenue);
  const ticketStepSize = getNiceStepSize(maxTickets);

  // Tính max value dựa trên step size và số bước mong muốn
  const finalRevenueMax = revenueStepSize * 10;
  const finalTicketMax = ticketStepSize * 10;

  const data = {
    labels,
    datasets: [
      {
        type: 'line',
        label: 'Số lượng vé đã đặt',
        data: ticketData,
        borderColor: '#7682FF',
        backgroundColor: '#7682FF',
        borderWidth: 3,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: '#7682FF',
        tension: 0.1,
        yAxisID: 'y1',
        order: 1,
      },
      {
        type: 'bar',
        label: 'Doanh thu (nghìn VND)',
        data: normalizedRevenueData,
        backgroundColor: '#471ACD',
        borderRadius: 5,
        barPercentage: 0.7,
        categoryPercentage: 0.6,
        yAxisID: 'y',
        order: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 16,
        right: 16,
        left: 0,
        bottom: 0,
      },
    },
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
        callbacks: {
          label: function (context) {
            if (context.datasetIndex === 1) {
              // Revenue data (bar chart) - show in thousands VND
              return `Doanh thu: ${context.parsed.y.toLocaleString()} nghìn VND`;
            } else {
              // Ticket data (line chart)
              return `Số vé: ${context.parsed.y} vé`;
            }
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: '#F2F2F2',
          font: context => ({ size: getXTicksFontSize(), weight: 400 }),
          padding: 8,
        },
      },
      y: {
        position: 'left',
        grid: {
          display: false,
          drawBorder: false,
        },
        title: {
          display: false,
        },
        ticks: {
          color: '#F2F2F2',
          font: { size: 12, weight: 400 },
          padding: 8,
          callback: function (value) {
            return value.toLocaleString();
          },
        },
        min: 0,
        max: finalRevenueMax,
      },
      y1: {
        position: 'right',
        grid: { display: false, drawBorder: false },
        title: {
          display: false,
        },
        ticks: {
          color: '#F2F2F2',
          font: { size: 12, weight: 400 },
          padding: 8,
          callback: function (value) {
            return value;
          },
        },
        min: 0,
        max: finalTicketMax,
      },
    },
  };

  return (
    <div className={styles.chartCard}>
      <div className={`panel-head flex-space border-1px-bottom ${styles.sectionStyle}`}>
        <h6 className="text-xl-bold white-color">Thống kê doanh thu</h6>
      </div>
      <div className={`panel-body ${styles.panelBody}`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4, marginTop: 8 }}>
          <span style={{ color: '#8E8E8E', fontSize: 12, fontWeight: 400 }}>VND (nghìn đồng)</span>
          <span style={{ color: '#8E8E8E', fontSize: 12, fontWeight: 400 }}>Số lượng vé</span>
        </div>
        <div style={{ height: 650 }}>
          <Chart type='bar' data={data} options={options} />
        </div>
        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <span style={{ background: '#7682FF' }} className={styles.dotTicket}></span>
            Số lượng vé đã đặt
          </div>
          <div className={styles.legendItem}>
            <span style={{ background: '#4600D4' }} className={styles.dotRevenue}></span>
            Doanh thu (nghìn VND)
          </div>
        </div>
      </div>
    </div>
  );
}

// Ví dụ sử dụng component ChartRevenue
function ChartRevenueExample({ labels = [
  '01/07 - 06/07',
  '07/07 - 12/07',
  '13/07 - 18/07',
  '19/07 - 24/07',
  '25/07 - 31/07',
], revenueData = [120, 210, 350, 420, 390], ticketData = [180, 250, 300, 470, 410], min = 50, max = 500 }) {
  return (
    <ChartRevenue
      labels={labels}
      revenueData={revenueData}
      ticketData={ticketData}
      min={min}
      max={max}
    />
  );
}

export default ChartRevenueExample;
export { ChartRevenue };
