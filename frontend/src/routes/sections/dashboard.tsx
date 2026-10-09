import type { RouteObject } from 'react-router';

import { Outlet } from 'react-router';
import { lazy, Suspense } from 'react';

import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { usePathname } from '../hooks';

const CampaignListPage = lazy(() => import('src/pages/campaign/list'));
const CampaignCreatePage = lazy(() => import('src/pages/campaign/create'));

function SuspenseOutlet() {
  const pathname = usePathname();
  return (
    <Suspense key={pathname} fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  );
}

export const dashboardRoutes: RouteObject[] = [
  {
    path: 'campaigns',
    element: (
      <DashboardLayout>
        <SuspenseOutlet />
      </DashboardLayout>
    ),
    children: [
      { index: true, element: <CampaignListPage /> },
      { path: 'new', element: <CampaignCreatePage /> },
    ],
  },
];
