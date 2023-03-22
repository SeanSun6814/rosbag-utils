import React from "react";
import TopBar from "./TopBar";

export default function NotFoundPage() {
    return (
        <div>
            <div style={{ position: "absolute", margin: "auto", top: 0, right: 0, bottom: 0, left: 0 }}>
                <center>
                    <h1 style={{ fontSize: "200px", fontFamily: "'Montserrat', sans-serif", fontWeight: "bolder" }}>404</h1>
                </center>
                <center>
                    <p style={{ fontSize: "50px", fontFamily: "'Montserrat', sans-serif", fontWeight: "bolder" }}>I think you broke it</p>
                </center>
            </div>
            <TopBar />
        </div>
    );
}
