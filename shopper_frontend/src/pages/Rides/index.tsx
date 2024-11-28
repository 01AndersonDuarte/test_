import { useState } from "react";
import { Box, Stepper, Step, StepLabel } from "@mui/material";
import RideEstimate from "./RideEstimate";
import RideConfirm from "./RideConfirm";
import { useRideEstimate } from "../../hooks/api/useRides";

export default function Rides() {
  const {
    rideEstimateData,
    rideEstimateLoading,
    rideEstimateError,
    createRideEstimate,
  } = useRideEstimate();
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Box sx={{ width: "80%" }}>
      <Stepper activeStep={activeStep}>
        <Step>
          <StepLabel>Dados</StepLabel>
        </Step>
        <Step>
          <StepLabel>Confirmação</StepLabel>
        </Step>
      </Stepper>

      <Box sx={{ marginTop: 2 }}>
        {activeStep === 0 ? (
          <RideEstimate
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            rideEstimateLoading={rideEstimateLoading}
            rideEstimateError={rideEstimateError}
            createRideEstimate={createRideEstimate}
          />
        ) : (
          <RideConfirm
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            rideEstimateData={rideEstimateData}
            rideEstimateLoading={rideEstimateLoading}
          />
        )}
      </Box>
    </Box>
  );
}
