import { useEffect } from 'react';
import { useWatch, useFormContext } from 'react-hook-form';

import Box from '@mui/material/Box';

import { budgetFields } from 'src/modules/campaigns/utils/budget';

import { BudgetField } from '../components/budget-field';

export function StepBudget() {
  const {
    trigger,
    formState: { dirtyFields, isSubmitted },
  } = useFormContext();

  const values = useWatch({ name: budgetFields });

  useEffect(() => {
    const changed = budgetFields.filter((name) => isSubmitted || dirtyFields[name]);
    if (changed.length) {
      trigger(changed);
    }
  }, [values, trigger, dirtyFields, isSubmitted]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {budgetFields.map((name) => (
        <BudgetField key={name} name={name} />
      ))}
    </Box>
  );
}
