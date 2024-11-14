// Covert a simple representation of stats
// into an array of accessible components.

import { Stat } from "@/components/Stat";

type StatRepr = [icon: string, value: string, description: string];

export const toStats = (items: StatRepr[]) =>
  items.map(([icon, value, description]) => (
    <Stat
      key={`stat-${icon}`}
      {...{
        icon,
        value,
        description,
      }}
    />
  ));
