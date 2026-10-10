import type { Campaign } from 'src/modules/campaigns/interface/campaigns';

import { useMemo } from 'react';

import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Skeleton from '@mui/material/Skeleton';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import { fNumber } from 'src/utils/format-number';

import { buildTree } from 'src/modules/categories/utils/tree';
import { useCategories } from 'src/modules/categories/queries';
import { useCampaignCategories } from 'src/modules/campaigns/queries';

import { Iconify } from 'src/components/iconify';

import { CategoryTree } from '../components/category-tree';

type Props = {
  campaign: Campaign | null;
  onClose: () => void;
};

export function CategoriesDialog({ campaign, onClose }: Props) {
  const { categories, loading: categoriesLoading } = useCategories();
  const { categoryIds, loading: selectionLoading } = useCampaignCategories(campaign?.id);

  const tree = useMemo(() => buildTree(categories), [categories]);
  const loading = categoriesLoading || selectionLoading;

  return (
    <Dialog fullWidth maxWidth="sm" open={!!campaign} onClose={onClose}>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box sx={{ flexGrow: 1 }}>
          دسته‌بندی‌های «{campaign?.title}»
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {loading ? '...' : `${fNumber(categoryIds.length)} دسته‌بندی انتخاب شده`}
          </Typography>
        </Box>
        <IconButton onClick={onClose}>
          <Iconify icon="mingcute:close-line" />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pb: 3 }}>
        {loading ? (
          <Skeleton variant="rounded" height={320} />
        ) : (
          <CategoryTree tree={tree} value={categoryIds} />
        )}
      </DialogContent>
    </Dialog>
  );
}
