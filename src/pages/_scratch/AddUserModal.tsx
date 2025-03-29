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
  CalendarIcon,
  UserIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  CheckIcon
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { apiRoutes } from "@/lib/api-routes";
import { PropsWithChildren, useEffect, useId } from "react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
// import { DatePicker } from "@/components/ui/date-picker";

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

// export function UserEditDialog({
export function UserEditDialogInner({
  user
}: { user: User } & PropsWithChildren) {
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

  const { reset, control } = form;

  // Reset form when user data loads
  useEffect(() => {
    if (user) reset(user);
    // if (user) console.log(user);
  }, [user, reset]);

  /* TODO: loading */
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='contents'>
        <div className='overflow-y-auto'>
          <div className='space-y-4 p-6'>
            {JSON.stringify(form.formState.errors)}
            {/* Name */}
            <FormField
              control={control}
              name='fullName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter your name' {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Email */}
            <FormField
              control={control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter your email' {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Role */}
            <FormField
              control={form.control}
              name='role'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
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
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Gender */}
            <FormField
              control={form.control}
              name='gender'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex space-x-2'>
              <Input
                {...form.register("phoneCountryCode")}
                placeholder='+1'
                className='w-1/4'
              />
              <Input {...form.register("phoneNumber")} className='w-3/4' />
            </div>
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

export function UserEditDialog({
  userId,
  children
}: { userId } & PropsWithChildren) {
  // Fetch user data
  const { data: user, isError } = useQuery<User>({
    queryKey: ["user", userId],
    queryFn: () => apiRoutes.getUser(userId),
    enabled: !!userId
  });

  /* TODO: loading */
  return (
    <Dialog open={true}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-2xl [&>button:last-child]:top-3.5'>
        <DialogHeader className='contents space-y-0 text-left'>
          <DialogTitle className='border-b px-6 py-4 text-base'>
            Edit profile
          </DialogTitle>
        </DialogHeader>
        {user && !isError && <UserEditDialogInner user={user} />}
      </DialogContent>
    </Dialog>
  );
}
