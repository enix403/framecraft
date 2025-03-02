import { ReactNode } from "react";

export function Stat({ label, value }: { label: ReactNode; value: ReactNode }) {
  return (
    <div className='flex items-center justify-center gap-x-4 mb-1'>
      <p className='flex-1 text-right text-sm text-muted-foreground'>{label}:</p>
      <p className='flex-1 text-accent-foreground'>{value}</p>
    </div>
  );
}