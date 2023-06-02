import styled, { css } from "styled-components";

export const PageHolder = styled.div<{ $primary?: boolean }>`
    width: 100%;
    display: flex;
    flex-direction: column;

    ${(props) => props.$primary && css``}
`;
