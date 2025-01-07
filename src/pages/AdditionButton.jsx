import styled from "styled-components";

const StyledButton = styled.button`
    border-radius: ${({ theme }) => theme.border.radius};
    border: none;
    color: #FFFFFF;
    background: ${({ theme }) => theme.color.hoverColor};
    &:hover {
        background: ${({ theme }) => theme.color.focusColor};
    }
`

export default function AdditionButton({ className, children }) {

    return (
        <StyledButton
            className={className}
        >
            {children}
        </StyledButton>
    )
}