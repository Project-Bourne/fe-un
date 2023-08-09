import React from "react";
import { Step, Stepper, StepLabel } from "@mui/material";

type StepperProps = {
  steps: Array<{ label?: string }>;
  step: any;
  showLastStep?: boolean;
};

const stepperStyle = {
  "& .Mui-active": {
    "&.MuiStepIcon-root": { color: "#4582C4" },
  },
  "& .Mui-completed": {
    "&.MuiStepIcon-root": { color: "#4582C4" },
  },
};

function Stages({ steps, step, showLastStep = true }: StepperProps) {
  return (
    <div
      style={{
        minWidth: "350px",
        maxWidth: "100%",
        width: "100%",
        margin: "0 0 2.5rem 0",
      }}
    >
      <Stepper activeStep={step} sx={stepperStyle} alternativeLabel>
        {steps?.map((label: any, index: number) => {
          if (!showLastStep && index === steps?.length - 1) return null;
          return (
            <Step key={index}>
              <StepLabel>{label.label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
}

export default Stages;
