import { Link } from "react-router";

export function HomePage() {
  return (
    <div className='flex w-screen h-screen items-center justify-center'>
      <Link to='/login' className='btn btn-secondary btn-lg gap-x-4 mb-4'>
        <span className='font-bold'>Lauch FrameCraft</span>
        {/* <IconPlayerTrackNextFilled size={28} /> */}
      </Link>
    </div>
  );
}
