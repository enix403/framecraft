import { Ex1_BasicTable } from "./ex/Ex1_BasicTable";
import { Ex2_TableWithImages } from "./ex/Ex2_TableWithImages";
import { Ex3_DenseTable } from "./ex/Ex3_DenseTable";
import { Ex4_StickyHeader } from "./ex/Ex4_StickyHeader";
import { Ex5_BasicDataTable } from "./ex/Ex5_BasicDataTable";
import { Ex6_Filters } from "./ex/Ex6_Filters";
import { Ex7_CollapsibleRows } from "./ex/Ex7_CollapsibleRows";
import { Ex8_Pagination } from "./ex/Ex8_Pagination";
import { Ex9_Complex } from "./ex/Ex9_Complex";
import { SomeUseTable } from "./SomeUseTable";

export function Scratch() {
  return (
    <div className='max-h-full w-full max-w-full space-y-7 overflow-y-auto p-8'>
      <SomeUseTable />
      <hr />
      <Ex9_Complex />
      {/* <Ex1_BasicTable /> */}
      {/* <Ex2_TableWithImages /> */}
      {/* <Ex3_DenseTable /> */}
      {/* <Ex4_StickyHeader /> */}
      {/* <Ex5_BasicDataTable /> */}
      {/* <Ex6_Filters /> */}
      {/* <Ex7_CollapsibleRows /> */}
      {/* <Ex8_Pagination /> */}
      {/* <UserTable /> */}
    </div>
  );
}
