import React from "react";

export type ColorsProps = {
  name: string;
  colors: Record<number, string>;
};

export function Colors({ name, colors }: ColorsProps) {
  return (
    <div className="flex flex-col gap-8">
      <h2 className="font-medium text-lg">{name}</h2>

      <ol className="inline-flex gap-4 flex-wrap text-sm">
        {Object.entries(colors).map(([key, value]) => (
          <li
            key={key}
            className="flex flex-col rounded overflow-hidden shadow"
          >
            <div
              className="h-16 aspect-video"
              style={{ backgroundColor: value }}
            />
            <div className="flex flex-col p-2">
              <span>{key}</span>
              <span className="text-xs">{value}</span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
