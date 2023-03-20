import * as React from "react";
import "./App.css";
import AppRouter from "./routers/AppRouter";
import WebSocketProvider from "./components/Websockets";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { connect } from "react-redux";
import { connect } from "react-redux";
import { connect } from "react-redux";
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
