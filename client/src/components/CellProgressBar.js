import React from "react";
import { createStyles, createTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";

const defaultTheme = createTheme();
const useStyles = makeStyles(
    (theme) =>
        createStyles({
            root: {
                border: `1px solid ${theme.palette.divider}`,
                position: "relative",
                overflow: "hidden",
                width: "100%",
                height: 26,
                borderRadius: 2,
            },
            value: {
                position: "absolute",
                lineHeight: "24px",
                width: "100%",
                display: "flex",
                justifyContent: "center",
            },
            bar: {
                height: "100%",
                "&.low": {
                    backgroundColor: "#088208a3",
                },
                "&.medium": {
                    backgroundColor: "#088208a3",
                },
                "&.high": {
                    backgroundColor: "#088208a3",
                },
            },
        }),
    { defaultTheme }
);

const ProgressBar = React.memo(function ProgressBar(props) {
    const { value } = props;
    const valueInPercent = value * 100;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.value}>{`${valueInPercent.toLocaleString()} %`}</div>
            <div
                className={clsx(classes.bar, {
                    low: valueInPercent < 30,
                    medium: valueInPercent >= 30 && valueInPercent <= 70,
                    high: valueInPercent > 70,
                })}
                style={{ maxWidth: `${valueInPercent}%` }}
            />
        </div>
    );
});
export function renderProgress(params) {
    return <ProgressBar value={Number(params.value)} />;
}
