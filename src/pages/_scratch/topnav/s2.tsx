import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TopNav } from "./TopNav";

function Sidebar() {
  return (
    <div className="bg-[#F3F6F9] border-r w-sm">

    </div>
  );
}

export function Scratch() {
  return (
    <div className='flex h-full max-h-full w-full max-w-full flex-col'>
      <TopNav />
      <div className='flex-1-fix flex'>
        <Sidebar />
        <Content />
      </div>
    </div>
  );
}

function Content() {
  return null;
}