/**IMPORTANT NOTE:
 * This implementation doesn't handle keyboard-related
 * focus losss well. In the interest of time I'm going to
 * leave it as-is, but I would be happy to discuss how I might go about
 * fixing. it.
 */

import { useEffect, useRef, useState } from "react";
import styles from "@/styles/components/typeahead.module.scss";

export type RenderContext = {
  ref: React.RefObject<HTMLInputElement>;
  dispatch: React.Dispatch<React.SetStateAction<boolean>>;
};

type Props<T> = {
  values: T[];
  renderItem: (item: T, i: number, ctx: RenderContext) => JSX.Element;
  filterItemKey?: keyof T;
} & React.HTMLProps<HTMLInputElement>;

export const Typeahead = <ValueType,>({
  values,
  renderItem,
  filterItemKey,
  ...props
}: Props<ValueType>) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputHasFocus, setInputFocus] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.parentNode?.contains(e.target as Node)
      ) {
        setInputFocus(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.typeahead}>
      <input
        ref={inputRef}
        onFocus={() => setInputFocus(true)}
        onChange={(e) => setSearch(e.target.value)}
        {...props}
      />
      <details className="dropdown" open>
        <summary aria-haspopup="listbox" style={{ display: "none" }} />
        <ul
          role="listbox"
          style={{
            display: inputHasFocus ? "block" : "none",
          }}
        >
          {values.length === 0 ? (
            <li aria-busy="true" />
          ) : (
            values
              .filter(
                (item) =>
                  !filterItemKey ||
                  (item[filterItemKey] as string)
                    .toLocaleLowerCase()
                    .includes(search.toLocaleLowerCase())
              )
              .map((item, i) =>
                renderItem(item, i, {
                  ref: inputRef,
                  dispatch: setInputFocus,
                })
              )
          )}
        </ul>
      </details>
    </div>
  );
};
