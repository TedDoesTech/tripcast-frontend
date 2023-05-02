import axios from "axios";

const DIRECTIONS_API_URL = "https://api.openrouteservice.org/v2/directions/";

export const getDirections = async (
  startPointCoordinates,
  destinationPointCoordinates,
  apiKey
) => {
  try {
    const response = await axios.get(
      `${DIRECTIONS_API_URL}${"driving-car"}?api_key=${apiKey}&start=${startPointCoordinates}&end=${destinationPointCoordinates}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Unable to get directions");
  }
};
