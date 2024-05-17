import classNames from "classnames";

const sizes = [
  "text-display-2xl",
  "text-display-xl",
  "text-display-lg",
  "text-display-md",
  "text-display-sm",
  "text-display-xs",

  "text-xl",
  "text-lg",
  "text-md",
  "text-sm",
  "text-xs",
];

export function Typography() {
  return (
    <ul className="flex flex-col gap-8">
      {sizes.map((size) => (
        <li key={size}>
          <FontSize className={size} />
        </li>
      ))}
    </ul>
  );
}

type FontSizeProps = {
  className: string;
};

export function FontSize({ className }: FontSizeProps) {
  return (
    <div>
      <h2 className="border-b py-3 mb-3">{className}</h2>

      <ul className="inline-flex gap-4 capitalize">
        <li className={classNames(className, "font-normal")}>
          <p>Regular</p>
        </li>

        <li className={classNames(className, "font-medium")}>
          <p>Medium</p>
        </li>

        <li className={classNames(className, "font-semibold")}>
          <p>Semibold</p>
        </li>

        <li className={classNames(className, "font-bold")}>
          <p>Bold</p>
        </li>
      </ul>
    </div>
  );
}
