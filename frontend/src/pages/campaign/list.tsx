import { CONFIG } from 'src/global-config';

import { CampaignListView } from 'src/sections/campaign/list/campaign-list-view';

const metadata = { title: `فهرست کمپین‌ها | ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <title>{metadata.title}</title>

      <CampaignListView />
    </>
  );
}
