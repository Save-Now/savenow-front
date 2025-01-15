import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBell } from '@fortawesome/free-solid-svg-icons';
import { IoSettingsSharp } from 'react-icons/io5';

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: white;
  border-radius: 12px;
  margin-bottom: 40px;
`;

const SearchBarContainer = styled.div`
  position: relative;
  width: 400px;
`;

const SearchBar = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 16px 0 40px;
  border: 1px solid #e5e5e5;
  border-radius: 20px;
  &:focus {
    outline: none;
    border-color: #4659e4;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const NotificationIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  background-color: #4659e4;
  border-radius: 50px;
  color: white;
  cursor: pointer;
  min-width: 200px;
`;

const ProfileContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
`;

const SettingsIconContainer = styled.div`
  margin-left: auto;
`;

const ProfileImageSmall = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 100px;
  background-color: #e5e5e5;
`;

const Topbar = () => {
  return (
    <TopBar>
      <SearchBarContainer>
        <SearchIcon>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </SearchIcon>
        <SearchBar placeholder="검색어를 입력하세요" />
      </SearchBarContainer>
      <UserInfo>
        <NotificationIcon>
          <FontAwesomeIcon icon={faBell} />
        </NotificationIcon>
        <UserProfile>
          <ProfileContent>
            <ProfileImageSmall />
            <span>김수연</span>
          </ProfileContent>
          <SettingsIconContainer>
            <IoSettingsSharp color="white" size={20} />
          </SettingsIconContainer>
        </UserProfile>
      </UserInfo>
    </TopBar>
  );
};

export default Topbar;
