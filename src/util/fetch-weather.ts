import { CurrentWeatherResponse } from "@/types/open-weather";
import delay from "./delay";

const URL =
  //"/test_data/test_weather.json";
  "https://api.openweathermap.org/data/2.5/weather";

type Params = {
  city_name: string;
};

export const fetchWeather = async ({
  city_name,
}: Params): Promise<CurrentWeatherResponse> => {
  await delay(1500);
  const sp = new URLSearchParams({
    q: `${city_name},CA`,
    units: "metric",
    appid: process.env.NEXT_PUBLIC_OW_API_KEY!,
  });
  const res = await fetch(`${URL}?${sp.toString()}`);
  return res.json();
};
