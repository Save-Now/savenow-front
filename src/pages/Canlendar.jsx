import { useEffect, useRef } from "react";
import { Calendar as Cal } from "react-calendar";
import styled from "styled-components";
import 'react-calendar/dist/Calendar.css';
import moment from "moment";

const Container = styled.div`
    border-radius: ${({ theme }) => theme.border.radius};
    grid-row-start: 2;
    grid-row-end: 10;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #FFFFFF;

    .react-calendar {
        flex-grow:9;
        width: 90% ;
        display: flex;
        flex-direction: column;
        border-radius: ${({ theme }) => theme.border.radius};
        border: none;
    }

    .react-calendar__navigation {
        margin: 26px 0;
    }
    .react-calendar__navigation__label {
        max-width: 108px;
        color: ${({ theme }) => theme.color.primary};
        font-weight: 800;
        font-size: ${({ theme }) => theme.fontSize.large};
    }

    .react-calendar__viewContainer,
    .react-calendar__month-view,
    .react-calendar__month-view >div,
    .react-calendar__month-view >div >div {
        height: 100%
    }

    .react-calendar__month_view,
    .react-calendar__tile:disabled {
        background-color: #FFFFFF;
        color: ${({ theme }) => theme.color.text};
    }

    .react-calendar__month-view__weekdays {
        height: 8%;
        text-align: left;
        font-wight: ${({ theme }) => theme.fontWeight.bold};
        font-size: ${({ theme }) => theme.fontSize.large};
    }
    .react-calendar__month-view__days {
        height: 92%;
    }

    .react-calendar__tile {
        border: 1px solid #D9D9D9;
        display: flex;        
        align-items: flex-start;
        justify-content: flex-start;
        padding: 7.5px 4.5px;
        font-size: ${({ theme }) => theme.fontSize.large};
    }

    .react-calendar__tile:enabled:hover {
        background-color: ${({ theme }) => theme.color.hoverColor};
        color: white;
    }

    .react-calendar__tile:enabled:focus {
        background-color: #FFFFFF;
        color: ${({ theme }) => theme.color.text};
        border: 1px solid ${({ theme }) => theme.color.focusColor};
    }

    .react-calender__tile--active,
    .react-calendar__tile--active:enabled:hover,
    .react-calendar__tile--active:enabled:focus,
    .react-calendar__tile--hasActive,
    .react-calendar__tile--hasActive:enabled:hover,
    .react-calendar__tile--hasActive:enabled:focus {
        background: #FFFFFF;
        color: ${({ theme }) => theme.color.text};
    }

    .react-calendar__tile--now,
    .react-calendar__tile--now:enabled:hover,
    .react-calendar__tile--now:enabled:focus
    {
        background: ${({ theme }) => theme.color.hoverColor};
        color: white;
    }
    
    .react-calendar__tile--now:enabled:hover,
    .react-calendar__tile--now:enabled:focus {
        border: 1px solid ${({ theme }) => theme.color.focusColor};
    }
    
    .react-calendar__month-view__days__day--neighboringMonth {
        font-size: 0;
    }

`

const StyledCalendar = styled(Cal)``

export default function Calendar({ date, onChange }) {
    const monthRef = useRef(date.getMonth());

    const handleChangeDate = (date) => {
        onChange(date);
    }

    // TODO: 수정필요
    const neighborMonthsDisable = ({ date }) => {
        return date.getMonth() !== monthRef.current;
    }

    useEffect(() => {
        console.log(date.getMonth());
    }, [date]);

    return (
        <Container>
            <StyledCalendar
                onChange={handleChangeDate}
                value={date}
                next2Label={null}
                prev2Label={null}
                formatDay={(locale, date) => moment(date).format('D')}
                tileDisabled={neighborMonthsDisable}
            />
        </Container>
    )
}