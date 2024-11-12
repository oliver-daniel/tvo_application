import { CurrentWeatherResponse } from "@/types/open-weather";

const URL = "https://api.openweathermap.org/data/2.5/weather";

type Params = {
  city_name: string;
};

export const fetchWeather = async ({
  city_name,
}: Params): Promise<CurrentWeatherResponse> => {
  const sp = new URLSearchParams({
    q: `${city_name},CA`,
    appid: process.env.NEXT_PUBLIC_OW_API_KEY!,
  });
  const res = await fetch(`${URL}?${sp.toString()}`);
  return res.json();
};
