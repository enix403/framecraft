import { DemoTable } from "./DemoTable";
// import { AddUserModal } from "./AddUserModal";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { UserEditModal } from "./UserEditModal";

export function Scratch() {
  return (
    <div className='max-h-full w-full max-w-full space-y-7 overflow-y-auto p-8'>

      <UserEditModal userId="67e83ce8ac5dbb1149b77b94">
        <Button className='ml-auto' variant='outline'>
          <PlusIcon className='-ms-1 opacity-60' size={16} aria-hidden='true' />
          Edit User
        </Button>
      </UserEditModal>


    </div>
  );
}
