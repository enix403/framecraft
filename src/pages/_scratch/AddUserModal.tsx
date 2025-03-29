"use client";

import { PropsWithChildren, useId, useState } from "react";
import { CheckIcon, ImagePlusIcon, PlusIcon, XIcon } from "lucide-react";

import { useCharacterLimit } from "@/hooks/use-character-limit";
import { useImageUpload } from "@/hooks/use-image-upload";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function AddUserModal({ children }: PropsWithChildren) {
  const id = useId();

  const maxLength = 180;
  const {
    value,
    characterCount,
    handleChange,
    maxLength: limit
  } = useCharacterLimit({
    maxLength,
    initialValue:
      "Hey, I am Margaret, a web developer who loves turning ideas into amazing websites!"
  });

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5'>
        <DialogHeader className='contents space-y-0 text-left'>
          <DialogTitle className='border-b px-6 py-4 text-base'>
            Edit profile
          </DialogTitle>
        </DialogHeader>
        <div className='overflow-y-auto'>
          {/* <ProfileBg defaultImage='/profile-bg.jpg' />
          <Avatar defaultImage='/avatar-72-01.jpg' /> */}
          <form className='space-y-4 p-6'>
            <div className='flex flex-col gap-4 sm:flex-row'>
              <div className='flex-1 space-y-2'>
                <Label htmlFor={`${id}-first-name`}>First name</Label>
                <Input
                  id={`${id}-first-name`}
                  placeholder='Matt'
                  defaultValue='Margaret'
                  type='text'
                  required
                />
              </div>
              <div className='flex-1 space-y-2'>
                <Label htmlFor={`${id}-last-name`}>Last name</Label>
                <Input
                  id={`${id}-last-name`}
                  placeholder='Welsh'
                  defaultValue='Villard'
                  type='text'
                  required
                />
              </div>
            </div>
            <div className='*:not-first:mt-2'>
              <Label htmlFor={`${id}-username`}>Username</Label>
              <div className='relative'>
                <Input
                  id={`${id}-username`}
                  className='peer pe-9'
                  placeholder='Username'
                  defaultValue='margaret-villard-69'
                  type='text'
                  required
                />
                <div className='pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50'>
                  <CheckIcon
                    size={16}
                    className='text-emerald-500'
                    aria-hidden='true'
                  />
                </div>
              </div>
            </div>
            <div className='*:not-first:mt-2'>
              <Label htmlFor={`${id}-website`}>Website</Label>
              <div className='flex rounded-md shadow-xs'>
                <span className='-z-10 inline-flex items-center rounded-s-md border border-input bg-background px-3 text-sm text-muted-foreground'>
                  https://
                </span>
                <Input
                  id={`${id}-website`}
                  className='-ms-px rounded-s-none shadow-none'
                  placeholder='yourwebsite.com'
                  defaultValue='www.margaret.com'
                  type='text'
                />
              </div>
            </div>
            <div className='*:not-first:mt-2'>
              <Label htmlFor={`${id}-bio`}>Biography</Label>
              <Textarea
                id={`${id}-bio`}
                placeholder='Write a few sentences about yourself'
                defaultValue={value}
                maxLength={maxLength}
                onChange={handleChange}
                aria-describedby={`${id}-description`}
              />
              <p
                id={`${id}-description`}
                className='mt-2 text-right text-xs text-muted-foreground'
                role='status'
                aria-live='polite'
              >
                <span className='tabular-nums'>{limit - characterCount}</span>{" "}
                characters left
              </p>
            </div>
          </form>
        </div>
        <DialogFooter className='border-t px-6 py-4'>
          <DialogClose asChild>
            <Button type='button' variant='outline'>
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type='button'>Save changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
