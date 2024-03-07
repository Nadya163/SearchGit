import { Route, Routes } from "react-router-dom";
import User from "./page/User/user";
import MainPage from "./page/Main/mainPage";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/user" element={<User />} />
        </Routes>
    );
}

export default AppRoutes;
