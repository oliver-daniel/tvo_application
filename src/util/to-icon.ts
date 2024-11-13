import feather from "feather-icons";
/** Convert weather condition codes to an icon:
 * See: https://openweathermap.org/weather-conditions
 */

export const toFeatherIcon = (code: number): keyof typeof feather.icons => {
  switch (Math.floor(code / 100)) {
    case 2:
      return "cloud-lightning"; // Thunderstorm
    case 3:
      return "cloud-drizzle"; // Drizzle
    case 5:
      return "cloud-rain"; // Rain
    case 6:
      return "cloud-snow"; // Snow
    case 7:
      return "alert-triangle"; // Atmosphere/special
    case 8:
      // TODO: could also be moon
      if (code === 800) return "sun"; // Clear
      return "cloud"; // Clouds
    default:
      return "help-circle"; // Unknown
  }
};
