import type { SettingsState, SettingsProviderProps } from '../types';

import { useMemo, useState, useCallback } from 'react';

import { SettingsContext } from './settings-context';

export function SettingsProvider({ children, defaultSettings }: SettingsProviderProps) {
  const [state, setState] = useState<SettingsState>(defaultSettings);

  const setField = useCallback(
    (name: keyof SettingsState, updateValue: SettingsState[keyof SettingsState]) => {
      setState((prev) => ({ ...prev, [name]: updateValue }));
    },
    []
  );

  const memoizedValue = useMemo(() => ({ state, setField }), [state, setField]);

  return <SettingsContext value={memoizedValue}>{children}</SettingsContext>;
}
