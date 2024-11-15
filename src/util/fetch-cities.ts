import { CityGeocode } from "@/types/open-weather";

const URL = "/test_data/test_cities.json";

// TODO: in future, use more complicated params to intelligently filter
// a larger list.

export const fetchCitySuggestions = async (): Promise<CityGeocode[]> => {
  const res = await fetch(URL);
  return res.json();
};
