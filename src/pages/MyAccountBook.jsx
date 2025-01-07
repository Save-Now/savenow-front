import { useEffect, useState } from "react";
import styled from "styled-components"
import axios from "axios";
import { useImmer } from "use-immer";
import AdditionButton from "./AdditionButton";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdAdd } from "react-icons/md";

const BASE_URL = 'https://71c13204-cc41-4566-a89f-cf9b87467725.mock.pstmn.io';

const Container = styled.div`
    padding: 20px;
    background: #FFFFFF;
    width: 1141px;
    height: 700px;
    border-radius: ${({ theme }) => theme.border.radius};
    display: flex;    
    flex-direction: column;
    position: relative;
`
const Header = styled.div`
    align-self: center;
    display: flex;
    width: 1072px;
    justify-content: space-between;
`

const Title = styled.div`
    font-size: ${({ theme }) => theme.fontSize.large};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    // margin-top: 10px;
    color: ${({ theme }) => theme.color.text};
    margin-bottom: 40px;
`

const BtnsWrapper = styled.div`
    display: flex;
    margin-bottom: 28px;
`

const Btn = styled(AdditionButton)`
    width: 92px;
    height: 37px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const DeleteBtn = styled(Btn)`
    background: #999999;
    &:hover {
        background: #555555;
    };
    margin-right: 5px;
`

const AddBtn = styled(Btn)`
`;

const AccountWrapper = styled.div`
    width: 1072px;
    align-self: center;
`

const Table = styled.table`
    align-items: center;
`

const Thead = styled.thead`
    background: ${({ theme }) => theme.color.hoverColor};
    color: #FFFFFF;
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    font-size: ${({ theme }) => theme.fontSize.large};
    height: 43px;
    align-items: center;
    display: flex;
    padding: 0px 5px;
`

const Tbody = styled.tbody`
    display: flex;
    // justify-content: center;
    // align-items: center;
`

const BodyWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1072px;
    height: 580px;
`

const Text = styled.div`
    color: #999999;
`

export default function MyAccountBook() {
    const [data, updateData] = useImmer([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/account`);
            const data = response.data.data;
            updateData(data);
            console.log(data);
        } catch (err) {
            console.log(err.message);
        }
    }

    // '선택', '분류', '날짜', '금액', '카테고리'
    return (
        <Container>
            <Header>
                <Title>가계부 작성</Title>
                <BtnsWrapper>
                    <DeleteBtn>
                        <FaRegTrashAlt style={{ color: '#FFFFFF', paddingRight: '8px' }} />
                        삭제
                    </DeleteBtn>
                    <AddBtn>
                        <MdAdd style={{ color: '#FFFFFF', paddingRight: '8px' }} />
                        추가
                    </AddBtn>
                </BtnsWrapper>
            </Header>


            <AccountWrapper>
                <Table>
                    <Thead>
                        <tr>
                            <th>선택</th>
                            <th style={{ width: '130px' }}>분류</th>
                            <th style={{ width: '300px' }}>날짜</th>
                            <th style={{ width: '300px' }}>금액</th>
                            <th style={{ width: '300px' }}>카테고리</th>
                        </tr>
                    </Thead>
                    <Tbody>
                        <BodyWrapper>
                            <Text>추가버튼을 눌러 가계부를 입력하세요!</Text>
                        </BodyWrapper>
                    </Tbody>
                </Table>
            </AccountWrapper>


        </Container>
    )
}