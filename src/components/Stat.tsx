/** An accessible component for individual weather statistics. */

import { Icon } from "./Icon";

type Props = {
  icon: string;
  value: string;
  description?: string;
};

export const Stat = ({ icon, value, description }: Props) => (
  <div className="stat" aria-label={description}>
    <Icon label={icon} data-tooltip={description} tabIndex={0} /> {value}
  </div>
);
