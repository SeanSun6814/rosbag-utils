import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import NotFoundPage from "../components/NotFoundPage";
import HomePage from "../components/HomePage";

const AppRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<HomePage />} />
            <Route path={"*"} element={<NotFoundPage />} />
        </Routes>
    </BrowserRouter>
);

export default AppRouter;
