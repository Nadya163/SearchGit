import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as api from "../api/userApi";
import * as S from "./userItem.style";

function UserItem() {
    const { userId } = useParams();
    const [userData, setUserData] = useState(null);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [repos, setRepos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const user = await api.fetchUserData(userId);
            setUserData(user);

            const userFollowers = await api.fetchFollowers(user.followers_url);
            setFollowers(userFollowers);

            const userFollowing = await api.fetchFollowing(user.following_url);
            setFollowing(userFollowing);

            const userRepos = await api.fetchRepos(user.repos_url);
            setRepos(userRepos);
        };
        fetchData();
    }, [userId]);

    if (!userData) {
        return <p>Loading...</p>;
    }
    return (
        <S.UserItem>
            <S.AvatarUser src={userData.avatar_url} alt={userData.login} />
            <div>
                <S.UserName>{userData.login}</S.UserName>
                <S.TextUser>Подписчики: {userData.followers}</S.TextUser>
                <S.ListOfUser>
                    {followers.map((follower) => (
                        <Link
                            to={`users/${userId}/followers`}
                            key={follower.id}
                        >
                            <li>{follower.login}</li>
                        </Link>
                    ))}
                </S.ListOfUser>
                <S.TextUser>Подписки: {userData.following}</S.TextUser>
                <ul>
                    {following.map((follower) => (
                        <Link
                            to={`users/${userId}/following{/other_user}`}
                            key={follower.id}
                        >
                            <li>{follower.name}</li>
                        </Link>
                    ))}
                </ul>
                <S.TextUser>Репозитории: {repos.length}</S.TextUser>
                <S.ListOfUser>
                    {repos.map((repo) => (
                        <Link to={`users/${userId}/repos`} key={repo.id}>
                            <li>{repo.name}</li>
                        </Link>
                    ))}
                </S.ListOfUser>
            </div>
        </S.UserItem>
    );
}
export default UserItem;
