import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";

export default function Rides() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    customerId: "",
    origin: "",
    destination: "",
  });

  const rideEstimateConfirm = () => {
    if (activeStep === 0) {
      if (!formData.customerId || !formData.origin || !formData.destination) {
        alert("Preencha todos os campos!");
        return;
      }
    }
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleConfirm = () => {
    // if (activeStep < 2) {
    //   setActiveStep((prev) => prev + 1);
    // }
    setActiveStep((prev) => prev + 1);
    alert("Confirmado");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
          <>
            <Typography variant="h6" gutterBottom>
              Solicitar viagem
            </Typography>
            <Box
              component="form"
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              onSubmit={(e) => {
                e.preventDefault();
                rideEstimateConfirm();
              }}
            >
              <TextField
                label="ID do Usuário"
                name="customerId"
                value={formData.customerId}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="Endereço de Origem"
                name="origin"
                value={formData.origin}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="Endereço de Destino"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                required
                fullWidth
              />
              <Button variant="contained" color="primary" type="submit">
                Buscar viagem
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Typography variant="h6" gutterBottom>
              Etapa 2
            </Typography>
            <Button variant="contained" color="primary" onClick={handleConfirm}>
              Confirmar
            </Button>
            <Button onClick={handleBack} sx={{ mt: 1 }}>
              Voltar
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}
