import GlobalStyles from "./GlobalStyles";
import AppRoutes from "./router";
import * as S from "./App.styled";

function App() {
    return (
        <div>
            <GlobalStyles />
            <S.Wrapper>
                <S.Container>
                    <AppRoutes />
                </S.Container>
            </S.Wrapper>
        </div>
    );
}

export default App;
