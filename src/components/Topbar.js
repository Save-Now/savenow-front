import React from 'react';
import { Search, Bell, Settings } from 'react-feather';
import styled from 'styled-components';

const TopBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const SearchBar = styled.div`
  flex: 1;
  max-width: 600px;
  position: relative;
  
  input {
    width: 100%;
    padding: 10px 40px 10px 15px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    font-size: 14px;
  }

  svg {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: #666;
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  background: #4F5AED;
  padding: 8px 16px;
  border-radius: 20px;
  color: white;

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
`;

function TopBar() {
  return (
    <TopBarContainer>
      <SearchBar>
        <input type="text" placeholder="검색..." />
        <Search size={20} />
      </SearchBar>
      <Bell size={20} style={{ margin: '0 20px' }} />
      <UserProfile>
        <img src="/placeholder.svg" alt="User" />
        <div>
          <div>John Doe</div>
          <div>john123@example.com</div>
        </div>
        <Settings size={20} />
      </UserProfile>
    </TopBarContainer>
  );
}

export default TopBar;
