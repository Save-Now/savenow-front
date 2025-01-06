import styled from 'styled-components';
import OverviewWeek from './OverviewWeek';
import { useEffect } from 'react';

const Container = styled.div`
    width: 100%,
    height: 100%,
    display: flex;
    flex-direction: column;
`

export default function OverviewWeeks({ weeks }) {
    useEffect(() => {
        console.log(weeks);
    }, [weeks])

    return (
        <Container>
            {weeks.map((week) => (
                <OverviewWeek
                    key={week}
                    week={week}
                />
            ))}
        </Container>
    )
}