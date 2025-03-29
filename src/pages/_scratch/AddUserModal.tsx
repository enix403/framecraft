import Joi from "joi";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle
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
  MapPinIcon
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { apiRoutes } from "@/lib/api-routes";
import { PropsWithChildren, useEffect } from "react";
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
  fullName: Joi.string().min(3).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  role: Joi.string().valid("user", "admin").required(),
  gender: Joi.string().valid("male", "female").allow(null, ""),
  dateOfBirth: Joi.alternatives().try(Joi.string(), Joi.date()).allow(null, ""),
  phoneCountryCode: Joi.string().allow(null, ""),
  phoneNumber: Joi.string().allow(null, ""),
  addressCountry: Joi.string().allow(null, ""),
  addressCity: Joi.string().allow(null, ""),
  addressArea: Joi.string().allow(null, ""),
  addressZip: Joi.string().allow(null, ""),
  bio: Joi.string().allow(null, ""),
  isActive: Joi.boolean().required(),
  isVerified: Joi.boolean().required()
});

const listQueryKey = ["users", "list"];

// export const UserEditDialog({
//   userId: string;
//   renderEditTrigger: (id: string) => JSX.Element;
// }> = ({ userId, renderEditTrigger }) => {

export function UserEditDialog({
  userId,
  children
}: { userId } & PropsWithChildren) {
  const queryClient = useQueryClient();

  // Fetch user data
  const { data: user, isLoading } = useQuery<User>({
    queryKey: ["user", userId],
    queryFn: () => apiRoutes.getUser(userId),
    enabled: !!userId,
  });

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

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm<User>({
    resolver: joiResolver(userSchema),
    defaultValues: user,
    mode: "onBlur"
  });

  // Reset form when user data loads
  useEffect(() => {
    if (user) reset(user);
    if (user) console.log(user);

  }, [user, reset]);

  const onSubmit = (data: Partial<User>) => {
    updateUserMutation.mutate(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogTitle>Edit User</DialogTitle>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            {/* Full Name */}
            <div>
              <label>Full Name</label>
              <Input {...register("fullName")} icon={<UserIcon />} />
              {errors.fullName && (
                <p className='text-red-500'>{errors.fullName.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label>Email</label>
              <Input {...register("email")} icon={<MailIcon />} />
              {errors.email && (
                <p className='text-red-500'>{errors.email.message}</p>
              )}
            </div>

            {/* Role */}
            <div>
              <Label>Role</Label>
              <Select {...register("role")}>
                <SelectTrigger>
                  <SelectValue placeholder='Role' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='user'>User</SelectItem>
                  <SelectItem value='admin'>Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Gender */}
            <div>
              <Label>Gender</Label>
              <Select {...register("gender")}>
                <SelectTrigger>
                  <SelectValue placeholder='Gender' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='male'>Male</SelectItem>
                  <SelectItem value='female'>Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date of Birth */}
            {/*  <div>
              <label>Date of Birth</label>
              <DatePicker
                selected={
                  watch("dateOfBirth")
                    ? new Date(watch("dateOfBirth") as string)
                    : undefined
                }
                onChange={date => setValue("dateOfBirth", date?.toISOString())}
                icon={<CalendarIcon />}
              />
            </div> */}

            {/* Phone */}
            <div className='flex space-x-2'>
              <Input
                {...register("phoneCountryCode")}
                placeholder='+1'
                className='w-1/4'
              />
              <Input
                {...register("phoneNumber")}
                icon={<PhoneIcon />}
                className='w-3/4'
              />
            </div>

            {/* Address */}
            <div>
              <label>Address</label>
              <Input
                {...register("addressCountry")}
                placeholder='Country'
                icon={<MapPinIcon />}
              />
              <Input {...register("addressCity")} placeholder='City' />
              <Input {...register("addressArea")} placeholder='Street/Area' />
              <Input {...register("addressZip")} placeholder='Zip Code' />
            </div>

            {/* Bio */}
            <div>
              <label>Bio</label>
              <textarea
                {...register("bio")}
                className='h-24 w-full rounded-md border p-2'
              />
            </div>

            {/* Status Toggles */}
            <div className='flex justify-between'>
              <label>Active</label>
              <Switch {...register("isActive")} />
            </div>
            <div className='flex justify-between'>
              <label>Verified</label>
              <Switch {...register("isVerified")} />
            </div>

            {/* Submit Button */}
            <Button type='submit' disabled={updateUserMutation.isPending}>
              {updateUserMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
