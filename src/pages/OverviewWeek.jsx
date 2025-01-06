import styled from "styled-components";

const Box = styled.div`
    width: 100%;
    height: 90px;
    background: ${({ theme }) => theme.color.background}; 
    border-radius: ${({ theme }) => theme.border.radius};
    margin-bottom: 10px;
    position: relative;
`
const WeekRange = styled.p`
    color: ${({ theme }) => theme.color.textMuted};
    position: relative;
    top: 10px;
    left: 10px;
`

const Overview = styled.div`
    position: absolute;
    left: 10px;
    bottom: 27px;
`

const In = styled.span`
    color: #3FE000;
    margin-right: 30px;
`
const Out = styled.span`
    color: #FF4111;
`
const Label = styled.span`
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    margin-right: 7px;
`

export default function OverviewWeek({ week }) {
    return (
        <Box>
            <WeekRange>{week}</WeekRange>
            <Overview>
                <Label>수입</Label> <In>43000원</In>
                <Label>지출</Label> <Out>43000원</Out>
            </Overview>
        </Box>
    )
}