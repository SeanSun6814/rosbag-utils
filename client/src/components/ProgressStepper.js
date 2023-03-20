import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import { useDispatch, connect } from "react-redux";
import { setPageNumber } from "../reducers/status";

const steps = ["Add bags files", "Add message topics", "Add processing tasks", "Finish"];

const HorizontalLinearStepper = ({ children, status }) => {
    const dispatch = useDispatch();
    const activeStep = status.page_number;
    const setActiveStep = (step) => dispatch(setPageNumber(step));

    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            return window.location.reload(true);
            // return setActiveStep(0);
        }
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        if (activeStep === 3) setActiveStep(1);
        else setActiveStep(activeStep - 1);
    };

    let nextButton, prevButton;
    const enableNextButton = status.page_complete && !status.server_busy;
    const enablePrevButton = activeStep !== 0 && activeStep !== steps.length && !status.server_busy;
    if (activeStep === 0) {
        nextButton = "Next";
        prevButton = "Batch Mode";
    } else if (activeStep === 1) {
        nextButton = "Next";
        prevButton = "Back";
    } else if (activeStep === 2) {
        nextButton = "Add task";
        prevButton = "Back";
    } else if (activeStep === 3) {
        nextButton = "Finish";
        prevButton = "Add more tasks";
    } else if (activeStep === 4) {
        nextButton = "Done";
        prevButton = "Add more tasks";
    }

    return (
        <Box sx={{ width: "90%", marginLeft: "5%", marginRight: "5%", marginTop: "25px", height: "calc(100vh - 220px)" }}>
            <Stepper activeStep={activeStep} sx={{ marginBottom: "25px" }}>
                {steps.map((label) => {
                    const stepProps = {};
                    const labelProps = {};

                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <React.Fragment>
                <Box sx={{ height: "100%" }}>{children[activeStep]}</Box>
                <Box sx={{ position: "fixed", bottom: "3vh", width: "90vw", display: "flex", flexDirection: "row", pt: 2 }}>
                    <Button color="inherit" disabled={!enablePrevButton} onClick={handleBack} sx={{ mr: 1 }}>
                        {prevButton}
                    </Button>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button disabled={!enableNextButton} onClick={handleNext}>
                        {nextButton}
                    </Button>
                </Box>
            </React.Fragment>
        </Box>
    );
};

export default connect((state) => ({
    status: state.status,
}))(HorizontalLinearStepper);
