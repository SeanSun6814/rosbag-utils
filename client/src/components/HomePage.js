import { ThemeContext } from "@emotion/react";
import { Button, Stack } from "@mui/material";
import React from "react";
import TopBar from "./TopBar";

export default function RosbagUtilsPage() {
    const theme = React.useContext(ThemeContext);
    const imageUrl = theme.palette.mode === "light" ? "/home_page_background_light.png" : "/home_page_background_dark.png";
    const rgba = theme.palette.mode === "light" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0)";

    return (
        <div style={{
            height: "100vh",
            zIndex: "-10",
            backgroundImage: "url('" + imageUrl + "')",
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}>
            <TopBar />
            <br /><br /><br /><br />
            <center>
                <div style={{
                    backgroundColor: rgba,
                    borderRadius: "20px",
                    width: "fit-content",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                }}>
                    <h1 style={{ fontSize: "50px", fontFamily: "'Montserrat', sans-serif", fontWeight: "bolder" }}>
                        Welcome to Rosbag Utils</h1>
                </div>
            </center>

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "30vh", height: "10vh" }}>
                <Stack direction="row" spacing={4}>
                    <Button variant="contained" size="large" href="/download">
                        Download Datasets
                    </Button>
                    <Button variant="contained" size="large" href="/rosbag-utils">
                        Process Rosbags
                    </Button>
                    <Button variant="contained" size="large" href="/evaluation">
                        Evaluate Trajectories
                    </Button>
                </Stack>
            </div>
        </div>
    );
}