import { QueryClient } from "@tanstack/react-query";

declare function get<T>(): { val: T };

export function optimisticUpdateFlow<T>({
  queryClient,
  itemId,
  itemKey,
  listKey,
  onMutate,
  onError,
  onSettled
}: {
  queryClient: QueryClient;
  itemId: any;
  itemKey: any[];
  listKey: any[];
  onMutate?: () => {};
  onError?: () => {};
  onSettled?: () => {};
}) {
  return {
    onMutate: async (updatedFields: Partial<T>) => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: listKey }),
        queryClient.cancelQueries({ queryKey: itemKey })
      ]);

      const previousList = queryClient.getQueryData<T[]>(listKey);
      const previousItem = queryClient.getQueryData<T>(itemKey);

      // Optimistically update the list data
      queryClient.setQueryData(
        listKey,
        (oldList?: T[]) =>
          oldList?.map(x =>
            // @ts-ignore
            x.id === itemId ? { ...x, ...updatedFields } : x
          ) ?? []
      );

      // Optimistically update the individual item query
      queryClient.setQueryData(itemKey, (oldItem?: T) =>
        oldItem ? { ...oldItem, ...updatedFields } : oldItem
      );

      onMutate?.();

      return { previousList, previousItem };
    },
    onError: (_err, _updatedFields, context) => {
      if (context?.previousList) {
        queryClient.setQueryData(listKey, context.previousList);
      }
      if (context?.previousItem) {
        queryClient.setQueryData(itemKey, context.previousItem);
      }
      onError?.();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: listKey });
      queryClient.invalidateQueries({ queryKey: itemKey });
      onSettled?.();
    }
  };
}

/*
const updateUserMutation = useMutation({
  mutationFn: (updatedFields: Partial<T>) =>
    apiRoutes.updateUser(updatedFields, itemId),
  ...optimisticUpdateFlow({
    itemId: itemId,
    itemKey: itemKey,
    listKey: listKey,
    onError: () => {},
    onSuccess: () => {},
    onSettled: () => {},
  }),
});
*/
