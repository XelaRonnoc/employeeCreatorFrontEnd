import styled, { css } from "styled-components";

export const ListContainer = styled.div<{ $primary?: boolean }>`
    width: 80%;
    align-self: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    ${(props) => props.$primary && css``}
`;
