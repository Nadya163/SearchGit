import MainItem from "../../components/menuItem/menuItem";
import * as S from "./main.styled";

function MainPage() {
    return (
        <S.MainContainer>
            <S.SearchTitle>Search GitHub Users</S.SearchTitle>
            <MainItem />
        </S.MainContainer>
    );
}

export default MainPage;
