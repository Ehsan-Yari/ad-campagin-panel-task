import type {
  Campaign,
  BudgetField as BudgetFieldName,
} from 'src/modules/campaigns/interface/campaigns';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';

import { budgetSchema } from 'src/modules/campaigns/utils/budget';
import { useUpdateCampaign } from 'src/modules/campaigns/mutations';

import { Form } from 'src/components/hook-form';
import { toast } from 'src/components/snackbar';

import { BudgetField } from '../components/budget-field';

type Props = {
  campaign: Campaign;
  field: BudgetFieldName;
  anchorEl: HTMLElement | null;
  onClose: () => void;
};

export function EditBudgetPopover({ campaign, field, anchorEl, onClose }: Props) {
  const updateCampaign = useUpdateCampaign();

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(budgetSchema),
    defaultValues: {
      costPerClick: campaign.costPerClick,
      dailyBudget: campaign.dailyBudget,
      totalBudget: campaign.totalBudget,
    },
  });

  const onSubmit = methods.handleSubmit(async (values) => {
    await updateCampaign.mutateAsync({ id: campaign.id, [field]: values[field] });
    toast.success('تغییرات ذخیره شد');
    onClose();
  });

  return (
    <Popover
      open={!!anchorEl}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Box sx={{ p: 2.5, width: 360 }}>
        <Form methods={methods} onSubmit={onSubmit}>
          <BudgetField name={field} autoFocus />

          <Box sx={{ mt: 2, gap: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Button color="inherit" variant="outlined" onClick={onClose}>
              انصراف
            </Button>
            <Button type="submit" variant="contained" loading={methods.formState.isSubmitting}>
              ذخیره
            </Button>
          </Box>
        </Form>
      </Box>
    </Popover>
  );
}
