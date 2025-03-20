import { Route, Routes } from "react-router";
import { DashboardPage } from "./dashboard/DashboardPage";

export function CoreApp() {
  return (
    <Routes>
      <Route path='/' element={<DashboardPage />} />
    </Routes>
  );
}

/* import { Button } from "@/components/ui/button";
import { useClearAuthState } from "@/stores/auth-store";

export function CoreApp() {
  const clearAuthState = useClearAuthState();
  return (
    <div className='p-8'>
      <p className='text-xl font-bold'>CoreApp</p>

      <div className='mt-4'>
        <Button
          onClick={() => {
            clearAuthState();
          }}
          variant='destructive'
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
 */
