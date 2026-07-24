import { Outlet } from 'react-router-dom';
import { Sidebar, TopBar } from '@/components/ui/Sidebar';
import { BottomNav } from '@/components/ui/BottomNav';

export function AppLayout() {
  return (
    <div className="min-h-screen bg-neutral-50/50 dark:bg-neutral-950">
      <Sidebar />
      <div className="md:pl-64">
        <TopBar />
        <main className="p-4 md:p-8 pb-24 md:pb-8 max-w-7xl mx-auto">
          <Outlet />
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
