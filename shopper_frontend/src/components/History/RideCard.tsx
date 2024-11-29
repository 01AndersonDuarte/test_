import { Card, CardContent, Typography } from "@mui/material";

interface RideCardProps {
  ride: {
    id: string;
    date: string;
    origin: string;
    destination: string;
    distance: number;
    duration: string;
    driver: {
      id: number;
      name: string;
    };
    value: number;
  };
}

export default function RideCard({ ride }: RideCardProps) {
  const formattedDate = new Date(ride.date).toLocaleString();
  const formattedDistance = (ride.distance / 1000).toFixed(2) + " km";
  const formattedValue = `R$ ${(ride.value / 100).toFixed(2)}`;

  return (
    <Card
      variant="outlined"
      sx={{
        marginBottom: 2,
        boxShadow: 1,
        borderRadius: 2,
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Viagem de {ride.origin} para {ride.destination}
        </Typography>
        <Typography>
          <strong>Data:</strong> {formattedDate}
        </Typography>
        <Typography>
          <strong>Motorista:</strong> {ride.driver.name}
        </Typography>
        <Typography>
          <strong>Distância:</strong> {formattedDistance}
        </Typography>
        <Typography>
          <strong>Duração:</strong> {parseInt(ride.duration) / 60} minutos
        </Typography>
        <Typography>
          <strong>Valor:</strong> {formattedValue}
        </Typography>
      </CardContent>
    </Card>
  );
}
