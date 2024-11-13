import {
  Typeahead,
  RenderContext as TypeaheadRenderContext,
} from "@/components/Typeahead";
import { CityGeocode, CurrentWeatherResponse } from "@/types/open-weather";
import { fetchCitySuggestions } from "@/util/fetch-cities";
import { fetchWeather } from "@/util/fetch-weather";
import { useEffect, useState } from "react";

import fmt from "@/util/format";
import { toFeatherIcon } from "@/util/to-icon";
import { Icon } from "@/components/Icon";

export default function Home() {
  const [selectedCity, setSelectedCity] = useState("Toronto");
  const [weather, setWeather] = useState({} as CurrentWeatherResponse);
  const [cities, setCities] = useState([] as CityGeocode[]);

  const weatherLoaded = Object.keys(weather).length > 0;

  useEffect(() => {
    (async () => {
      const citySuggestions = await fetchCitySuggestions();
      setCities(citySuggestions);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setWeather({} as CurrentWeatherResponse);
      const weatherResult = await fetchWeather({ city_name: selectedCity });
      setWeather(weatherResult);
    })();
  }, [selectedCity]);

  const onItemSelect =
    (city: CityGeocode, { ref: inputRef, dispatch }: TypeaheadRenderContext) =>
    () => {
      const label = `${city.name}, ${city.country}`;
      if (inputRef.current) inputRef.current.value = label;
      setSelectedCity(city.name);
      dispatch(false);
    };
  return (
    <main>
      <div className="container">
        {/* <pre>{JSON.stringify(weather, undefined, 2)}</pre> */}
        {!weatherLoaded ? (
          <section aria-busy="true" />
        ) : (
          <section>
            <h2>
              Weather in {weather.name}, {weather.sys.country}
            </h2>
            <article>
              <div>
                <Icon label={toFeatherIcon(weather.weather[0].id)} />{" "}
                {weather.weather[0].id}
                {weather.weather[0].description} ({weather.weather[0].main}){" "}
              </div>
              <div>Temperature: {fmt.temperature(weather.main.temp)}</div>
              <div>Feels like: {fmt.temperature(weather.main.feels_like)}</div>
              <div>
                Visibility: {fmt.distanceKM(weather.visibility / 1_000)}
              </div>
              <div>Cloud cover: {fmt.percentage(weather.clouds.all)}</div>
              <div>Sunrise: {fmt.time(weather.sys.sunrise)}</div>
              <div>Sunset: {fmt.time(weather.sys.sunset)}</div>
              {weather.rain && (
                <div>Rain: {fmt.precip(weather.rain["1h"])}</div>
              )}
              {weather.snow && (
                <div>Snow: {fmt.precip(weather.snow["1h"])}</div>
              )}
            </article>
          </section>
        )}

        <Typeahead
          placeholder="Enter a city..."
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
    </main>
  );
}
