import { CityGeocode } from "@/types/open-weather";

const URL = "/test_data/test_cities.json"
const TEST_DELAY = 3000;

// TODO: in future, use more complicated params to intelligently filter
// a larger list.

export const fetchCitySuggestions = async (): Promise<CityGeocode[]> => {
    await new Promise((resolve) => setTimeout(resolve, TEST_DELAY));
    const res = await fetch(URL);
    return res.json();
}