import clsx from "clsx";
import { Package } from "lucide-react";
import { ComponentProps } from "react";

export function NodeSlab({
  title,
  subtitle,
  className,
  ...divProps
}: {
  title: string;
  subtitle?: string;
} & ComponentProps<"div">) {
  return (
    <div
      {...divProps}
      className={clsx(
        "flex flex-row items-center gap-x-2.5 rounded-[8px] border bg-white p-2.5 pr-6",
        "transition-colors",
        className
      )}
    >
      <div className='rounded-[6px] bg-[#04ACB0] p-1.5 text-white'>
        <Package size={26} />
      </div>

      <div className='flex-1-fit space-y-1.5 font-graph-editor'>
        <p className='text-sm leading-[1] font-semibold text-[color:#1B1B2E]'>
          {title}
        </p>
        {subtitle && (
          <p className='text-[size:0.7rem] leading-[1] font-medium text-[color:#7C7D87]'>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
