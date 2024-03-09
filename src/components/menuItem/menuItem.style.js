import styled from "styled-components";

export const SearchItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const UsernameInput = styled.input`
    width: 1100px;
    height: 40px;
    border-radius: 5px;
    padding-left: 20px;
    font-size: 20px;
`;

export const SearchButton = styled.button`
    margin-top: 30px;
    width: 250px;
    height: 40px;
    border-radius: 5px;
    background-color: #6495ed;
    color: white;
    font-size: 20px;
`;

export const UserItem = styled.div`
    padding-right: 70px;
    padding-left: 70px;
`;
export const ListOfUsers = styled.ul`
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 20px;
`;

export const ListItem = styled.li`
    width: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const AvatarUser = styled.img`
    width: 200px;
`;

export const UserName = styled.p`
    margin-top: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: bold;
`;

// export const Styled = styled.div;
