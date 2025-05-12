import { AvatarDropdown } from "./AvatarDropdown";
import { ArrowRight, Bell, MessageSquareMore, Search } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router";
import { useAuthState } from "@/stores/auth-store";
import clsx from "clsx";
import { Button } from "../ui/button";

export function AppTopNav() {
  const { token } = useAuthState();
  const isLoggedIn = Boolean(token);
  return (
    <nav className='flex shrink-0 items-center bg-[#1D212C] px-4 py-2.5 text-white'>
      <Link to={isLoggedIn ? "/app" : "/"}>
        <h1 className='font-graph-editor text-xl tracking-tighter'>
          <span className='font-extrabold text-[#FFF331]'>frame</span>
          <span className=''>craft</span>
        </h1>
      </Link>

      {isLoggedIn ? (
        <div className='ml-auto flex items-center'>
          <AvatarDropdown />
        </div>
      ) : (
        <div className='ml-auto flex items-center gap-x-2'>
          <Button
            asChild
            size='sm'
            className='tracking-wide'
            icon={ArrowRight}
            iconPlacement='right'
          >
            <Link to='/auth/login'>Get Started</Link>
          </Button>
        </div>
      )}
    </nav>
  );
}

{
  /* <button className='rounded-md bg-[#333847] p-2.5 tc hover:bg-[#272c3b]'>
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
</button> */
}
