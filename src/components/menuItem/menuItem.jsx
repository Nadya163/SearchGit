import { Link } from "react-router-dom";
import { useState } from "react";
import "regenerator-runtime/runtime";
import * as S from "./menuItem.style";
import { fetchRepos } from "../api/userApi";
import { fetchMoreUsers, fetchUsers } from "../api/mainApi";

function MainItem() {
    const [searchUser, setSearchUser] = useState("");
    const [foundUsers, setFoundUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMoreUsers, setHasMoreUsers] = useState(false);
    const [totalUsers, setTotalUsers] = useState(0);
    const userPerPage = 20; // Константа для вызова только 20 пользователей
    const [reposCount, setReposCount] = useState({});
    const [allReposCount, setAllReposCount] = useState({});

    const sortByReposCount = async (users) => {
        const reposRequests = users.map(async (user) => {
            const repos = await fetchRepos(user.repos_url);
            return { login: user.login, count: repos.length };
        });

        const reposCounts = await Promise.all(reposRequests);

        const updatedReposCount = reposCounts.reduce((acc, curr) => {
            return { ...acc, [curr.login]: curr.count };
        }, {});

        setReposCount(updatedReposCount); // Обновление объекта reposCount

        const usersWithReposCount = users.map((user) => ({
            ...user,
            reposCount: updatedReposCount[user.login] || 0,
        }));

        usersWithReposCount.sort((a, b) => b.reposCount - a.reposCount);

        return usersWithReposCount;
    };
    const handleSearch = async () => {
        if (!searchUser) {
            setFoundUsers([]);
            setHasMoreUsers(false);
            return;
        }
        setPage(1);
        setFoundUsers([]);
        setIsLoading(true);
        if (searchUser) {
            try {
                const data = await fetchUsers(searchUser, userPerPage, 1);

                const sortedUsers = await sortByReposCount(data.items);

                setFoundUsers(sortedUsers);
                setHasMoreUsers(data.total_count > userPerPage);
                setTotalUsers(data.total_count); // Установка общего количества найденных пользователей
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        setIsLoading(false);
    };

    // Функция для загрузки следующих 20 пользователей
    const handleLoadMore = async () => {
        const step = 1;
        const nextPage = page + step;
        setPage(nextPage);
        setIsLoading(true);
        try {
            const data = await fetchMoreUsers(
                searchUser,
                userPerPage,
                nextPage,
            );
            if (foundUsers.length + data.items.length === data.total_count) {
                setHasMoreUsers(false);
            }

            const reposCounts = await sortByReposCount(data.items);
            const updatedAllReposCount = { ...allReposCount, ...reposCounts };

            setAllReposCount(updatedAllReposCount);
            const updatedFoundUsers = data.items.map((user) => ({
                ...user,
                reposCount: updatedAllReposCount[user.login] || 0,
            }));

            setFoundUsers([...foundUsers, ...updatedFoundUsers]);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        setIsLoading(false);
    };

    // Создаем новый массив с пользователями и их количеством репозиториев
    const usersWithReposCount = foundUsers.map((user) => ({
        ...user,
        reposCount: reposCount[user.login] || 0,
    }));

    // Сортируем массив по количеству репозиториев от возрастания до убывания
    usersWithReposCount.sort((a, b) => b.reposCount - a.reposCount);
    return (
        <>
            <S.SearchItem>
                <S.UsernameInput
                    type="text"
                    placeholder="Enter username"
                    value={searchUser}
                    onChange={(e) => setSearchUser(e.target.value)}
                />
                <div>
                    {usersWithReposCount.length > 0 && !isLoading && (
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
                                <p>Репозитории: {user.reposCount}</p>
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
        </>
    );
}

export default MainItem;
