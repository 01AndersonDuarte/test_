import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { RideEstimateBody } from "../../utils/types";

interface RideEstimateProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  rideEstimateLoading: boolean;
  rideEstimateError: Error | null;
  createRideEstimate: (rideEstimate: RideEstimateBody) => Promise<unknown>;
}

export default function RideEstimate({
  activeStep,
  setActiveStep,
  rideEstimateLoading,
  rideEstimateError,
  createRideEstimate,
}: RideEstimateProps) {
  const [formData, setFormData] = useState({
    customerId: "",
    origin: "",
    destination: "",
  });

  const rideEstimateAct = async () => {
    if (activeStep === 0) {
      if (!formData.customerId || !formData.origin || !formData.destination) {
        alert("Preencha todos os campos!");
        return;
      }
    }

    const rideEstimateBody: RideEstimateBody = {
      customer_id: formData.customerId,
      origin: formData.origin,
      destination: formData.destination,
    };

    createRideEstimate(rideEstimateBody).then(() => {
      localStorage.setItem("form_ride", JSON.stringify(rideEstimateBody));
      setActiveStep((prev) => prev + 1);
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Solicitar viagem
      </Typography>

      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        onSubmit={(e) => {
          e.preventDefault();
          rideEstimateAct();
        }}
      >
        <TextField
          label="ID do Usuário"
          name="customerId"
          value={formData.customerId}
          onChange={handleChange}
          required
          fullWidth
          disabled={rideEstimateLoading}
        />
        <TextField
          label="Endereço de Origem"
          name="origin"
          value={formData.origin}
          onChange={handleChange}
          required
          fullWidth
          disabled={rideEstimateLoading}
        />
        <TextField
          label="Endereço de Destino"
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          required
          fullWidth
          disabled={rideEstimateLoading}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={rideEstimateLoading}
        >
          {rideEstimateLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Buscar viagem"
          )}
        </Button>

        {/** @ts-expect-error  disable */}
        {rideEstimateError?.response?.data?.error_code === "INVALID_DATA" && (
          <Typography color="error" sx={{ mt: 1 }}>
            Dados inválidos
          </Typography>
        )}
      </Box>
    </>
  );
}
