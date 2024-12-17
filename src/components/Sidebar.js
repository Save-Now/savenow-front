import React, { useState } from 'react';
import styled from 'styled-components';
import { BiGridAlt } from 'react-icons/bi';
import { FaRegCommentAlt } from "react-icons/fa";
import { SlNotebook } from "react-icons/sl";
import { MdOutlineLogout } from "react-icons/md";

const SidebarContainer = styled.div`
  width: 240px;
  height: 100vh;
  background-color: #4158F3;
  padding: 30px 20px 0px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 72px;
    padding: 24px 8px;
  }
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 68px;
  color: white;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const LogoPlaceholder = styled.div`
  width: 50px;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
`;

const LogoText = styled.span`
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  font-size: 0.9375rem;
  color: white;

  @media (max-width: 768px) {
    display: none;
  }
`;


const NavItem = styled.div`
  display: flex;
  align-items: center; /* 세로 중앙 정렬 */
  gap: 10px;
  padding: 12px 8px; /* 내부 여백 */
  color: ${props => (props.$active ? 'white' : '#d1d5db')};
  font-family: 'Pretendard', sans-serif;
  font-weight: ${props => (props.$active ? 'bold' : '400')};
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: 12px;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
    font-weight: bold;
  }

  background-color: ${props => (props.$active ? 'rgba(255, 255, 255, 0.2)' : 'transparent')};
`;

const NavText = styled.span`
  font-size: 0.8125rem;
  line-height: 1.2;

  @media (max-width: 768px) {
    display: none;
  }
`;


const BottomSection = styled.div`
  padding-bottom: 20px;
`;

const Icon = styled.div`
  font-size: 1.2em; /* 아이콘 크기 설정 */
  display: flex;
  align-items: center; /* 아이콘도 수직 중앙 정렬 */
  justify-content: center;
`;

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState('dashboard');

  const navItems = [
    { id: 'dashboard', icon: <BiGridAlt />, text: '대시보드' },
    { id: 'community', icon: <FaRegCommentAlt />, text: '커뮤니티' },
    { id: 'documents', icon: <SlNotebook />, text: '가계부' },
  ];

  return (
    <SidebarContainer>
      <div>
        {/* Logo Section */}
        <LogoSection>
          <LogoPlaceholder />
          <LogoText>Save Now</LogoText>
        </LogoSection>

        {/* Navigation Items */}
        {navItems.map(item => (
          <NavItem
            key={item.id}
            $active={activeItem === item.id}
            onClick={() => setActiveItem(item.id)}
          >
            <Icon>{item.icon}</Icon>
            <NavText>{item.text}</NavText>
          </NavItem>
        ))}
      </div>

      {/* Bottom Section */}
      <BottomSection>
        <NavItem>
          <Icon><MdOutlineLogout /></Icon>
          <NavText>로그아웃</NavText>
        </NavItem>
      </BottomSection>
    </SidebarContainer>
  );
}
