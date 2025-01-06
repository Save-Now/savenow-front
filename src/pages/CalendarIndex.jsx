import styled from "styled-components"

const Ul = styled.ul`
    position: absolute;
    top: 8px;
    right: 50px;
    display: flex;
`

const Li = styled.li`
    &::before {
        content: '•';
        color: ${props => (props.$green ? "#3FE000" : "#FF4111") };
        font-size: 2.3rem;
        position: relative;
        top: 7.7px;
        padding: 2px;
    }
    font-size: ${({ theme }) => theme.fontSize.sm};
    margin-left: 10px;
`

export default function CalendarIndex() {
    return (
        <Ul>
            <Li $green={true}>수입</Li>
            <Li $green={false}>지출</Li>
        </Ul>
    )
}