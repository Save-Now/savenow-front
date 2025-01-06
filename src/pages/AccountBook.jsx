import Calendar from "./Canlendar";
import axios from "axios";
import styled from "styled-components";
import { useEffect, useState } from "react";
import AdditionButton from "./AdditionButton";
import OverviewWeeks from "./OverviewWeeks";
import { useImmer } from "use-immer";

const BASE_URL = 'https://71c13204-cc41-4566-a89f-cf9b87467725.mock.pstmn.io'

const Container = styled.div`
    padding: 20px;
    background: #FFFFFF;
    width: 1141px;
    height: 700px;
    border-radius: ${({ theme }) => theme.border.radius};
    display: flex;    
    position: relative;
`

const CalendarWrapper = styled.div`
    width: 100%;
    height: 620px;
`

const OverviewWeeksWrapper = styled.div`
    // border: 1px solid #999999;
    width: 365px;
    height: 500px;
    margin-top: 126px;
    overflow-y: auto;
    ocerflow-x: none;
    -ms-overflow-style:none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }
`

const StyledAdditionBtn = styled(AdditionButton)`
    position: absolute;
    top: 20px;
    right: 20px;
    width: 153px;
    height: 40px;
`

export default function AccountBook() {
    const [date, setDate] = useState(new Date());
    const [markDays, setMarkDays] = useState([])
    const [data, setData] = useState({});
    const [weeks, setWeeks] = useState([]);

    useEffect(() => {
        getData();
    }, []);


    // 임시
    const getData = async () => {
        try {
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const params = {
                year: year,
                month: month,
            };
            const response = await axios.get(`${BASE_URL}/api/account`, { params });
            const data = response.data[`${year}-${month < 10 ? '0' : ''}${month}`];
            setMarkDays(Object.keys(data));
            setData(data);
            console.log(data);
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleDate = (date) => {
        // console.log(date);
        setDate(date);
        getWeeks(date);
    }

    const getLastDay = (month) => {
        switch (month) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                return 31;
            case 4:
            case 6:
            case 9:
            case 11:
                return 30;
            case 2:
                return 28;
            default:
                throw new Error("Invalid month");
        }
    }

    const getWeekPiece = (cur, yoil, weekRange) => {
        if (yoil === 1) { // 월요일(weekStart)에서 한 주 시작하고
            weekRange.push(`${cur.getMonth() + 1}/${cur.getDate()}`);
        } else if (yoil === 0) {  // 일요일(weekLast)에서 한 주 끝나고
            weekRange.push(weekRange.pop() + ` ~ ${cur.getMonth() + 1}/${cur.getDate()}`); // 문자열 이어붙이기
        }
    }

    const getWeeks = (start) => {    // activeStartDate
        const thisMonth = start.getMonth() + 1;
        const total = getLastDay(thisMonth);
        const weekRange = [];
        let cur;
        for (let i = 0; i < total; i++) {
            cur = new Date(start);
            cur.setDate(cur.getDate() + i)
            const yoil = cur.getDay();
            if (i === 0) {  // startDay
                const firstMon = new Date(cur);
                const lastDayOfPrevMonth = getLastDay(cur.getMonth()===0 ? 12 : cur.getMonth());
                // 첫째주 월요일
                firstMon.setDate(yoil === 0 ? lastDayOfPrevMonth - 5 : lastDayOfPrevMonth - yoil +2);
                firstMon.setMonth(yoil === 1 ? cur.getMonth() : cur.getMonth() - 1);
                weekRange.push(`${firstMon.getMonth() + 1}/${firstMon.getDate()}`);
                getWeekPiece(cur, yoil, weekRange);
            } else if (i === total - 1) { // lastDay
                const lastSun = new Date(cur);
                // 마지막주 일요일
                lastSun.setDate(-yoil + 7);
                lastSun.setMonth(yoil === 0 ? cur.getMonth() : cur.getMonth() + 1);
                getWeekPiece(cur, yoil, weekRange);
                weekRange.push(weekRange.pop() + ` ~ ${lastSun.getMonth() + 1}/${lastSun.getDate()}`); // 문자열 이어붙이기
            } else {    // 나머지
                getWeekPiece(cur, yoil, weekRange);
            }

        }
        setWeeks(weekRange);
        // console.log(weekRange);
    }


    return (
        <Container>
            <CalendarWrapper>
                <Calendar
                    date={date}
                    onChangeDate={handleDate}
                    markDays={markDays}
                    data={data}
                />
            </CalendarWrapper>
            <StyledAdditionBtn>
                수입/지출 추가
            </StyledAdditionBtn>
            <OverviewWeeksWrapper>
                <OverviewWeeks 
                    weeks={weeks}
                />
            </OverviewWeeksWrapper>
        </Container>
    )
}