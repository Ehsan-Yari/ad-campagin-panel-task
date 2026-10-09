import type { ThemeConfig } from 'src/theme/theme-config';
import type { ThemeColorPreset } from 'src/theme/with-settings';

export type SettingsState = {
  fontSize: number;
  fontFamily: string;
  compactLayout: boolean;
  contrast: 'default' | 'high';
  primaryColor: ThemeColorPreset;
  mode: ThemeConfig['defaultMode'];
  navColor: 'integrate' | 'apparent';
  direction: ThemeConfig['direction'];
  navLayout: 'vertical' | 'horizontal' | 'mini';
};

export type SettingsContextValue = {
  state: SettingsState;
  setField: (name: keyof SettingsState, updateValue: SettingsState[keyof SettingsState]) => void;
};

export type SettingsProviderProps = {
  defaultSettings: SettingsState;
  children: React.ReactNode;
};
