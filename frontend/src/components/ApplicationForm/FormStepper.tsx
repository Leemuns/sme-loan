"use client";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { FormStepValues } from "../../types";

interface FormStepperProps {
  activeStep: number;
}

export default function FormStepper({ activeStep }: FormStepperProps) {
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {FormStepValues.filter((step: string) => step !== "completion").map(
          (label) => {
            const stepProps: { completed?: boolean } = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          },
        )}
      </Stepper>
    </Box>
  );
}
