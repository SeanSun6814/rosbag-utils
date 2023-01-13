import * as React from "react";
import "./App.css";
import AppRouter from "./routers/AppRouter";
import WebSocketProvider, { WebSocketContext } from "./components/Websockets";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { connect, useDispatch } from "react-redux";
import { Box } from "@mui/system";
import { CssBaseline } from "@mui/material";

function App(props) {
    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: props.theme,
                },
            }),
        [props.theme]
    );
    return (
        <ThemeProvider theme={theme}>
            <WebSocketProvider>
                <CssBaseline />
                <AppRouter />
            </WebSocketProvider>
        </ThemeProvider>
    );
}

export default connect((state) => ({
    theme: state.settings.theme,
}))(App);
