import React from "react";
import { Button } from "@/components/ui/button";

export const Navbar: React.FC = () => {
  return (
    <header className='fixed top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md'>
      <div className='flex h-16 items-center justify-between px-5 md:px-8 xl:px-18'>
        <div className='flex items-center gap-2'>
          <div className='relative flex h-8 w-8 items-center justify-center rounded-md bg-framecraft-blue font-bold text-primary-foreground'>
            FC
            <div className='absolute -right-1 -bottom-1 h-3 w-3 animate-pulse rounded-full bg-framecraft-blue-light'></div>
          </div>
          <span className='text-xl font-bold'>FrameCraft</span>
        </div>

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
          <Button variant='ghost' size='sm'>
            Sign In
          </Button>
          <Button size='sm'>Get Started</Button>
        </div>
      </div>
    </header>
  );
};
