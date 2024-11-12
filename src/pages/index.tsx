import { CurrentWeatherResponse } from "@/types/open-weather";
import { fetchWeather } from "@/util/fetch-weather";
import { useEffect, useState } from "react";

export default function Home() {
  const [weather, setWeather] = useState({} as CurrentWeatherResponse);

  useEffect(() => {
    (async () => {
      const weatherResult = await fetchWeather({ city_name: "Toronto" });
      setWeather(weatherResult);
    })();
  }, []);
  return (
    <>
      <div>
        <pre>{JSON.stringify(weather, undefined, 2)}</pre>
      </div>
    </>
  );
}
