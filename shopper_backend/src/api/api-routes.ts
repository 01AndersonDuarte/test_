import { RoutesClient } from "@googlemaps/routing";
import { addressToEstimateRoute } from "../utils/types";
import * as errors from "../errors";

type RefinedRoute = {
  distanceMeters: number;
  duration: string;
  staticDuration: string;
  startLocation: { latitude: number; longitude: number };
  endLocation: { latitude: number; longitude: number };
  polyline: string;
};

export async function computeRoutes(request: addressToEstimateRoute) {
  const routingClient = new RoutesClient({
    apiKey: `${process.env.GOOGLE_API_KEY}`,
  });

  const response = await routingClient.computeRoutes(request, {
    otherArgs: {
      headers: {
        "Content-Type": "application/json",
        "X-Goog-FieldMask":
          "routes.distanceMeters,routes.duration,routes.legs.startLocation,routes.legs.endLocation,routes.polyline.encodedPolyline",
      },
    },
  });

  if (response[0]?.routes && response[0]?.routes?.length > 0) {
    const cleanRoute: RefinedRoute = {
      distanceMeters: response[0]?.routes?.[0]?.distanceMeters ?? 0,
      duration: (response[0]?.routes?.[0]?.duration?.seconds ?? 0).toString(),
      staticDuration: (
        response[0]?.routes?.[0]?.staticDuration?.seconds ?? 0
      ).toString(),
      startLocation: {
        latitude:
          response[0]?.routes?.[0]?.legs?.[0]?.startLocation?.latLng
            ?.latitude ?? 0,
        longitude:
          response[0]?.routes?.[0]?.legs?.[0]?.startLocation?.latLng
            ?.longitude ?? 0,
      },
      endLocation: {
        latitude:
          response[0]?.routes?.[0]?.legs?.[0]?.endLocation?.latLng?.latitude ??
          0,
        longitude:
          response[0]?.routes?.[0]?.legs?.[0]?.endLocation?.latLng?.longitude ??
          0,
      },
      polyline: response[0]?.routes?.[0]?.polyline?.encodedPolyline ?? "",
    };

    return { response, cleanRoute };
  } else {
    const dataInvalidMessage = "The source or destination data is invalid";

    throw errors.invalidDataError(dataInvalidMessage);
  }
}
