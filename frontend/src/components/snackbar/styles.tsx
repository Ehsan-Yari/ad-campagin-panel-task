import type { Theme, CSSObject } from '@mui/material/styles';

import { Toaster } from 'sonner';
import { varAlpha } from 'minimal-shared/utils';

import { styled } from '@mui/material/styles';

import { snackbarClasses } from './classes';

const loadingIconStyles = (theme: Theme): CSSObject => ({
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'none',
  transform: 'none',
  overflow: 'hidden',
  alignItems: 'center',
  position: 'relative',
  borderRadius: 'inherit',
  justifyContent: 'center',
  background: theme.vars.palette.background.neutral,
  [snackbarClasses.loaderVisible]: {
    display: 'inline-flex',
  },
  [`& .${snackbarClasses.loadingIcon}`]: {
    zIndex: 9,
    width: 24,
    height: 24,
    borderRadius: '50%',
    animation: 'rotate 3s infinite linear',
    background: `conic-gradient(transparent, ${varAlpha(theme.vars.palette.text.disabledChannel, 0.64)})`,
  },
});

const iconStyles = (theme: Theme): CSSObject => ({
  [`& .${snackbarClasses.icon}`]: {
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'flex-start',
    justifyContent: 'center',
    [`&:not(.${snackbarClasses.unset})`]: {
      width: 48,
      height: 48,
      borderRadius: 'inherit',
      backgroundColor: varAlpha('currentColor', 0.08),
      [`& .${snackbarClasses.iconSvg}`]: {
        width: 24,
        height: 24,
      },
      [`& .${snackbarClasses.loader}`]: {
        ...loadingIconStyles(theme),
      },
    },
  },
});

const contentStyles = (theme: Theme): CSSObject => ({
  [`& .${snackbarClasses.content}`]: {
    gap: 2,
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
  },
  [`& .${snackbarClasses.title}`]: {
    lineHeight: 20 / 13,
    fontSize: theme.typography.pxToRem(13),
    fontWeight: theme.typography.fontWeightMedium,
  },
  [`& .${snackbarClasses.description}`]: {
    opacity: 0.64,
    lineHeight: 18 / 13,
    fontSize: theme.typography.pxToRem(13),
  },
});

const actionsStyles = (theme: Theme): CSSObject => ({
  [`& .${snackbarClasses.actionButton}, & .${snackbarClasses.cancelButton}, & .${snackbarClasses.closeButton}`]:
    {
      color: 'inherit',
      cursor: 'pointer',
      fontFamily: 'inherit',
      alignItems: 'center',
      display: 'inline-flex',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      border: `solid 1px ${varAlpha('currentColor', 0.16)}`,
      transition: theme.transitions.create(['background-color', 'border-color']),
      '&:hover': {
        borderColor: varAlpha('currentColor', 0.24),
        backgroundColor: varAlpha('currentColor', 0.08),
      },
    },
  [`& .${snackbarClasses.actionButton}, & .${snackbarClasses.cancelButton}`]: {
    flexShrink: 0,
    whiteSpace: 'nowrap',
    borderRadius: 6,
    lineHeight: 18 / 13,
    padding: '4px 12px',
    fontSize: theme.typography.pxToRem(13),
    fontWeight: theme.typography.fontWeightSemiBold,
  },
  [`& .${snackbarClasses.actionButton}`]: {
    borderColor: 'transparent',
    color: theme.vars.palette.background.paper,
    backgroundColor: theme.vars.palette.text.primary,
    '&:hover': {
      opacity: 0.84,
      borderColor: 'transparent',
      backgroundColor: theme.vars.palette.text.primary,
    },
  },
  [`& .${snackbarClasses.toast}:not([data-type]) .${snackbarClasses.actionButton}`]: {
    color: theme.vars.palette.text.primary,
    backgroundColor: theme.vars.palette.background.paper,
    '&:hover': { backgroundColor: theme.vars.palette.background.paper },
  },
  [`& .${snackbarClasses.closeButton}`]: {
    top: 0,
    right: 0,
    width: 22,
    height: 22,
    padding: 0,
    zIndex: 1,
    borderRadius: '50%',
    position: 'absolute',
    backgroundColor: 'inherit',
    transform: 'translate(35%, -35%)',
    boxShadow: theme.vars.customShadows.z1,
    '& > svg': { width: 14, height: 14, opacity: 0.8 },
    '&:hover': { backgroundColor: 'inherit' },
  },
});

const toastStyles = (theme: Theme): CSSObject => ({
  [`& .${snackbarClasses.toast}`]: {
    fontFamily: theme.typography.fontFamily,
    gap: 12,
    minHeight: 52,
    borderRadius: 12,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 1, 0.5, 0.5),
    boxShadow: theme.vars.customShadows.z8,
    backgroundColor: theme.vars.palette.background.paper,
    [`& .${snackbarClasses.content}`]: { minWidth: 0 },
    [snackbarClasses.default]: {
      padding: theme.spacing(1, 1, 1, 1.5),
      color: theme.vars.palette.background.paper,
      backgroundColor: theme.vars.palette.text.primary,
    },
    [`&.${snackbarClasses.info} .${snackbarClasses.icon}`]: {
      color: theme.vars.palette.info.main,
    },
    [`&.${snackbarClasses.success} .${snackbarClasses.icon}`]: {
      color: theme.vars.palette.success.main,
    },
    [`&.${snackbarClasses.warning} .${snackbarClasses.icon}`]: {
      color: theme.vars.palette.warning.main,
    },
    [`&.${snackbarClasses.error} .${snackbarClasses.icon}`]: {
      color: theme.vars.palette.error.main,
    },
  },
});

export const SnackbarRoot = styled(Toaster)(({ theme }) => ({
  '@keyframes rotate': {
    to: { transform: 'rotate(1turn)' },
  },
  ...toastStyles(theme),
  ...iconStyles(theme),
  ...contentStyles(theme),
  ...actionsStyles(theme),
  '@media (max-width: 600px)': {
    '&&[data-sonner-toaster]': {
      left: 'var(--mobile-offset-left)',
      right: 'var(--mobile-offset-right)',
      width: 'auto',
    },
    [`&& .${snackbarClasses.toast}`]: {
      left: 0,
      right: 0,
      width: '100%',
      maxWidth: '100%',
    },
  },
}));
