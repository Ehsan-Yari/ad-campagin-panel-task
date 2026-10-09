import { CONFIG } from 'src/global-config';

import { CampaignCreateView } from 'src/sections/campaign/create/campaign-create-view';

const metadata = { title: `ساخت کمپین | ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <title>{metadata.title}</title>

      <CampaignCreateView />
    </>
  );
}
