import feather from "feather-icons";

type Props = {
  label: string;
} & React.HTMLProps<HTMLSpanElement>;

export const Icon = ({ label, ...props }: Props) => (
  <span
    dangerouslySetInnerHTML={{
      __html: feather.icons[label as keyof typeof feather.icons]?.toSvg(),
    }}
    {...props}
  />
);
