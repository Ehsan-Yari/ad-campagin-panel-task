import type { Campaign, BudgetField } from 'src/modules/campaigns/interface/campaigns';

import { useState } from 'react';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { DashboardContent } from 'src/layouts/dashboard';
import { useCampaigns } from 'src/modules/campaigns/queries';
import { budgetLabels, budgetFields } from 'src/modules/campaigns/utils/budget';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { TableNoData, TableSkeleton } from 'src/components/table';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { ClicksDialog } from './clicks-dialog';
import { CategoriesDialog } from './categories-dialog';
import { CampaignTableRow } from './campaign-table-row';
import { EditBudgetPopover } from './edit-budget-popover';

type EditingState = {
  campaign: Campaign;
  field: BudgetField;
  anchorEl: HTMLElement;
};

export function CampaignListView() {
  const { campaigns, loading } = useCampaigns();

  const [editing, setEditing] = useState<EditingState | null>(null);
  const [clicksCampaign, setClicksCampaign] = useState<Campaign | null>(null);
  const [categoriesCampaign, setCategoriesCampaign] = useState<Campaign | null>(null);

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="فهرست کمپین‌ها"
        links={[{ name: 'کمپین‌ها' }]}
        action={
          <Button
            component={RouterLink}
            href={paths.campaign.create}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            کمپین جدید
          </Button>
        }
        sx={{ mb: 5 }}
      />

      <Card>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>عنوان</TableCell>
                  {budgetFields.map((field) => (
                    <TableCell key={field}>{budgetLabels[field]}</TableCell>
                  ))}
                  <TableCell>تاریخ ساخت</TableCell>
                  <TableCell align="center">کلیک‌ها</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {loading ? (
                  <TableSkeleton rowCount={4} cellCount={6} />
                ) : (
                  campaigns.map((campaign) => (
                    <CampaignTableRow
                      key={campaign.id}
                      campaign={campaign}
                      onEdit={(field, anchorEl) => setEditing({ campaign, field, anchorEl })}
                      onShowClicks={() => setClicksCampaign(campaign)}
                      onShowCategories={() => setCategoriesCampaign(campaign)}
                    />
                  ))
                )}

                {!loading && <TableNoData notFound={campaigns.length === 0} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </Card>

      {editing && (
        <EditBudgetPopover
          key={`${editing.campaign.id}-${editing.field}`}
          campaign={editing.campaign}
          field={editing.field}
          anchorEl={editing.anchorEl}
          onClose={() => setEditing(null)}
        />
      )}

      <ClicksDialog campaign={clicksCampaign} onClose={() => setClicksCampaign(null)} />

      <CategoriesDialog campaign={categoriesCampaign} onClose={() => setCategoriesCampaign(null)} />
    </DashboardContent>
  );
}
