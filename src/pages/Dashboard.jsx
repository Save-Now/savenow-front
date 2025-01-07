import { useEffect, useState } from "react";
import CategoricalGraph from "./CategoricalGraph";
import Calendar from "./Canlendar";
import styled from "styled-components";

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

export default function Dashboard() {
    const [date, setDate] = useState(new Date());

    const handleDate = (date) => {
        setDate(date);
    }

    return (
        <DashboardContainer>
            <CategoricalGraph
                date={date}
            />
            <div className="report">
            </div>
            <div className="overview">
            </div>
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