import {
  Box,
  TextField,
  MenuItem,
  Select,
  Button,
  InputLabel,
  FormControl,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useDrivers } from "../../hooks/api/useDrivers";
import { useEffect, useState } from "react";
import { useRidesConfirmed } from "../../hooks/api/useRides";
import { Filters } from "../../utils/types";
import RideCard from "../../components/History/RideCard";

export default function History() {
  const { driversData, driversLoading } = useDrivers();
  const {
    ridesConfirmedData,
    ridesConfirmedLoading,
    ridesConfirmedError,
    getRidesConfirmed,
  } = useRidesConfirmed();
  const [filters, setFilters] = useState<Filters>({
    customer_id: "",
    driver_id: "all",
  });

  useEffect(() => {
    const formRide = localStorage.getItem("form_ride");

    if (formRide) {
      const parsedFormRide = JSON.parse(formRide);
      filters.customer_id = parsedFormRide.customer_id;

      handleApplyFilter();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** @ts-expect-error  disable */
  const handleChange = (field: string) => (event) => {
    const { value } = event.target;
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleApplyFilter = async () => {
    await getRidesConfirmed(filters);
    console.log("RIDES: ", ridesConfirmedData);
  };

  return (
    <>
      {driversLoading ? (
        <CircularProgress size={24} color="inherit" />
      ) : (
        <Box
          sx={{
            margin: "auto",
            gap: 2,
          }}
        >
          <h2>Histórico de Viagens</h2>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              alignItems: "center",
              width: "100%",
            }}
          >
            <TextField
              label="ID do Usuário"
              variant="outlined"
              disabled={ridesConfirmedLoading}
              value={filters.customer_id}
              onChange={handleChange("customer_id")}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel id="driver-select-label">Motorista</InputLabel>
              <Select
                value={filters.driver_id}
                onChange={handleChange("driver_id")}
                disabled={ridesConfirmedLoading}
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
            >
              {ridesConfirmedLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Aplicar Filtro"
              )}
            </Button>
          </Box>

          {/* @ts-expect-error disable */}
          {ridesConfirmedError?.response?.data?.error_code ===
          "NO_RIDES_FOUND" ? (
            <Typography color="error" sx={{ mt: 1 }}>
              Nenhuma viagem encontrada.
            </Typography>
          ) : ridesConfirmedData ? (
            /* @ts-expect-error disable */
            ridesConfirmedData.data?.rides?.map((ride) => (
              <RideCard key={ride.id} ride={ride} />
            ))
          ) : (
            <></>
          )}
        </Box>
      )}
    </>
  );
}
