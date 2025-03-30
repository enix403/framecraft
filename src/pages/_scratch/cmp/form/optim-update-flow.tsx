import { useQueryClient, QueryKey, QueryClient } from "@tanstack/react-query";

export interface OptimisticUpdateFlowContext<T> {
  previousList: T[] | undefined;
  previousItem: T | undefined;
}

export interface OptimisticUpdateFlowOptions<T, U extends Partial<T>> {
  queryClient: QueryClient;

  itemId: string;
  itemKey: QueryKey;
  listKey: QueryKey;
  onMutate?: (updatedFields: U) => void;
  onError?: (
    err: unknown,
    updatedFields: U,
    context: OptimisticUpdateFlowContext<T> | undefined
  ) => void;
  onSettled?: () => void;
}

/**
 * Returns an object containing `onMutate`, `onError`, and `onSettled` handlers
 * to be spread into a useMutation configuration for performing optimistic updates.
 *
 * @example
 * const updateUserMutation = useMutation({
 *   mutationFn: (updatedFields: Partial<User>) =>
 *     apiRoutes.updateUser(updatedFields, user.id),
 *   ...optimisticUpdateFlow<User, Partial<User>>({
 *     itemId: user.id,
 *     itemKey: userQueryKey(user.id),
 *     listKey: listQueryKey,
 *     onError: (err, updatedFields, context) => {
 *       toast.error("Failed to update user");
 *     },
 *     onSettled: () => {
 *       toast.success("User updated successfully");
 *     },
 *   }),
 * });
 */
export function optimisticUpdateFlow<T, U extends Partial<T> = Partial<T>>(
  options: OptimisticUpdateFlowOptions<T, U>
) {
  const {
    queryClient,
    itemId,
    itemKey,
    listKey,
    onMutate: externalOnMutate,
    onError: externalOnError,
    onSettled: externalOnSettled
  } = options;

  return {
    onMutate: async (
      updatedFields: U
    ): Promise<OptimisticUpdateFlowContext<T>> => {
      // Cancel any outgoing refetches for both queries
      await Promise.all([
        queryClient.cancelQueries({ queryKey: listKey }),
        queryClient.cancelQueries({ queryKey: itemKey })
      ]);

      // Snapshot previous state
      const previousList = queryClient.getQueryData<T[]>(listKey);
      const previousItem = queryClient.getQueryData<T>(itemKey);

      // Optimistically update the list
      queryClient.setQueryData<T[]>(
        listKey,
        oldList =>
          oldList?.map(item =>
            /* @ts-ignore */
            item.id === itemId ? { ...item, ...updatedFields } : item
          ) ?? []
      );

      // Optimistically update the individual item
      queryClient.setQueryData<T>(itemKey, oldItem =>
        oldItem ? { ...oldItem, ...updatedFields } : oldItem
      );

      // Optional external onMutate callback
      if (externalOnMutate) {
        externalOnMutate(updatedFields);
      }

      return { previousList, previousItem };
    },

    onError: (
      err: unknown,
      updatedFields: U,
      context: OptimisticUpdateFlowContext<T> | undefined
    ) => {
      if (context?.previousList !== undefined) {
        queryClient.setQueryData<T[]>(listKey, context.previousList);
      }
      if (context?.previousItem !== undefined) {
        queryClient.setQueryData<T>(itemKey, context.previousItem);
      }
      if (externalOnError) {
        externalOnError(err, updatedFields, context);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: listKey });
      queryClient.invalidateQueries({ queryKey: itemKey });
      if (externalOnSettled) {
        externalOnSettled();
      }
    }
  };
}

// import { QueryClient } from "@tanstack/react-query";

// declare function get<T>(): { val: T };

// export function optimisticUpdateFlow<
//   TData = unknown,
//   TError = any,
//   TVariables = void,
//   TContext = unknown
// >({
//   queryClient,
//   itemId,
//   itemKey,
//   listKey,
//   onMutate,
//   onError,
//   onSettled
// }: {
//   queryClient: QueryClient;
//   itemId: any;
//   itemKey: any[];
//   listKey: any[];
//   onMutate?: (
//     variables: TVariables
//   ) => Promise<TContext | undefined> | TContext | undefined;

//   onError?: (
//     error: TError,
//     variables: TVariables,
//     context: TContext | undefined
//   ) => Promise<unknown> | unknown;

//   onSettled?: () => {};
// }) {
//   return {
//     onMutate: async (updatedFields: TVariables) => {
//       await Promise.all([
//         queryClient.cancelQueries({ queryKey: listKey }),
//         queryClient.cancelQueries({ queryKey: itemKey })
//       ]);

//       const previousList = queryClient.getQueryData<TData[]>(listKey);
//       const previousItem = queryClient.getQueryData<TData>(itemKey);

//       // Optimistically update the list data
//       queryClient.setQueryData(
//         listKey,
//         (oldList?: TData[]) =>
//           oldList?.map(x =>
//             // @ts-ignore
//             x.id === itemId ? { ...x, ...updatedFields } : x
//           ) ?? []
//       );

//       // Optimistically update the individual item query
//       queryClient.setQueryData(itemKey, (oldItem?: TData) =>
//         oldItem ? { ...oldItem, ...updatedFields } : oldItem
//       );

//       await onMutate?.(updatedFields);

//       return { previousList, previousItem } as
//         | Promise<TContext | undefined>
//         | TContext
//         | undefined;
//     },
//     onError: (
//       err: TError,
//       updatedFields: TVariables,
//       context: TContext | undefined
//     ) => {
//       if (context?.previousList) {
//         queryClient.setQueryData(listKey, context.previousList);
//       }
//       if (context?.previousItem) {
//         queryClient.setQueryData(itemKey, context.previousItem);
//       }
//       onError?.(err, updatedFields, context);
//     },
//     onSettled: () => {
//       queryClient.invalidateQueries({ queryKey: listKey });
//       queryClient.invalidateQueries({ queryKey: itemKey });
//       onSettled?.();
//     }
//   };
// }

// const updateUserMutation = useMutation({
//   mutationFn: (updatedFields: Partial<T>) =>
//     apiRoutes.updateUser(updatedFields, itemId),

//   ...optimisticUpdateFlow({
//     itemId: user.id,
//     itemKey: userQueryKey(user.id),
//     listKey: listQueryKey,
//     onMutate: (updatedFields) => {},
//     onError: (err, updatedFields, context) => {
//       toast.error("Failed to update user");
//     },
//     onSettled: () => {
//       toast.success("User updated successfully");
//     },
//   }),
// });
