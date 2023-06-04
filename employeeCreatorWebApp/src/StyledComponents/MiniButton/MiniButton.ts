import styled, { css } from "styled-components";

export const MiniButton = styled.button<{ $primary?: boolean }>`
    background: transparent;
    border: none;
    text-decoration: underline;
    color: #2d5299;
    margin: 0;
    padding: 0;
    cursor: Pointer;

    ${(props) => props.$primary && css``}
`;

export const MiniButtonHolder = styled.div<{ $primary?: boolean }>`
    margin: 0 1em;
    ${(props) => props.$primary && css``}
`;
