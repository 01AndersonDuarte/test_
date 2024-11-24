import { RoutesClient } from "@googlemaps/routing";
import { addressToEstimateRoute } from "../utils/types";
import * as errors from "../errors";

export async function computeRoutes(request: addressToEstimateRoute) {
  const routingClient = new RoutesClient({
    apiKey: `${process.env.GOOGLE_API_KEY}`,
  });

  const response = await routingClient.computeRoutes(request, {
    otherArgs: {
      headers: {
        "Content-Type": "application/json",
        "X-Goog-FieldMask":
          "routes.distanceMeters,routes.duration,routes.staticDuration,routes.legs.startLocation,routes.legs.endLocation,routes.polyline.encodedPolyline",
      },
    },
  });

  if (response[0]?.routes && response[0]?.routes?.length > 0) {
    const cleanRoutes = response[0]?.routes.map((route) => ({
      distanceMeters: route.distanceMeters,
      duration: route.duration?.seconds,
      staticDuration: route.staticDuration?.seconds,
      startLocation: route.legs?.[0]?.startLocation?.latLng || null,
      endLocation: route.legs?.[0]?.endLocation?.latLng || null,
      polyline: route.polyline?.encodedPolyline || null,
    }));

    return cleanRoutes;
  } else {
    const dataInvalidMessage = "The source or destination data is invalid";

    throw errors.invalidDataError(dataInvalidMessage);
  }
}
