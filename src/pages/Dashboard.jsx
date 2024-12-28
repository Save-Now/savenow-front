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
            <Calendar
                date={date}
                onChange={handleDate}
            />

        </DashboardContainer>
    )
}