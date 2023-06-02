import styled, { css } from "styled-components";

export const StyledForm = styled.form<{ $primary?: boolean }>`
    width: 80%;
    align-self: center;
    display: flex;
    flex-direction: column;
    align-items: left;

    ${(props) => props.$primary && css``}
`;

export const SubSection = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px 0;
`;

export const StyledInput = styled.input`
    border: 2px solid grey;
    border-radius: 5px;
    padding: 7px 12px;
    font-size: 1.2rem;
    max-width: 300px;
`;

export const StyledLabel = styled.label`
    font-size: 12px;
    font-weight: bold;
`;

export const Small = styled.small`
    font-size: 10px;
    color: grey;
`;
