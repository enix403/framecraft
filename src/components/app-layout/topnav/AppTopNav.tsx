import { AvatarDropdown } from "./AvatarDropdown";
import {
  Bell,
  MessageSquareMore,
  Search
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function AppTopNav() {
  return (
    <nav className='flex items-center bg-[#1D212C] px-4 py-2.5 shrink-0 text-white'>
      <h1 className='font-graph-editor text-xl tracking-tighter'>
        <span className='font-extrabold text-[#FFF331]'>frame</span>
        <span className=''>craft</span>
      </h1>

      <div className='ml-auto flex items-center'>
        <button className='rounded-md bg-[#333847] p-2.5 tc hover:bg-[#272c3b]'>
          <Search className='size-5' strokeWidth={2} />
        </button>
        <Separator
          orientation='vertical'
          className='mx-2.5 !h-6 bg-[#414654]'
        />
        <button className='mr-1.5 rounded-md bg-[#333847] p-2.5 tc hover:bg-[#272c3b]'>
          <MessageSquareMore className='size-5' strokeWidth={2} />
        </button>
        <button className='mr-3.5 rounded-md bg-[#333847] p-2.5 tc hover:bg-[#272c3b]'>
          <Bell className='size-5' strokeWidth={2} />
        </button>

        <AvatarDropdown />
      </div>
    </nav>
  );
}
