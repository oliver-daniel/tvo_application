import { useRef, useState } from "react";
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

  return (
    <div className={styles.typeahead}>
      <input
        ref={inputRef}
        onFocusCapture={() => setInputFocus(true)}
        onChange={(e) => setSearch(e.target.value)}
        {...props}
      />
      <details className="dropdown" open={inputHasFocus}>
        <summary aria-haspopup="listbox" style={{ display: "none" }} />
        <ul role="listbox">
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
