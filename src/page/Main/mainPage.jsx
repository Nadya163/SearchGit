import { useState } from "react";
import * as S from "./main.styled";

function MainPage() {
    const [searchUser, setSearchUser] = useState("");
    const [foundUsers, setFoundUsers] = useState([]);
    const [page, setPage] = useState(1); // Загрузка начиная с первой страницы
    const [isLoading, setIsLoading] = useState(false); // Состояние загрузки данных
    const [hasMoreUsers, setHasMoreUsers] = useState(false); // Состояние для определения наличия больше пользователей
    const userPerPage = 20; // Константа для вызова только 20 пользователей

    const handleSearch = async () => {
        if (!searchUser) {
            setFoundUsers([]);
            setHasMoreUsers(false);
            return;
        }
        setPage(1); // Сбросить номер страницы при новом запросе
        setFoundUsers([]); // Сбросить список найденных пользователей
        setIsLoading(true); // Установить состояние загрузки в true
        if (searchUser) {
            try {
                const response = await fetch(
                    `https://api.github.com/search/users?q=${searchUser}&per_page=${userPerPage}&page=1`,
                );
                const data = await response.json();
                setFoundUsers(data.items);
                setHasMoreUsers(data.total_count > userPerPage);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        setIsLoading(false); // Установить состояние загрузки в false после завершения запроса
    };

    // Функция для загрузки следующих 20 пользователей
    const handleLoadMore = async () => {
        const step = 1;
        const nextPage = page + step;
        setPage(nextPage);
        setIsLoading(true);
        try {
            const response = await fetch(
                `https://api.github.com/search/users?q=${searchUser}&per_page=${userPerPage}&page=${nextPage}`,
            );
            const data = await response.json();
            setFoundUsers([...foundUsers, ...data.items]);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        setIsLoading(false);
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
                <S.SearchButton
                    type="button"
                    onClick={handleSearch}
                    disabled={isLoading}
                >
                    {isLoading ? "Загрузка..." : "Поиск"}
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
            {hasMoreUsers && (
                <S.SearchButton
                    type="button"
                    onClick={handleLoadMore}
                    disabled={isLoading}
                >
                    {isLoading ? "Загрузка..." : "Загрузить еще"}
                </S.SearchButton>
            )}
        </S.MainContainer>
    );
}

export default MainPage;
