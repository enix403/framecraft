import Joi from "joi";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogHeader
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

import {
  CalendarIcon,
  UserIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  CheckIcon
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { apiRoutes } from "@/lib/api-routes";
import { PropsWithChildren, ReactNode, useEffect, useId } from "react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { format } from "date-fns";
import clsx from "clsx";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

// 📌 User Type Definition
interface User {
  id: string;
  email: string;
  role: "user" | "admin";
  fullName: string;
  isActive: boolean;
  isVerified: boolean;
  bio?: string;
  gender?: "male" | "female";
  dateOfBirth?: string | Date;
  phoneCountryCode?: string;
  phoneNumber?: string;
  addressCountry?: string;
  addressCity?: string;
  addressArea?: string;
  addressZip?: string;
}

// 📌 Validation Schema (Joi)
const userSchema = Joi.object({
  fullName: Joi.string().min(3).optional(),
  email: Joi.string().email({ tlds: { allow: false } }),
  role: Joi.string().valid("user", "admin"),
  gender: Joi.string().valid("male", "female").allow(null, ""),
  dateOfBirth: Joi.alternatives().try(Joi.string(), Joi.date()).allow(null, ""),
  phoneCountryCode: Joi.string().allow(null, ""),
  phoneNumber: Joi.string().allow(null, ""),
  addressCountry: Joi.string().allow(null, ""),
  addressCity: Joi.string().allow(null, ""),
  addressArea: Joi.string().allow(null, ""),
  addressZip: Joi.string().allow(null, ""),
  bio: Joi.string().allow(null, ""),
  isActive: Joi.boolean(),
  isVerified: Joi.boolean()
}).unknown(true);

const listQueryKey = ["users", "list"];

function SimpleFormItem({
  label,
  children,
  desc,
  noControl = false,
  className
}: {
  label?: ReactNode;
  desc?: ReactNode;
  noControl?: boolean;
  className?: string;
} & PropsWithChildren) {
  if (!noControl) {
    children = <FormControl>{children}</FormControl>;
  }

  return (
    <FormItem className={className}>
      {label && <FormLabel>{label}</FormLabel>}
      {children}
      {desc && (
        <FormDescription>This is your public display name.</FormDescription>
      )}
      <FormMessage />
    </FormItem>
  );
}

/*

{
  "id": "67e83ce8ac5dbb1149b77b94",
  "email": "user29@gmail.com",
  "role": "user",
  "fullName": "Stanley Daniel",

  "isActive": true,
  "isVerified": true,
}
*/

export function UserEditDialogInner({
  user
}: { user: User } & PropsWithChildren) {
  const onSubmit = (data: Partial<User>) => {
    // updateUserMutation.mutate(data);
    toast("You submitted the values");
    console.log(data);
  };

  const form = useForm<User>({
    resolver: joiResolver(userSchema),
    defaultValues: user,
    mode: "onBlur"
  });

  const { reset } = form;

  // Reset form when user data loads
  useEffect(() => {
    if (user) reset(user);
  }, [user, reset]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='contents'>
        <div className='overflow-y-auto'>
          <div className='space-y-4 p-6'>
            {JSON.stringify(form.formState.errors)}
            <br />
            {/* Name */}
            <FormField
              name='fullName'
              render={({ field }) => (
                <SimpleFormItem label='Username'>
                  <Input placeholder='Enter your name' {...field} />
                </SimpleFormItem>
              )}
            />
            {/* Email */}
            <FormField
              name='email'
              render={({ field }) => (
                <SimpleFormItem label='Email'>
                  <Input placeholder='Enter your email' {...field} />
                </SimpleFormItem>
              )}
            />
            {/* Role */}
            <FormField
              name='role'
              render={({ field }) => (
                <SimpleFormItem label='Role' noControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a role' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='user'>User</SelectItem>
                      <SelectItem value='admin'>Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </SimpleFormItem>
              )}
            />
            {/* Bio */}
            {/* TODO: Character Limit */}
            <FormField
              name='bio'
              render={({ field }) => (
                <SimpleFormItem label='bio'>
                  <Textarea
                    placeholder='Write a few sentences about yourself'
                    {...field}
                  />
                </SimpleFormItem>
              )}
            />
            {/* Gender */}
            <FormField
              name='gender'
              render={({ field }) => (
                <SimpleFormItem label='Gender' noControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a role' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='male'>Male</SelectItem>
                      <SelectItem value='female'>Female</SelectItem>
                    </SelectContent>
                  </Select>
                </SimpleFormItem>
              )}
            />
            {/* Date Of Birth */}
            <FormField
              name='dateOfBirth'
              render={({ field }) => (
                <SimpleFormItem
                  noControl
                  label='Date of birth'
                  desc='Your date of birth is used to calculate your age.'
                >
                  {/* model={true} is important for usage in dialogs */}
                  <Popover modal>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={date =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </SimpleFormItem>
              )}
            />
            {/* Phone */}
            <FormLabel>Phone</FormLabel>
            <div className='mt-1 flex space-x-2'>
              <FormField
                name='phoneCountryCode'
                render={({ field }) => (
                  <SimpleFormItem className='w-20'>
                    <Input {...field} placeholder='+1' />
                  </SimpleFormItem>
                )}
              />
              <FormField
                name='phoneNumber'
                render={({ field }) => (
                  <SimpleFormItem className='flex-1'>
                    <Input {...field} placeholder='+1' />
                  </SimpleFormItem>
                )}
              />
            </div>

            {/* Address */}
            <FormLabel className='font-bold'>Address</FormLabel>
            <div className='mt-2 flex space-x-2'>
              <FormField
                name='addressCountry'
                render={({ field }) => (
                  <SimpleFormItem className='flex-1' label='Country'>
                    <Input {...field} />
                  </SimpleFormItem>
                )}
              />
              <FormField
                name='addressCity'
                render={({ field }) => (
                  <SimpleFormItem className='flex-1' label='City'>
                    <Input {...field} />
                  </SimpleFormItem>
                )}
              />
            </div>
            <div className='mt-1 flex space-x-2'>
              <FormField
                name='addressArea'
                render={({ field }) => (
                  <SimpleFormItem className='flex-1' label='Area'>
                    <Input {...field} />
                  </SimpleFormItem>
                )}
              />
              <FormField
                name='addressZip'
                render={({ field }) => (
                  <SimpleFormItem className='w-40' label='Zip'>
                    <Input {...field} />
                  </SimpleFormItem>
                )}
              />
            </div>
            {/* Is Active */}
            <FormField
              name='isActive'
              render={({ field }) => (
                <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3'>
                  <div className='space-y-0.5'>
                    <FormLabel>Active</FormLabel>
                    <FormDescription>
                      Activate or deactivate this user.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/*  */}
          </div>
        </div>
        <DialogFooter className='border-t px-6 py-4'>
          <DialogClose asChild>
            <Button type='button' variant='outline'>
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type='submit'>Save changes</Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </Form>
  );
}

export function UserEditModal({
  userId,
  children
}: { userId: string } & PropsWithChildren) {
  // Fetch user data
  const { data: user, isError } = useQuery<User>({
    queryKey: ["user", userId],
    queryFn: () => apiRoutes.getUser(userId),
    enabled: !!userId
  });

  // return <>{user && !isError && <UserEditDialogInner user={user} />}</>;

  return (
    <Dialog open={true}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-2xl [&>button:last-child]:top-3.5'>
        <DialogHeader className='contents space-y-0 text-left'>
          <DialogTitle className='border-b px-6 py-4 text-base'>
            Edit profile
          </DialogTitle>
        </DialogHeader>
        {/* @ts-ignore */}
        {user && !isError && <UserEditDialogInner user={user} />}
      </DialogContent>
    </Dialog>
  );
}

/*
const queryClient = useQueryClient();
// Optimistic UI Mutation
const updateUserMutation = useMutation({
  mutationFn: (updatedFields: Partial<User>) =>
    apiRoutes.updateUser(updatedFields, userId),
  onMutate: async (updatedFields: Partial<User>) => {
    await queryClient.cancelQueries({ queryKey: listQueryKey });
    const previousUsers = queryClient.getQueryData<User[]>(listQueryKey);

    queryClient.setQueryData(
      listQueryKey,
      (oldUsers?: User[]) =>
        oldUsers?.map(u =>
          u.id === userId ? { ...u, ...updatedFields } : u
        ) ?? []
    );

    return { previousUsers };
  },
  onError: (_err, _updatedFields, context) => {
    if (context?.previousUsers) {
      queryClient.setQueryData(listQueryKey, context.previousUsers);
    }
  },
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: listQueryKey });
    queryClient.invalidateQueries({ queryKey: ["user", userId] });
  }
});

*/
