export function AppBar() {
  return (
    <nav className='border-0 border-b-2 border-border'>
      <div className='flex flex-wrap items-center justify-between p-4'>
        <a href='#' className='flex items-center space-x-3 rtl:space-x-reverse'>
          {/* <img
            src="https://FrameCraft.com/docs/images/logo.svg"
            class="h-8"
            alt="FrameCraft Logo"
          /> */}
          <span className='self-center text-2xl font-semibold whitespace-nowrap'>
            FrameCraft
          </span>
        </a>
        <div className='avatar avatar-ring-secondary'>
          <img src='https://i.pravatar.cc/150?img=57' alt='avatar' />
        </div>
      </div>
    </nav>
  );
}
