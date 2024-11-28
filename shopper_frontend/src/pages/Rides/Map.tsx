import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Polyline } from "@react-google-maps/api";

const center = { lat: -23.55052, lng: -46.633308 };

interface MapWithRouteProps {
  origin: string;
  destination: string;
}

const MapWithRoute = ({ origin, destination }: MapWithRouteProps) => {
  const [route, setRoute] = useState<google.maps.LatLng[]>([]);

  useEffect(() => {
    const fetchRoute = async () => {
      // Verifica se a chave da API e o Google Maps estão carregados
      if (typeof window.google === "undefined" || !window.google.maps) {
        console.error("Google Maps API não carregada corretamente");
        return;
      }

      const directionsService = new window.google.maps.DirectionsService();

      directionsService.route(
        {
          origin,
          destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            const routePath = result.routes[0].legs[0].steps
              .map((step) => {
                return step.polyline.getPath().getArray();
              })
              .flat();
            setRoute(routePath);
          } else {
            console.error(`Erro ao buscar direções: ${status}`);
          }
        }
      );
    };

    if (origin && destination) {
      fetchRoute();
    }
  }, [origin, destination]);

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
      <GoogleMap
        center={center}
        zoom={12}
        mapContainerStyle={{ width: "100%", height: "500px" }}
      >
        {route.length > 0 && (
          <Polyline
            path={route}
            options={{
              strokeColor: "#FF0000",
              strokeOpacity: 1,
              strokeWeight: 5,
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapWithRoute;
