import styled, { css } from "styled-components";

export const IconSpan = styled.span<{ $primary?: boolean }>`
    color: lightgrey;
    font-size: 12px;
    padding: 2px;
    margin: 0;

    ${(props) =>
        props.$primary &&
        css`
            color: #2d5299;
        `}
`;
