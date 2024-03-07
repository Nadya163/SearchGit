import { useState } from "react";
import * as S from "./main.styled";

function MainPage() {
    const [searchUser, setSearchUser] = useState("");
    const [foundUsers, setFoundUsers] = useState([]);
    const [page, setPage] = useState(1); // Загрузка начиная с первой страницы
    const userPerPage = 20; // Константа для вызова только 20 пользователей

    const handleSearch = async (pageNum) => {
        if (searchUser) {
            try {
                const response = await fetch(
                    `https://api.github.com/search/users?q=${searchUser}&per_page=${userPerPage}&page=${pageNum}`,
                );
                const data = await response.json();
                console.log(data);
                setFoundUsers([...foundUsers, ...data.items]);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
    };

    // Функция для загрузки следующих 20 пользователей
    const handleLoadMore = async () => {
        const step = 1;
        const nextPage = page + step;
        setPage(nextPage);
        await handleSearch(nextPage);
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
                    Поиск
                </S.SearchButton>
            </S.SearchItem>
            <S.UserItem>
                <S.ListOfUsers>
                    {foundUsers.map((user) => (
                        <S.ListItem key={user.id}>
                            <S.AvatarUser
                                src={user.avatar_url}
                                alt={user.login}
                            />
                            <S.UserName>{user.login}</S.UserName>
                        </S.ListItem>
                    ))}
                </S.ListOfUsers>
            </S.UserItem>
            <S.SearchButton type="button" onClick={handleLoadMore}>
                Загрузить еще
            </S.SearchButton>
        </S.MainContainer>
    );
}

export default MainPage;
