import { DriverOption as DriverOptionType } from "../../utils/types";
import { Card, CardContent, Typography, Box } from "@mui/material";

interface DriverProps {
  driver: DriverOptionType;
  driverSelected: number;
  setDriverSelected: React.Dispatch<React.SetStateAction<number>>;
}

export default function Driver({
  driver,
  driverSelected,
  setDriverSelected,
}: DriverProps) {
  const isSelected = driverSelected === driver.id;
  const handleClick = (driverId: number) => {
    setDriverSelected(driverId);
  };

  function transformRating(rating: number): string {
    const fraction = Math.round(rating * 5);

    return `${fraction} / 5`;
  }

  return (
    <Card
      variant="outlined"
      sx={{
        minWidth: "100%",
        marginBottom: 2,
        backgroundColor: isSelected ? "#e0f7fa" : "white",
        cursor: "pointer",
        border: isSelected ? "2px solid #00bcd4" : "1px solid #ccc",
      }}
      onClick={() => handleClick(driver.id)}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {driver.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" paragraph>
          {driver.description}
        </Typography>
        <Typography variant="body1">
          <strong>Veículo:</strong> {driver.vehicle}
        </Typography>
        <Box mt={1}>
          <Typography variant="body1">
            <strong>Avaliação:</strong> {transformRating(driver.review.rating)}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <strong>Comentário:</strong> {driver.review.comment}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
            <strong>Valor:</strong> ${driver.value.toFixed(2)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
