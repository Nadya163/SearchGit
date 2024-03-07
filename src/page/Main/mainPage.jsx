import { useState } from "react";
import * as S from "./main.styled";

function MainPage() {
    const [searchUser, setSearchUser] = useState("");
    const [foundUsers, setFoundUsers] = useState([]);

    const handleSearch = async () => {
        if (searchUser) {
            try {
                const response = await fetch(
                    `https://api.github.com/search/users?q=${searchUser}`,
                );
                const data = await response.json();
                setFoundUsers(data.items);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
    };

    return (
        <S.MainContainer>
            <S.SearchTitle>Search GitHub Users</S.SearchTitle>
            <S.SearchItem>
                <S.UsernameInput
                    type="text"
                    placeholder="Enter username"
                    value={searchUser}
                    onChange={(e) => setSearchUser(e.target.value)}
                />
                <span />
                <S.SearchButton type="button" onClick={handleSearch}>
                    Search
                </S.SearchButton>
            </S.SearchItem>
            <div>
                <ul>
                    {foundUsers.map((user) => (
                        <li key={user.id}>
                            <img src={user.avatar_url} alt={user.login} />
                            {user.login}
                        </li>
                    ))}
                </ul>
            </div>
        </S.MainContainer>
    );
}

export default MainPage;
