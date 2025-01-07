import { useEffect, useRef, useState } from "react";
import moment from "moment";
import * as Styled from '../styles/Calendar';
import CalendarIndex from "./CalendarIndex";

export default function Calendar({ date, onChangeDate, markDays, data }) {
    // 초기 렌더링
    useEffect(() => {
        const activeStartDate = new Date(date.getFullYear(), date.getMonth(), 1);
        onChangeDate(activeStartDate);
    }, [])


    const handleChangeDate = ({ action, activeStartDate, value, view }) => {
        onChangeDate(activeStartDate);
    }

    const handleDisable = ({ activeStartDate, date, view }) => {
        const month = date.getMonth() + 1;
        const activeMonth = activeStartDate.getMonth() + 1;
        return month !== activeMonth;
    }

    const mark = ({ activeStartDate, date, view }) => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const result = markDays.indexOf(`${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`);
        if (result !== -1) {
            const thisDay = markDays[result];
            return (
                <Styled.MarkDiv>
                    <br/>
                    <Styled.Out>-{data[thisDay].out}</Styled.Out>
                    <Styled.In>+{data[thisDay].in}</Styled.In>
                </Styled.MarkDiv>
            )
        } else {
            return;
        }
    }

    return (
        <Styled.Container>
            <CalendarIndex />
            <Styled.StyledCalendar
                onActiveStartDateChange={handleChangeDate}
                value={date}
                next2Label={null}
                prev2Label={null}
                formatDay={(locale, date) => moment(date).format('D')}
                tileDisabled={handleDisable}
                tileContent={mark}
            />
        </Styled.Container>
    )
}