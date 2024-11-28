import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
  /** @ts-expect-error  disable */
} from "@react-google-maps/api";

interface MapWithRouteProps {
  origin: { lat: number; lng: number };
  destination: { lat: number; lng: number };
}

const MapWithRoute: React.FC<MapWithRouteProps> = ({ origin, destination }) => {
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const [googleLoaded, setGoogleLoaded] = useState(false);

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google) {
        setGoogleLoaded(true);
      } else {
        console.error("Google Maps não foi carregado corretamente.");
      }
    };

    loadGoogleMaps();
  }, []);

  useEffect(() => {
    const fetchRoute = async () => {
      if (!origin || !destination || !googleLoaded) return;

      const directionsService = new google.maps.DirectionsService();

      directionsService.route(
        {
          origin,
          destination,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error(`Erro ao buscar direções: ${status}`);
          }
        }
      );
    };

    fetchRoute();
  }, [origin, destination, googleLoaded]);
  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
      <GoogleMap
        center={origin}
        zoom={12}
        mapContainerStyle={{ width: "100%", height: "500px" }}
      >
        {directions && <DirectionsRenderer directions={directions} />}{" "}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapWithRoute;
