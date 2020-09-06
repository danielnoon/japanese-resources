import { useState } from "react";

export const useTsvFormatter = (
  initialState: string
): [string, any, React.Dispatch<React.SetStateAction<string>>] => {
  const [value, setValue] = useState<string>(initialState);

  const lines = value.trim().split("\n");
  if (lines.length < 2) return [value, [], setValue];

  const headerLine = lines.shift().trim().split("\t");

  const data = lines.map(line => {
    const d = {} as any;
    const elements = line.split("\t");
    headerLine.forEach((key, i) => {
      d[key] = elements[i].trim();
    });
    return d;
  });

  return [value, data, setValue];
};
