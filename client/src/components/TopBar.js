import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { toggleTheme } from "../actions/settings";
import { connect, useDispatch } from "react-redux";
import WifiTetheringIcon from "@mui/icons-material/WifiTethering";
import WifiTetheringOffIcon from "@mui/icons-material/WifiTetheringOff";

function TopBar(props) {
    const dispatch = useDispatch();
    const changeTheme = () => {
        console.log("Changing theme");
        dispatch(toggleTheme());
    };
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <img src={process.env.PUBLIC_URL + "/favicon.ico"} width="50px" height="50px" style={{ marginRight: "20px" }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 1000,
                            letterSpacing: ".1rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        Rosbag Utils
                    </Typography>
                    <Box sx={{ flexGrow: 5 }}></Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Dark mode">
                            <IconButton onClick={(e) => changeTheme()}>
                                <Brightness4Icon color="action" />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Box sx={{ flexGrow: 0, marginLeft: "20px" }}>
                        {props.ws_connected ? (
                            <Tooltip title="Connected to backend server">
                                <IconButton>
                                    <WifiTetheringIcon color="action" />
                                </IconButton>
                            </Tooltip>
                        ) : (
                            <Tooltip title="Disconnected from backend server">
                                <IconButton>
                                    <WifiTetheringOffIcon color="error" />
                                </IconButton>
                            </Tooltip>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default connect((state) => ({
    ws_connected: state.settings.ws_connected,
}))(TopBar);
