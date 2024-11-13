import {
  Typeahead,
  RenderContext as TypeaheadRenderContext,
} from "@/components/Typeahead";
import { CityGeocode, CurrentWeatherResponse } from "@/types/open-weather";
import { fetchCitySuggestions } from "@/util/fetch-cities";
import { fetchWeather } from "@/util/fetch-weather";
import { useEffect, useState } from "react";

export default function Home() {
  const [weather, setWeather] = useState({} as CurrentWeatherResponse);
  const [cities, setCities] = useState([] as CityGeocode[]);

  useEffect(() => {
    (async () => {
      const citySuggestions = await fetchCitySuggestions();
      setCities(citySuggestions);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const weatherResult = await fetchWeather({ city_name: "Toronto" });
      setWeather(weatherResult);
    })();
  }, []);

  const onItemSelect =
    (city: CityGeocode, { ref: inputRef, dispatch }: TypeaheadRenderContext) =>
    () => {
      const label = `${city.name}, ${city.country}`;
      if (inputRef.current) inputRef.current.value = label;
      dispatch(false);
    };
  return (
    <>
      <div>
        <pre>{JSON.stringify(weather, undefined, 2)}</pre>

        <Typeahead
          values={cities}
          filterItemKey="name"
          renderItem={(city, i, ctx) => (
            <li key={`${city}-${i}`}>
              <a
                href="#"
                onClick={onItemSelect(city, ctx)}
                onSelect={onItemSelect(city, ctx)}
              >
                {city.name}, {city.country}
              </a>
            </li>
          )}
        />
      </div>
    </>
  );
}
