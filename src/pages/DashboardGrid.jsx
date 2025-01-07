import { useEffect, useState } from "react";
import CategoricalGraph from "./CategoricalGraph";
import Calendar from "./Canlendar";
import styled from "styled-components";
import Overview from "../components/Overview";
import Topbar from "../components/Topbar";

const DashboardContainer = styled.div`
    border-radius: ${({ theme }) => theme.border.radius};
    display: grid;
    height: 638px;
    width: 1141px;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: repeat(8, 1fr);
    grid-gap: 10px;
`
const CalendarWrapper = styled.div`
    border-radius: ${({ theme }) => theme.border.radius};
    grid-row-start: 2;
    grid-row-end: 10;
    width: 100%;
    height: 100%;
    background: #FFFFFF;
`

const OverviewWrapper = styled.div`
    width: 100%;
    height: 100%;
`

const financialData = {
    mostUsedCategory: "쇼핑",
    monthlyIncome: 1000000,
    monthlyExpense: 100000
  };

export default function DashboardGrid() {
    const [date, setDate] = useState(new Date());

    const handleDate = (date) => {
        setDate(date);
    }


    return (
        <DashboardContainer>
            <CategoricalGraph
                date={date}
            />
            <OverviewWrapper>
                <Overview data={financialData} />
            </OverviewWrapper>
            <CalendarWrapper>
                <Calendar
                    date={date}
                    onChangeDate={() => handleDate()
                    }
                />
            </CalendarWrapper>

        </DashboardContainer>
    )
}