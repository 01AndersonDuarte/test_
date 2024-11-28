import { Box, Button, Grid2, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { DriverOption, RideConfirmType } from "../../utils/types";
import Driver from "./Driver";
import { useRideConfirm } from "../../hooks/api/useRides";
import MapWithRoute from "./Map";

interface RideEstimateProps<T> {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  rideEstimateLoading: boolean;
  rideEstimateData: T | null;
}

export default function RideConfirm<T>({
  activeStep,
  setActiveStep,
  rideEstimateLoading,
  rideEstimateData,
}: RideEstimateProps<T>) {
  const [options, setOptions] = useState<DriverOption[] | []>([]);
  const [driverSelected, setDriverSelected] = useState(-1);
  const { confirmRide } = useRideConfirm();

  useEffect(() => {
    /** @ts-expect-error  disable */
    const formattedOptions: DriverOption[] = rideEstimateData?.options?.map(
      (option: DriverOption) => option
    );

    setOptions(formattedOptions);
  }, [rideEstimateData]);

  const handleConfirm = async () => {
    if (activeStep < 2) {
      const formRide = localStorage.getItem("form_ride");

      if (formRide) {
        const parsedFormRide = JSON.parse(formRide);
        const driverChosed = options?.find(
          (data) => data.id === driverSelected
        );

        const confirmRideBody: RideConfirmType = {
          customer_id: parsedFormRide?.customer_id,
          origin: parsedFormRide?.origin,
          destination: parsedFormRide?.destination,
          /** @ts-expect-error  disable */
          distance: rideEstimateData?.distance,
          /** @ts-expect-error  disable */
          duration: rideEstimateData?.duration,
          driver: {
            /** @ts-expect-error  disable */
            id: driverChosed.id,
            /** @ts-expect-error  disable */
            name: driverChosed.name,
          },
          /** @ts-expect-error  disable */
          value: driverChosed?.value,
        };

        await confirmRide(confirmRideBody);
        setActiveStep((prev) => prev + 1);
      }
    }
  };

  return (
    <>
      {rideEstimateLoading ? (
        <>Loading...</>
      ) : (
        <Box>
          <Grid2 container spacing={2}>
            <Typography variant="h6" gutterBottom>
              Escolha o motorista
            </Typography>
            <Button variant="contained" color="primary" onClick={handleConfirm}>
              Confirmar
            </Button>
          </Grid2>

          <MapWithRoute
            origin={{
              /** @ts-expect-error  disable */
              lat: rideEstimateData?.origin.latitude,
              /** @ts-expect-error  disable */
              lng: rideEstimateData?.origin.longitude,
            }}
            destination={{
              /** @ts-expect-error  disable */
              lat: rideEstimateData?.destination.latitude,
              /** @ts-expect-error  disable */
              lng: rideEstimateData?.destination.longitude,
            }}
          />

          <div
            style={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "auto",
            }}
          >
            {options.map((driver) => (
              <Driver
                key={driver.id}
                driver={driver}
                driverSelected={driverSelected}
                setDriverSelected={setDriverSelected}
              />
            ))}
          </div>
        </Box>
      )}
    </>
  );
}
