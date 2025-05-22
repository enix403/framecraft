import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export const Navbar: React.FC = () => {
  return (
    <header className='fixed top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md'>
      <div className='flex h-16 items-center justify-between px-5 md:px-8 xl:px-18'>
        {/* <div className='flex items-center gap-2'>
          <div className='relative flex h-8 w-8 items-center justify-center rounded-md bg-framecraft-blue font-bold text-primary-foreground'>
            FC
            <div className='absolute -right-1 -bottom-1 h-3 w-3 animate-pulse rounded-full bg-framecraft-blue-light'></div>
          </div>
          <span className='text-xl font-bold'>FrameCraft</span>
        </div> */}

        <Link to="/">
          <h1 className='font-graph-editor text-2xl bg-amber-900 px-2 py-1 rounded-xs text-white tracking-tighter'>
            <span className='font-bold text-(color:--color-primary)'>
              frame
            </span>
            <span className=''>craft</span>
          </h1>
        </Link>

        <nav className='hidden items-center gap-6 md:flex'>
          <a
            href='#features'
            className='text-sm font-medium transition-colors hover:text-primary'
          >
            Features
          </a>
          <a
            href='#workflow'
            className='text-sm font-medium transition-colors hover:text-primary'
          >
            How It Works
          </a>
          <a
            href='#examples'
            className='text-sm font-medium transition-colors hover:text-primary'
          >
            Examples
          </a>
          <a
            href='#export'
            className='text-sm font-medium transition-colors hover:text-primary'
          >
            Export
          </a>
        </nav>

        <div className='flex items-center gap-4'>
          <Button asChild variant='ghost' size='sm'>
            <Link to='/auth/login'>Sign In</Link>
          </Button>
          <Button asChild size='sm'>
            <Link to='/app'>Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};
