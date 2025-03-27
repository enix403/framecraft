import { Ex1_BasicTable } from "./Ex1_BasicTable";
import { Ex2_TableWithImages } from "./Ex2_TableWithImages";
import { Ex3_DenseTable } from "./Ex3_DenseTable";
import { Ex4_StickyHeader } from "./Ex4_StickyHeader";
import { Ex5_BasicDataTable } from "./Ex5_BasicDataTable";

export function Scratch() {
  return (
    <div className='p-8 space-y-7 max-h-full overflow-auto'>
      <Ex1_BasicTable />
      <Ex2_TableWithImages />
      <Ex3_DenseTable />
      <Ex4_StickyHeader />
      <Ex5_BasicDataTable />
    </div>
  );
}
