const formats = {
  temperature: (temp: number) =>
    new Intl.NumberFormat(undefined, {
      style: "unit",
      unit: "celsius",
      maximumFractionDigits: 1,
    }).format(temp),

  percentage: (amt: number) =>
    new Intl.NumberFormat(undefined, {
      style: "unit",
      unit: "percent",
    }).format(amt),

  distanceKM: (distance: number) =>
    new Intl.NumberFormat(undefined, {
      style: "unit",
      unit: "kilometer",
      maximumFractionDigits: 0,
    }).format(distance),

  time: (timestamp: number) =>
    new Date(timestamp * 1_000).toLocaleTimeString(undefined, {
      hour12: true,
      hour: "numeric",
      minute: "2-digit",
    }),

    precip: (rate: number) => 
        `${rate} mm/h`
};

export default formats;
