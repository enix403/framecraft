import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useClearAuthState } from "@/stores/auth-store";

import {
  LayoutDashboard,
  LogOutIcon,
  MoonIcon,
  PinIcon,
  SunIcon,
  UserPenIcon,
  UserRound
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import { Spinner } from "../ui/spinner";
import { useThemeToggle } from "../ui/theme-toggle-button";

function UserInfo() {
  const { user, isError } = useCurrentUser();

  if (user && !isError) {
    return (
      <>
        <img
          src='/profile_img_01.png'
          alt='Avatar'
          width={32}
          height={32}
          className='aspect-square shrink-0 rounded-full'
        />
        <div className='flex min-w-0 flex-col'>
          <span className='truncate text-sm font-medium text-foreground'>
            {user.fullName}
          </span>
          <span className='truncate text-xs font-normal text-muted-foreground'>
            {user.email}
          </span>
        </div>
      </>
    );
  }

  return (
    <div className='flex flex-1 justify-center'>
      <Spinner />
    </div>
  );
}

export function AvatarDropdown() {
  const toggleTheme = useThemeToggle({});

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className='relative cursor-pointer'>
          <Avatar className='size-10 border-2 border-(color:--color-primary)'>
            <AvatarImage src='/profile_img_01.png' alt='Kelly King' />
            <AvatarFallback className='text-black'>U</AvatarFallback>
          </Avatar>
          {/* <span className='absolute -end-0.5 -bottom-0.5 size-3 rounded-full border-2 border-background bg-emerald-500'>
            <span className='sr-only'>Online</span>
          </span> */}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='max-w-64'>
        <DropdownMenuLabel className='flex items-start gap-3'>
          <UserInfo />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to='/app'>
              <LayoutDashboard size={16} />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <UserRound size={16} />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={e => {
              e.preventDefault();
              toggleTheme();
            }}
          >
            <SunIcon className='size-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
            <MoonIcon className='absolute size-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
            <span>Toggle Theme</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild variant='destructive'>
          <Link to='/auth/logout'>
            <LogOutIcon size={16} className='opacity-60' aria-hidden='true' />
            <span>Logout</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
