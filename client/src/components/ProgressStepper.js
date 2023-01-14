import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import { connect } from "react-redux";

const steps = ["Add bags files", "Add message topics", "Add processing tasks", "Finish"];

const HorizontalLinearStepper = ({ children, page_complete }) => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    const handleNext = () => {
        if (activeStep === steps.length) return setActiveStep((prevActiveStep) => 0);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    let nextButton;

    if (activeStep === steps.length - 1)
        nextButton = (
            <Button disabled={!page_complete} onClick={handleNext}>
                {"Finish"}
            </Button>
        );
    else if (activeStep === steps.length)
        nextButton = (
            <Button disabled={!page_complete} onClick={handleNext}>
                {"Done"}
            </Button>
        );
    else
        nextButton = (
            <Button disabled={!page_complete} onClick={handleNext}>
                {"Next"}
            </Button>
        );

    return (
        <Box sx={{ width: "90%", marginLeft: "5%", marginRight: "5%", marginTop: "25px", height: "calc(100vh - 220px)" }}>
            <Stepper activeStep={activeStep} sx={{ marginBottom: "25px" }}>
                {steps.map((label, index) => {
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
                {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
                <Box sx={{ height: "100%" }}>{children[activeStep]}</Box>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Button color="inherit" disabled={activeStep === 0 || activeStep === steps.length} onClick={handleBack} sx={{ mr: 1 }}>
                        Back
                    </Button>
                    <Box sx={{ flex: "1 1 auto" }} />
                    {nextButton}
                </Box>
            </React.Fragment>
        </Box>
    );
};

export default connect((state) => ({
    page_complete: state.status.page_complete,
}))(HorizontalLinearStepper);
