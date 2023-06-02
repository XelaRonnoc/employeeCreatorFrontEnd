import styled, { css } from "styled-components";

export const CardContainer = styled.div<{ $primary?: boolean }>`
    width: 80%;
    padding: 20px 0px;
    align-self: center;
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid lightgrey;
    ${(props) => props.$primary && css``};
`;
