import { CurrentWeatherResponse } from "@/types/open-weather";
import delay from "./delay";

const URL =
  //"/test_data/test_weather.json";
  "https://api.openweathermap.org/data/2.5/weather";

type Params = {
  city_name: string;
};

export type ErrorResponse = {
  error: { cod: number; message: string };
};

export const fetchWeather = async ({
  city_name,
}: Params): Promise<CurrentWeatherResponse | ErrorResponse> => {
  const sp = new URLSearchParams({
    q: `${city_name},CA`,
    units: "metric",
    appid: process.env.NEXT_PUBLIC_OW_API_KEY!,
  });
  const res = await fetch(`${URL}?${sp.toString()}`);
  const data = await res.json();
  if (res.ok) {
    return data;
  }
  return {
    error: data,
  };
};
