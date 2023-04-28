import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import NotFoundPage from "../components/NotFoundPage";
import RosbagUtilsPage from "../components/rosbagUtils/RosbagUtilsPage";
import HomePage from "../components/HomePage";
import DatasetDownloadPage from "../components/datasetDownload/DatasetDownloadPage";

const AppRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<RosbagUtilsPage />} />
            <Route path={"/home"} element={<HomePage />} />
            <Route path={"/download"} element={<DatasetDownloadPage />} />
            <Route path={"/rosbag-utils"} element={<RosbagUtilsPage />} />
            <Route path={"*"} element={<NotFoundPage />} />
        </Routes>
    </BrowserRouter>
);

export default AppRouter;
