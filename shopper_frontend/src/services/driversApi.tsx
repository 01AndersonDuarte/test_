import api from "./api";

export async function getDrivers() {
  const response = await api.get("drivers");

  return response.data;
}
