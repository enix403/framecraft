import { AppLayout } from "@/components/app-layout/AppLayout";
import { Plus } from "lucide-react";
import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@/components/ui/table";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import { apiRoutes } from "@/lib/api-routes";

function DimensionDisplay({ length, width, unit }) {
  return `${length} ${unit} x ${width} ${unit}`;
}

export function MyPlanCard({ plan }: { plan: any }) {
  const roomCount = plan.canvas.canvasData.rooms.length;

  return (
    <Card className='gap-0 overflow-hidden pt-0'>
      <CardHeader className='border-b !p-0'>
        <img src='/plan1.jpg' alt='' />
      </CardHeader>
      <CardContent className='py-2'>
        <Table>
          <TableBody>
            <TableRow>
              <TableHead>Plot Dimension</TableHead>
              <TableCell>
                <DimensionDisplay
                  length={plan.plotLength}
                  width={plan.plotWidth}
                  unit={plan.plotMeasureUnit}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Room Count</TableHead>
              <TableCell>{roomCount}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Created At</TableHead>
              <TableCell>invoice</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className='flex gap-2'>
        <Button className='flex-1'>View</Button>
      </CardFooter>
    </Card>
  );
}

function MyPlans({ plans }: { plans: any[] }) {
  return (
    <>
      <h2 className='mb-4 text-xl font-medium tracking-tight'>My Designs</h2>

      <div
        className={clsx(
          "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5",
          "gap-x-6 gap-y-8"
        )}
      >
        {plans.map(plan => (
          <MyPlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </>
  );
}

export function DashboardPage() {
  const { data: plans, isError } = useQuery({
    queryKey: ["plans"],
    queryFn: apiRoutes.getPlans
  });

  return (
    <AppLayout title='Dashboard'>
      <h2 className='mb-4 text-xl font-medium tracking-tight'>
        Create New Design
      </h2>

      <div className='mb-6'>
        <Link to='/app/new-plan'>
          <button className='inline-flex h-32 w-36 items-center justify-center rounded-xl bg-zinc-100 tc hover:bg-zinc-200'>
            <Plus className='size-16 text-green-500' strokeWidth={1} />
          </button>
        </Link>
      </div>

      {!isError && plans && <MyPlans plans={plans} />}
    </AppLayout>
  );
}
