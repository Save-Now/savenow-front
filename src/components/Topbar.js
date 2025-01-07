import React from 'react';
import { Search, Bell, Settings } from 'react-feather';
import styled from 'styled-components';

const TopBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  // margin-bottom: 20px;
  width: 1141px;
  height: 72px;
  padding: 20px;
  border-radius: ${({ theme }) => theme.border.radius};
`;

const SearchBar = styled.div`
  height: 72px;
  width: 512px;
  position: relative;
  
  input {
    width: 100%;
    hight: 100%;
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
`

const BellWrapper = styled.div`

`
  ;

function TopBar() {
  return (
    <TopBarContainer>
      <SearchBar>
        <Search size={20} style={{ position: 'absolute' }} />
        <input type="text" placeholder="검색..." />
      </SearchBar>
      <BellWrapper>
        <Bell size={20} style={{ margin: '0 20px' }} />
      </BellWrapper>
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
