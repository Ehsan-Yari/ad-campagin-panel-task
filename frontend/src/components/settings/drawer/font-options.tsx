import type { SliderProps } from '@mui/material/Slider';
import type { SettingsState } from '../types';

import Slider, { sliderClasses } from '@mui/material/Slider';

export type FontSizeOptionsProps = SliderProps & {
  options: [number, number];
  value: SettingsState['fontSize'];
  onChangeOption: (newOption: number) => void;
};

export function FontSizeOptions({
  sx,
  value,
  options,
  onChangeOption,
  ...other
}: FontSizeOptionsProps) {
  return (
    <Slider
      marks
      step={1}
      size="small"
      valueLabelDisplay="on"
      aria-label="Change font size"
      valueLabelFormat={(val) => `${val}px`}
      value={value}
      min={options[0]}
      max={options[1]}
      onChange={(event: Event, newOption: number | number[]) => onChangeOption(newOption as number)}
      sx={[
        (theme) => ({
          [`& .${sliderClasses.rail}`]: {
            height: 12,
          },
          [`& .${sliderClasses.track}`]: {
            height: 12,
            background: `linear-gradient(135deg, ${theme.vars.palette.primary.light}, ${theme.vars.palette.primary.dark})`,
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    />
  );
}
