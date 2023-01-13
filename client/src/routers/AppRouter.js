import React from "react";
import { Router, Route, BrowserRouter, Routes } from "react-router-dom";
import NotFoundPage from "../components/NotFoundPage";
import HomePage from "../components/HomePage";
import TaskPage from "../components/TaskPage";
import BagPage from "../components/BagPage";
import TopicsPage from "../components/TopicsPage";

const AppRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<HomePage />} />
            <Route path={"*"} element={<NotFoundPage />} />
        </Routes>
    </BrowserRouter>
);

export default AppRouter;
