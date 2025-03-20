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
import { useClearAuthState } from "@/stores/auth-store";

import { LogOutIcon, PinIcon, UserPenIcon } from "lucide-react";
import { Link, useNavigate } from "react-router";

export function AvatarDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className='relative cursor-pointer'>
          <Avatar className='size-10 border-2 border-[#FFF331]'>
            <AvatarImage
              // src='https://originui.com/avatar-80-03.jpg'
              src='/profile_img_01.png'
              alt='Kelly King'
            />
            <AvatarFallback className='text-black'>U</AvatarFallback>
          </Avatar>
          <span className='absolute -end-0.5 -bottom-0.5 size-3 rounded-full border-2 border-background bg-emerald-500'>
            <span className='sr-only'>Online</span>
          </span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='max-w-64'>
        <DropdownMenuLabel className='flex items-start gap-3'>
          <img
            src='/profile_img_01.png'
            alt='Avatar'
            width={32}
            height={32}
            className='aspect-square shrink-0 rounded-full'
          />
          <div className='flex min-w-0 flex-col'>
            <span className='truncate text-sm font-medium text-foreground'>
              Keith Kennedy
            </span>
            <span className='truncate text-xs font-normal text-muted-foreground'>
              k.kennedy@originui.com
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <PinIcon size={16} className='opacity-60' aria-hidden='true' />
            <span>Option 1</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <UserPenIcon size={16} className='opacity-60' aria-hidden='true' />
            <span>Option 2</span>
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
