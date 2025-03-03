import { Link } from "react-router";
import {
  Smiley as IconSmiley,
  ArrowLeft as IconArrowLeft
} from "@phosphor-icons/react";

export function NotFound() {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='space-y-8 text-center'>
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
        <div className='mb-8 text-2xl font-semibold md:text-3xl'>
          <IconSmiley
            weight='duotone'
            className='mr-2 inline-block h-8 w-8 align-middle text-yellow-500'
          />
          <span className='align-middle'>Oops! Page not found</span>
        </div>
        <p className='mx-auto max-w-lg text-lg font-medium text-gray-400 md:text-xl'>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to='/' className='btn btn-secondary'>
          <IconArrowLeft weight='bold' className='mr-2 h-5 w-5' />
          Go back home
        </Link>
      </div>
    </div>
  );
}
