import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { IoSettingsSharp } from "react-icons/io5";
import { LayoutGrid, Users2, Wallet2, ChevronDown, LogOut } from "lucide-react";
import { IoLogOutOutline } from "react-icons/io5";

// 전체 레이아웃
const Layout = styled.div`
  display: flex;
  min-height: 100vh;
`;

// 사이드바
const Sidebar = styled.div`
  width: 240px;
  background-color: #4659e4;
  padding: 20px;
  color: white;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MenuContainer = styled.div`
  flex-grow: 1;
`;

const LogoutContainer = styled.div`
  margin-top: auto;
  padding-bottom: 20px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
  span {
    font-size: 20px;
    font-weight: bold;
  }
`;

const MenuItem = styled.div`
  padding: 12px;
  margin: 4px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const MenuText = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

// 메인 컨텐츠
const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #f8f9fa;
`;

// 상단바
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

// 마이페이지 모드 스타일
const ProfileSection = styled.div`
  padding: 40px;
  background-color: white;
  border-radius: 12px;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const UserName = styled.h2`
  font-size: 24px;
  margin-top: 30px;
  margin-bottom: 10px;
`;

const UserNickname = styled.p`
  color: #666;
  margin-bottom: 50px;
`;

// 프로필 수정 모드 스타일
const EditProfileSection = styled.div`
  padding: 40px;
  background-color: white;
  border-radius: 12px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 74px;
  text-align: left;
`;

const EditContainer = styled.div`
  display: flex;
  gap: 80px;
  margin: 0 auto;
`;

const LeftSection = styled.div`
  flex: 1;
  text-align: center;
`;

const RightSection = styled.div`
  flex: 1;
`;

const ImageLabel = styled.div`
  font-size: 14px;
  color: #333;
  margin-bottom: 20px;
  text-align: left;
`;

const ProfileImage = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background-color: #e5e5e5;
  overflow: hidden;
  margin: auto; // 상하좌우 가운데 정렬을 위해
  display: flex; // 이미지 중앙 정렬을 위해 추가
  align-items: center; // 수직 중앙 정렬
  justify-content: center; // 수평 중앙 정렬
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProfileImageContainer = styled.div`
  width: 200px;
  height: 200px;
  margin: 0 auto;
  position: relative;
`;

const PhotoUploadButton = styled.label`
  position: absolute;
  right: -100px;
  bottom: -40px;
  width: 40px;
  height: 40px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: #666;
`;

const EditForm = styled.form`
  max-width: 100%;
`;

const InputGroup = styled.div`
  margin-bottom: 30px;
`;

const Label = styled.div`
  font-size: 14px;
  color: #333;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 20px;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box; // 추가
  &:focus {
    outline: none;
    border-color: #4659e4;
  }
`;

const EditButton = styled.button`
  width: ${(props) => (props.inEditMode ? "100%" : "120px")};
  height: 48px;
  background-color: ${(props) => (props.inEditMode ? "#999999" : "#4659e4")};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => (props.inEditMode ? "#888888" : "#3548d3")};
  }
`;

const EditButton2 = styled.button`
  width: 100%;
  height: 48px;
  padding: 0 20px;
  background-color: ${(props) => (props.inEditMode ? "#999999" : "#4659e4")};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => (props.inEditMode ? "#888888" : "#3548d3")};
  }
`;

const PasswordSection = styled.div`
  text-align: center;
  margin-top: 40px;
  padding-top: 20px;
`;

const PasswordChangeText = styled.div`
  font-size: 14px;
  color: #666;
`;

const PasswordChangeLink = styled.span`
  color: #333;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;
  margin-left: 8px;
  &:hover {
    text-decoration: underline;
  }
`;

function MyPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "김수연",
    nickname: "JohnDoe1234",
    birthDate: "2000-01-01",
    profileImage: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData((prev) => ({
          ...prev,
          profileImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", userData);
    setIsEditing(false);
  };

  return (
    <Layout>
      <Sidebar>
        <Logo>
          <img src="/logo.png" alt="Save Now" />
          <span>Save Now</span>
        </Logo>

        <MenuContainer>
          <MenuItem>
            <MenuText>
              <LayoutGrid size={22} />
              대시보드
            </MenuText>
          </MenuItem>

          <MenuItem>
            <MenuText>
              <Users2 size={22} />
              커뮤니티
            </MenuText>
          </MenuItem>

          <MenuItem>
            <MenuText>
              <Wallet2 size={22} />
              가계부
            </MenuText>
            <ChevronDown size={22} />
          </MenuItem>
        </MenuContainer>

        <LogoutContainer>
          <MenuItem>
            <MenuText>
              <IoLogOutOutline size={22} />
              로그아웃
            </MenuText>
          </MenuItem>
        </LogoutContainer>
      </Sidebar>

      <MainContent>
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

        {!isEditing ? (
          // 마이페이지 모드
          <ProfileSection>
            <ProfileImage>
              {userData.profileImage && (
                <img src={userData.profileImage} alt="프로필" />
              )}
            </ProfileImage>
            <UserName>{userData.name}</UserName>
            <UserNickname>{userData.nickname}</UserNickname>
            <EditButton onClick={() => setIsEditing(true)}>
              프로필 수정
            </EditButton>
          </ProfileSection>
        ) : (
          // 프로필 수정 모드
          <EditProfileSection>
            <SectionTitle>프로필 수정</SectionTitle>
            <EditContainer>
              <LeftSection>
                <ImageLabel>프로필 사진</ImageLabel>
                <ProfileImageContainer>
                  <ProfileImage>
                    {userData.profileImage && (
                      <img src={userData.profileImage} alt="프로필" />
                    )}
                  </ProfileImage>
                  <PhotoUploadButton htmlFor="profile-upload">
                    <FontAwesomeIcon icon={faCamera} />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                      id="profile-upload"
                    />
                  </PhotoUploadButton>
                </ProfileImageContainer>
              </LeftSection>

              <RightSection>
                <EditForm onSubmit={handleSubmit}>
                  <InputGroup>
                    <Label>이름</Label>
                    <Input
                      type="text"
                      name="name"
                      value={userData.name}
                      onChange={handleChange}
                    />
                  </InputGroup>

                  <InputGroup>
                    <Label>닉네임</Label>
                    <Input
                      type="text"
                      name="nickname"
                      value={userData.nickname}
                      onChange={handleChange}
                    />
                  </InputGroup>

                  <InputGroup>
                    <Label>생년월일</Label>
                    <Input
                      type="date"
                      name="birthDate"
                      value={userData.birthDate}
                      onChange={handleChange}
                    />
                  </InputGroup>

                  <EditButton2 type="submit">수정완료</EditButton2>
                </EditForm>
              </RightSection>
            </EditContainer>

            <PasswordSection>
              <PasswordChangeText>
                비밀번호를 변경하시겠습니까?
                <PasswordChangeLink>비밀번호 변경</PasswordChangeLink>
              </PasswordChangeText>
            </PasswordSection>
          </EditProfileSection>
        )}
      </MainContent>
    </Layout>
  );
}

export default MyPage;
