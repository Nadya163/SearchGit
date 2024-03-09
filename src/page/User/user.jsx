import { useNavigate } from "react-router-dom";
import * as S from "./user.styles";
import UserItem from "../../components/userItem/userItem";

function User() {
    const navigate = useNavigate();

    const handleReturn = () => {
        navigate("/");
    };
    return (
        <S.MainContainer>
            <S.SearchButton type="button" onClick={handleReturn}>
                Вернуться в меню
            </S.SearchButton>
            <UserItem />
        </S.MainContainer>
    );
}
export default User;
