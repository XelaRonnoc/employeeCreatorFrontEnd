import styled, { css } from "styled-components";

export const SeperationBar = styled.span<{ $primary?: boolean }>`
    color: lightgrey;
    font-size: 12px;
    padding: 2px;
    margin: 0;

    ${(props) => props.$primary && css``}
`;
