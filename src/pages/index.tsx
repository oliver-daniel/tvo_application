import {
  Typeahead,
  RenderContext as TypeaheadRenderContext,
} from "@/components/Typeahead";
import { CityGeocode, CurrentWeatherResponse } from "@/types/open-weather";
import { fetchCitySuggestions } from "@/util/fetch-cities";
import { ErrorResponse, fetchWeather } from "@/util/fetch-weather";
import { useEffect, useState } from "react";

import fmt from "@/util/format";
import { toFeatherIcon } from "@/util/to-icon";
import { Icon } from "@/components/Icon";
import { Stat } from "@/components/Stat";

export default function Home() {
  const [selectedCity, setSelectedCity] = useState("Toronto");
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState({} as CurrentWeatherResponse);
  const [cities, setCities] = useState([] as CityGeocode[]);
  const [error, setError] = useState<ErrorResponse | null>(null);

  const weatherLoaded = Object.keys(weather).length > 0;

  useEffect(() => {
    (async () => {
      const citySuggestions = await fetchCitySuggestions();
      setCities(citySuggestions);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const weatherResult = await fetchWeather({ city_name: selectedCity });
      if ("error" in weatherResult) {
        setError(weatherResult);
        return;
      }
      setWeather(weatherResult);
      setLoading(false);
      setError(null);
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

  const onTypeaheadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = (e.target as Node).firstChild as HTMLInputElement;
    setSelectedCity(input.value);
  };
  return (
    <main>
      <div className="container">
        <section>
          <div id="top-bar" className="grid">
            <h2>
              {error ? (
                "Error!"
              ) : loading ? (
                "Loading..."
              ) : weatherLoaded ? (
                <>Weather in {weather.name}</>
              ) : (
                "Weather report"
              )}
            </h2>
            <Typeahead
              placeholder="Enter a city..."
              values={cities}
              filterItemKey="name"
              onSubmit={onTypeaheadSubmit}
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
          <article className="card">
            {error ? (
              <section className="error">
                <p>An error occurred while loading weather data.</p>
                <p>Please try again.</p>
              </section>
            ) : loading || !weatherLoaded ? (
              <section aria-busy="true" />
            ) : (
              <>
                <div className="grid">
                  <section>
                    <div id="main-report">
                      <div id="conditions">
                        <Icon label={toFeatherIcon(weather.weather[0].id)} />{" "}
                        {weather.weather[0].description}
                      </div>
                      <div id="temps">
                        {fmt.temperature(weather.main.temp)} (Feels like:{" "}
                        {fmt.temperature(weather.main.feels_like)})
                      </div>
                    </div>
                    <div id="precip">
                      {weather.rain ? (
                        <Stat
                          icon="umbrella"
                          value={fmt.precip(weather.rain["1h"])}
                          description="Rain"
                        />
                      ) : weather.snow ? (
                        <Stat
                          icon="cloud-snow"
                          value={fmt.precip(weather.snow["1h"])}
                          description="Snow"
                        />
                      ) : null}
                    </div>
                  </section>
                  <section>
                    <div className="grid">
                      {[
                        ["sunrise", fmt.time(weather.sys.sunrise), "Sunrise"],
                        ["sunset", fmt.time(weather.sys.sunset), "Sunset"],
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
                </div>
                <hr />
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
              </>
            )}
          </article>
          <hr />
          <small>
            Mouse or tab over any statisic icon to see what it represents.
          </small>
        </section>
      </div>
    </main>
  );
}
