import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import Overview from '../components/Overview';
import CategoricalGraph from './CategoricalGraph';
import styled from 'styled-components';
import Calendar from './Canlendar';
import DashboardGrid from './DashboardGrid';
import { Outlet } from 'react-router-dom';

const DashboardContainer = styled.div`
  display: flex;

  min-height: 100vh;
  background: #f8f9fa;
  
`;

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
`;

// const GridContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
//   grid-gap: 20px;
// `;

const Right = styled.div`
  display: flex;
  flex-direction: column;
`

function Dashboard() {

  const financialData = {
    mostUsedCategory: "쇼핑",
    monthlyIncome: 1000000,
    monthlyExpense: 100000
  };

  return (
    <DashboardContainer>
      <Sidebar />
      <Right>
        <Topbar />
        
        {/* <MainContent> */}
          {/* <DashboardGrid /> */}
        {/* </MainContent> */}
          <Outlet />
      </Right>
    </DashboardContainer>
  );
}

export default Dashboard;
