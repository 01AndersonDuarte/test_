import {
  Box,
  TextField,
  MenuItem,
  Select,
  Button,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useDrivers } from "../../hooks/api/useDrivers";

export default function History() {
  const { driversData, driversLoading } = useDrivers();
  const filtros = {
    customer_id: "",
    driver_id: "all",
  };

  const handleApplyFilter = () => {
    console.log("Filtros aplicados:", filtros);
  };

  return (
    <>
      {driversLoading ? (
        "Loading..."
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 600,
            margin: "auto",
            padding: 3,
            gap: 2,
          }}
        >
          <h2>Histórico de Viagens</h2>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 2,
            }}
          >
            <TextField
              label="ID do Usuário"
              variant="outlined"
              name="customer_id"
              value={filtros.customer_id}
              onChange={(event) => (filtros.customer_id = event.target.value)}
              fullWidth
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              alignItems: "center",
              width: "100%",
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="driver-select-label">Motorista</InputLabel>
              <Select
                value={filtros.driver_id}
                onChange={(event) => (filtros.driver_id = event.target.value)}
                label="Motorista"
              >
                <MenuItem value="all">Todos</MenuItem>
                {/** @ts-expect-error  disable */}
                {driversData?.map((driver) => (
                  <MenuItem key={driver.id} value={driver.id}>
                    {driver.id}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              onClick={handleApplyFilter}
              sx={{
                height: "100%",
              }}
            >
              Aplicar Filtro
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
}
