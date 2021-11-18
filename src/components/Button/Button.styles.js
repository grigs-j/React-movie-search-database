import styled from "styled-components";

export const Wrapper = styled.button`
    display: block;
    background: rgb(46, 134, 235);
    width: 25%;
    min-width: 200px;
    height: 60px;
    border-radius: 30px;
    color: var(--white);
    border: 0;
    font-size: var(--fontBig);
    margin: 20px auto;
    outline: none;
    cursor: pointer;
    transition: all 300ms;
    color: #fff;
    :hover {
        opacity: 0.8;
    }
`;
