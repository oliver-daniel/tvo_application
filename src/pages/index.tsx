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
import { Stat } from "@/components/Stat";

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
            <div className="grid">
              <h2>
                Weather in {weather.name}, {weather.sys.country}
              </h2>
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

            <article>
              <div className="grid">
                <section>
                  <div className="main-report">
                    <div>
                      <Icon label={toFeatherIcon(weather.weather[0].id)} />{" "}
                      {weather.weather[0].description}
                    </div>
                    <div>
                      {fmt.temperature(weather.main.temp)} (Feels like:{" "}
                      {fmt.temperature(weather.main.feels_like)})
                    </div>
                  </div>
                  <div className="precip">
                    {weather.rain ? (
                      <div>
                        <Icon label="umbrella" />{" "}
                        {fmt.precip(weather.rain["1h"])}
                      </div>
                    ) : weather.snow ? (
                      <div>
                        <Icon label="cloud-snow" />{" "}
                        {fmt.precip(weather.snow["1h"])}
                      </div>
                    ) : null}
                  </div>
                </section>
                <section>
                  <div className="grid">
                    <div>
                      <Icon label="sunrise" /> {fmt.time(weather.sys.sunrise)}
                    </div>
                    <div>
                      <Icon label="sunset" /> {fmt.time(weather.sys.sunset)}
                    </div>
                  </div>
                </section>
              </div>
              <section id="extra-info">
                <div className="grid">
                  {[
                    ["wind", `${weather.wind.speed} m/s`, "Wind speed"],
                    [
                      "align-center",
                      fmt.distanceKM(weather.visibility / 1_000),
                      "Visibility",
                    ],
                    [
                      "droplet",
                      fmt.percentage(weather.main.humidity),
                      "Humidity",
                    ],
                    [
                      "cloud-off",
                      fmt.percentage(weather.clouds.all),
                      "Cloud cover",
                    ],
                  ].map(([icon, value, description], i) => (
                    <Stat
                      key={`stat-${i}`}
                      {...{
                        icon,
                        value,
                        description,
                      }}
                    />
                  ))}
                </div>
              </section>
            </article>
          </section>
        )}
      </div>
    </main>
  );
}
