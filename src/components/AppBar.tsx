import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import clsx from "clsx";

import { SignOut as IconSignOut } from "@phosphor-icons/react";
import { Link } from "react-router";

function UserDropdown() {
  return (
    <Menu>
      <MenuButton>
        <div className='avatar avatar-ring-secondary'>
          <img src='https://i.pravatar.cc/150?img=57' alt='avatar' />
        </div>
      </MenuButton>
      <MenuItems
        transition
        anchor='bottom end'
        className={clsx(
          "w-52 origin-top-right",
          "p-1",
          "[--anchor-gap:var(--spacing-1)]",
          "transition duration-100 ease-out data-[closed]:scale-95 data-[closed]:opacity-0",
          "bg-[#272424] text-sm/6",
          "rounded-xl border-2 border-[#4f4f4f] focus:outline-none"
        )}
      >
        <MenuItem>
          <Link
            to='/generate'
            className={clsx(
              "flex w-full rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
            )}
          >
            Start Generation
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            to='/my-designs'
            className={clsx(
              "flex w-full rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
            )}
          >
            My Plans
          </Link>
        </MenuItem>
        <div className='my-1 h-px bg-[#4f4f4f]/40' />
        <MenuItem>
          <Link
            to='/login'
            className={clsx(
              "flex items-center w-full justify-between gap-2 rounded-lg py-1.5 px-3 text-[#FE6369] data-[focus]:bg-[#FE6369]/10"
            )}
          >
            Logout
            <IconSignOut size={18} />
          </Link>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}

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
        <UserDropdown />
      </div>
    </nav>
  );
}
