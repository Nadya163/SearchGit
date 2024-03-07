import styled from "styled-components";

export const MainContainer = styled.div`
    max-width: 1440px;
    margin: 0 auto;
    padding: 43px 10px 37px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
`;

export const SearchTitle = styled.h1`
    font-size: 40px;
    font-weight: 700;
    margin-bottom: 20px;
`;

export const SearchItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const UsernameInput = styled.input`
    width: 1000px;
    height: 40px;
    border-radius: 5px;
    padding-left: 20px;
    font-size: 20px;
`;

export const SearchButton = styled.button`
    margin-top: 20px;
    width: 250px;
    height: 40px;
    border-radius: 5px;
    margin-top: 20px;
    background-color: #6495ed;
    color: white;
    font-size: 20px;
`;

// export const Styled = styled.div;
