import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import styled from 'styled-components';

// Chart.js 요소 등록
ChartJS.register(ArcElement, Tooltip, Legend);

const ChartContainer = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;       /* 부모 요소의 100% 너비 */
  max-width: 400px;  /* 최대 너비 설정 */
  height: 300px;     /* 고정 높이 설정 */
  box-sizing: border-box;
`;

const ChartTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
  text-align: center;
`;

function DonutChart() {
  const data = {
    labels: ['소비', '식사', '건강', '여가'],
    datasets: [
      {
        data: [40, 30, 20, 10],
        backgroundColor: ['#4F5AED', '#6366F1', '#818CF8', '#A5B4FC'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false, // 비율 유지 해제
    responsive: true,           // 반응형 설정
    plugins: {
      legend: {
        position: 'right',
      },
    },
    cutout: '70%', // 도넛 차트의 내부 원 크기
  };

  return (
    <ChartContainer>
      <ChartTitle>카테고리별 소비분석</ChartTitle>
      <div style={{ width: '100%', height: '100%' }}>
        <Doughnut data={data} options={options} />
      </div>
    </ChartContainer>
  );
}

export default DonutChart;
