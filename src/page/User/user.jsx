import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as S from "./user.styles";

function User() {
    const { userId } = useParams();
    const [userData, setUserData] = useState(null);

    console.log(userId);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(
                    `https://api.github.com/users/${userId}`,
                );
                const data = await response.json();
                setUserData(data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUserData();
    }, [userId]);

    if (!userData) {
        return <p>Loading...</p>;
    }

    return (
        <S.MainContainer>
            <S.SearchButton type="button">Вернуться в меню</S.SearchButton>
            <div>
                <img src={userData.avatar_url} alt={userData.login} />
                <h2>{userData.login}</h2>
                <p>{userData.followers_url}</p>
            </div>
        </S.MainContainer>
    );
}
export default User;
