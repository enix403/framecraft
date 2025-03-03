import { Link } from "react-router";
import { FastForward as IconFastForward } from "@phosphor-icons/react";

export function HomePage() {
  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <Link to='/login' className='btn btn-secondary btn-lg mb-4 gap-x-4'>
        <span className='font-bold'>Lauch FrameCraft</span>
        <IconFastForward size={28} />
      </Link>
    </div>
  );
}
