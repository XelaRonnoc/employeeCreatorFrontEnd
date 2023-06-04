import styled, { css } from "styled-components";

export const HeaderBackground = styled.div<{ $primary?: boolean }>`
    background-color: lightgrey;
    margin: 10px;
    padding: 10px;
    width: 80%;
    height 180px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    align-self: center;
    justify-content: center;
    ${(props) => props.$primary && css``}
`;
