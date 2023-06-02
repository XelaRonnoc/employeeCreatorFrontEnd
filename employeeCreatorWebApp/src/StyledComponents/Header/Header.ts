import styled, { css } from "styled-components";

export const Header = styled.h1<{ $primary?: boolean }>`
    background: transparent;
    color: black;
    margin: 10px;
    padding: 10px 8%;
    font-size: 32px;

    ${(props) => props.$primary && css``}
`;
