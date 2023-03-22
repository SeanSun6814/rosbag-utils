import { Button, Stack } from "@mui/material";
import React from "react";
import TopBar from "./TopBar";

// This has 3 big buttons in the center stacked side by side that leads to the rosbag utils page, download page, and evaulation page
export default function RosbagUtilsPage() {
    return (
        <div style={{
            height: "100vh",
            zIndex: "-10",
            backgroundImage: "url('/home_page_background.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}>

            <TopBar />
            <br /><br /><br />
            <center>
                <div style={{
                    backgroundColor: "rgba(100, 100, 100, 0.5)",
                    borderRadius: "20px",
                    width: "fit-content",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                    filter: "brightness(1)"
                }}>
                    <h1 style={{ color: "white", fontSize: "50px", fontFamily: "'Montserrat', sans-serif", fontWeight: "bolder" }}>
                        Welcome to Rosbag Utils</h1>
                </div>
            </center>

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
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
