import React from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import Overview from '../components/Overview';
import DonutChart from '../components/DonutChart';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f8f9fa;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
`;

function Dashboard() {

  const financialData = {
    mostUsedCategory: "쇼핑",
    monthlyIncome: 1000000,
    monthlyExpense: 100000
  };

  return (
    <DashboardContainer>
      <Sidebar />
      <MainContent>
        <Topbar />
        <div>
          <Overview data={financialData} />
        </div>
        <GridContainer>
          <DonutChart />
        </GridContainer>
      </MainContent>
    </DashboardContainer>
  );
}

export default Dashboard;
