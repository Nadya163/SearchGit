import { useState } from "react";
import { Link } from "react-router-dom";
import * as S from "./main.styled";

function MainPage() {
    const [searchUser, setSearchUser] = useState("");
    const [foundUsers, setFoundUsers] = useState([]);
    const [page, setPage] = useState(1); // Загрузка начиная с первой страницы
    const [isLoading, setIsLoading] = useState(false); // Состояние загрузки данных
    const [hasMoreUsers, setHasMoreUsers] = useState(false); // Состояние для определения наличия больше пользователей
    const [totalUsers, setTotalUsers] = useState(0); // Состояние для общего количества найденных пользователей
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
                console.log(data);
                setHasMoreUsers(data.total_count > userPerPage);
                setTotalUsers(data.total_count); // Установка общего количества найденных пользователей
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
            if (foundUsers.length + data.items.length === data.total_count) {
                setHasMoreUsers(false);
            }
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
                <div>
                    {foundUsers.length > 0 && !isLoading && (
                        <p>{`Найдено пользователей: ${totalUsers}`}</p>
                    )}
                    {!isLoading && searchUser && foundUsers.length === 0 && (
                        <p>Ничего не найдено</p>
                    )}
                </div>
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
                        <Link to={`/users/${user.login}`} key={user.id}>
                            <S.ListItem>
                                <S.AvatarUser
                                    src={user.avatar_url}
                                    alt={user.login}
                                />
                                <S.UserName>{user.login}</S.UserName>
                            </S.ListItem>
                        </Link>
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
