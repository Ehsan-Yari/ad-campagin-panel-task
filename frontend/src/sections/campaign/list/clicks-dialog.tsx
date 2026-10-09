import type { Campaign } from 'src/modules/campaigns/interface/campaigns';

import { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Skeleton from '@mui/material/Skeleton';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';

import { fNumber } from 'src/utils/format-number';
import { fJalaliDateTime } from 'src/utils/format-time';

import { useCampaignClicks } from 'src/modules/campaigns/queries';

import { Iconify } from 'src/components/iconify';

const ROW_HEIGHT = 48;

type Props = {
  campaign: Campaign | null;
  onClose: () => void;
};

export function ClicksDialog({ campaign, onClose }: Props) {
  const { clicks, count, loading } = useCampaignClicks(campaign?.id);

  const scrollRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: clicks.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 10,
  });

  return (
    <Dialog fullWidth maxWidth="sm" open={!!campaign} onClose={onClose}>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box sx={{ flexGrow: 1 }}>
          کلیک‌های «{campaign?.title}»
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {loading ? '...' : `${fNumber(count)} کلیک`}
          </Typography>
        </Box>
        <IconButton onClick={onClose}>
          <Iconify icon="mingcute:close-line" />
        </IconButton>
      </DialogTitle>

      <Box
        sx={{
          px: 3,
          py: 1.5,
          display: 'flex',
          typography: 'subtitle2',
          color: 'text.secondary',
          bgcolor: 'background.neutral',
        }}
      >
        <Box sx={{ width: 96 }}>ردیف</Box>
        <Box>زمان کلیک</Box>
      </Box>

      <Box ref={scrollRef} sx={{ height: 480, overflow: 'auto' }}>
        {loading ? (
          <Box sx={{ p: 3, gap: 1.5, display: 'flex', flexDirection: 'column' }}>
            {Array.from({ length: 8 }, (_, index) => (
              <Skeleton key={index} height={32} />
            ))}
          </Box>
        ) : (
          <Box sx={{ height: virtualizer.getTotalSize(), position: 'relative' }}>
            {virtualizer.getVirtualItems().map((item) => (
              <Box
                key={item.key}
                sx={{
                  px: 3,
                  top: 0,
                  left: 0,
                  width: 1,
                  display: 'flex',
                  alignItems: 'center',
                  position: 'absolute',
                  height: ROW_HEIGHT,
                  transform: `translateY(${item.start}px)`,
                  borderBottom: (theme) => `dashed 1px ${theme.vars.palette.divider}`,
                }}
              >
                <Box sx={{ width: 96, color: 'text.secondary' }}>{fNumber(item.index + 1)}</Box>
                <Box>{fJalaliDateTime(clicks[item.index].clickedAt)}</Box>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Dialog>
  );
}
