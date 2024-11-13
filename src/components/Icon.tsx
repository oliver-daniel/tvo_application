import feather from "feather-icons";

type Props = {
  label: string;
};

export const Icon = ({ label }: Props) => (
  <span
    dangerouslySetInnerHTML={{
      __html: feather.icons[label as keyof typeof feather.icons]?.toSvg(),
    }}
  />
);
