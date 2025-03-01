import { Link } from "react-router";
import { FastForward as IconFastForward } from "@phosphor-icons/react";

export function HomePage() {
  return (
    <div className='flex w-screen h-screen items-center justify-center'>
      <Link to='/login' className='btn btn-secondary btn-lg gap-x-4 mb-4'>
        <span className='font-bold'>Lauch FrameCraft</span>
        <IconFastForward size={28} />
      </Link>
    </div>
  );
}
