import { SidebarLayout } from '@/components/catalyst/sidebar-layout';
import MobileNav from '@/components/custom/MobileNav/MobileNav';
import WebNav from '@/components/custom/WebNav/WebNav';
import type { FC } from 'react';
import { Outlet } from 'react-router';

const RootLayout: FC = () => {
  return (
    <SidebarLayout
      navbar={<MobileNav />}
      sidebar={<WebNav />}
    >
      <Outlet />
    </SidebarLayout>
  );
};

export default RootLayout;