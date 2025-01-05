import clsx from "clsx";
import { useState } from "react";

export function OptionsBar({
  options,
  defaultSelected = null
}: {
  options: string[];
  defaultSelected?: string | null;
}) {
  const [selectedOption, setSelectedOption] = useState<string | null>(
    defaultSelected
  );

  return (
    <>
      {options.map(opt => (
        <button
          key={opt}
          className={clsx(
            "btn flex-1",
            selectedOption === opt ? "btn-secondary" : "btn-solid-secondary"
          )}
          onClick={() => setSelectedOption(opt)}
        >
          {opt}
        </button>
      ))}
    </>
  );
}
