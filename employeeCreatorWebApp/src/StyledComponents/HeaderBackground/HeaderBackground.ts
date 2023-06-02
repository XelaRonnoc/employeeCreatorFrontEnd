import styled, { css } from "styled-components";

export const HeaderBackground = styled.div<{ $primary?: boolean }>`
    background-color: lightgrey;
    margin: 10px;
    padding: 10px;
    width: 80%;
    height 180px;
    display: flex;
    justify-content: left;
    align-self: center;
    align-items: center;
    ${(props) => props.$primary && css``}
`;
