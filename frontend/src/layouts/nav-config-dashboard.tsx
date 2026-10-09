import type { NavSectionProps } from 'src/components/nav-section';

import { paths } from 'src/routes/paths';

import { Iconify } from 'src/components/iconify';

export const navData: NavSectionProps['data'] = [
  {
    subheader: 'کمپین‌ها',
    items: [
      {
        title: 'ساخت کمپین',
        path: paths.campaign.create,
        icon: <Iconify icon="mingcute:add-line" />,
      },
      {
        title: 'فهرست کمپین‌ها',
        path: paths.campaign.list,
        icon: <Iconify icon="solar:list-bold" />,
      },
    ],
  },
];
