import type { Campaign, BudgetField } from 'src/modules/campaigns/interface/campaigns';

import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { fNumber } from 'src/utils/format-number';
import { fJalaliDate } from 'src/utils/format-time';

import { budgetFields } from 'src/modules/campaigns/utils/budget';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

type Props = {
  campaign: Campaign;
  onEdit: (field: BudgetField, anchorEl: HTMLElement) => void;
  onShowClicks: () => void;
};

export function CampaignTableRow({ campaign, onEdit, onShowClicks }: Props) {
  return (
    <TableRow hover>
      <TableCell>
        <Typography variant="subtitle2">{campaign.title}</Typography>
        {campaign.allCategories && (
          <Label color="info" sx={{ mt: 0.5 }}>
            همه دسته‌بندی‌ها
          </Label>
        )}
      </TableCell>

      {budgetFields.map((field) => (
        <TableCell key={field}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {fNumber(campaign[field])}
            <IconButton size="small" onClick={(event) => onEdit(field, event.currentTarget)}>
              <Iconify width={18} icon="solar:pen-bold" />
            </IconButton>
          </Box>
        </TableCell>
      ))}

      <TableCell sx={{ whiteSpace: 'nowrap' }}>{fJalaliDate(campaign.createdAt)}</TableCell>

      <TableCell align="center">
        <Tooltip title={`${fNumber(campaign.clicksCount)} کلیک`}>
          <IconButton onClick={onShowClicks}>
            <Iconify icon="solar:eye-bold" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}
