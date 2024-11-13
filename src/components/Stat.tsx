/** An accessible component for individual weather statistics. */

import { Icon } from "./Icon";

type Props = {
  icon: string;
  value: string;
  description?: string;
};

export const Stat = ({ icon, value, description }: Props) => (
  <div
    className="stat"
    data-tooltip={description}
    aria-label={description}
    tabIndex={0}
  >
    <Icon label={icon} /> {value}
  </div>
);
