import { AppLayout } from "@/components/app-layout/AppLayout";
import { Plus } from "lucide-react";
import { Link } from "react-router";

export function DashboardPage() {
  return (
    <AppLayout title='Dashboard'>
      <h2 className='mb-4 text-xl font-medium tracking-tight'>My Designs</h2>

      <Link to='/app/new-plan'>
        <button className='inline-flex h-32 w-36 items-center justify-center rounded-xl bg-zinc-100 tc hover:bg-zinc-200'>
          <Plus className='size-16 text-green-500' strokeWidth={1} />
        </button>
      </Link>
    </AppLayout>
  );
}
