import type { BudgetField as BudgetFieldName } from 'src/modules/campaigns/interface/campaigns';

import { useWatch, useFormContext } from 'react-hook-form';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';

import { fNumber } from 'src/utils/format-number';

import { budgetLabels, budgetSuggestions } from 'src/modules/campaigns/utils/budget';

import { Field } from 'src/components/hook-form';

type Props = {
  name: BudgetFieldName;
  autoFocus?: boolean;
};

export function BudgetField({ name, autoFocus }: Props) {
  const { setValue } = useFormContext();
  const value = useWatch({ name });

  const amount = Number(value);
  const helperText = amount > 0 ? `${fNumber(amount)} تومان` : ' ';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      <Box sx={{ display: 'flex', gap: 1 }}>
        {budgetSuggestions[name].map((suggestion) => (
          <Button
            key={suggestion}
            size="small"
            color={amount === suggestion ? 'primary' : 'inherit'}
            variant={amount === suggestion ? 'contained' : 'outlined'}
            onClick={() =>
              setValue(name, suggestion, {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true,
              })
            }
          >
            {fNumber(suggestion)}
          </Button>
        ))}
      </Box>

      <Field.Text
        name={name}
        type="number"
        label={budgetLabels[name]}
        helperText={helperText}
        autoFocus={autoFocus}
        slotProps={{
          input: { endAdornment: <InputAdornment position="end">تومان</InputAdornment> },
        }}
      />
    </Box>
  );
}
