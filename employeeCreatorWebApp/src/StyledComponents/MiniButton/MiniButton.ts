import styled, { css } from "styled-components";

export const MiniButton = styled.button<{ $primary?: boolean }>`
    background: transparent;
    border: none;
    text-decoration: underline;
    color: #2d5299;
    margin: 0;
    padding: 0;

    ${(props) => props.$primary && css``}
`;
