import { Link } from "react-router";
import {
  Smiley as IconSmiley,
  ArrowLeft as IconArrowLeft
} from "@phosphor-icons/react";

export function NotFound() {
  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='text-center space-y-8'>
        <h1 className='text-9xl font-extrabold tracking-widest text-white'>
          <span className='sr-only'>Error</span>
          <span className='inline-block animate-pulse'>4</span>
          <span
            className='inline-block animate-bounce'
            style={{ animationDelay: "0.1s" }}
          >
            0
          </span>
          <span
            className='inline-block animate-pulse'
            style={{ animationDelay: "0.2s" }}
          >
            4
          </span>
        </h1>
        <div className='text-2xl font-semibold md:text-3xl mb-8'>
          <IconSmiley
            weight='duotone'
            className='inline-block w-8 h-8 mr-2 align-middle text-yellow-500'
          />
          <span className='align-middle'>Oops! Page not found</span>
        </div>
        <p className='text-gray-400 font-medium text-lg md:text-xl max-w-lg mx-auto'>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to='/' className='btn btn-secondary'>
          <IconArrowLeft weight='bold' className='w-5 h-5 mr-2' />
          Go back home
        </Link>
      </div>
    </div>
  );
}
