import { useMemo } from 'react';
import { useWatch, Controller, useFormContext } from 'react-hook-form';

import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import FormHelperText from '@mui/material/FormHelperText';

import { fNumber } from 'src/utils/format-number';

import { buildTree } from 'src/modules/categories/utils/tree';
import { useCategories } from 'src/modules/categories/queries';

import { Field } from 'src/components/hook-form';

import { CategoryTree } from '../components/category-tree';

export function StepCategories() {
  const { control } = useFormContext();
  const allCategories = useWatch({ name: 'allCategories' });

  const { categories, loading } = useCategories();
  const tree = useMemo(() => buildTree(categories), [categories]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Field.Text name="title" label="عنوان کمپین" />

      <Field.Checkbox name="allCategories" label="تبلیغ روی همه دسته‌بندی‌ها" />

      <Controller
        name="categoryIds"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              دسته‌بندی‌ها
              {!allCategories && field.value.length > 0 && (
                <Typography
                  component="span"
                  variant="caption"
                  sx={{ color: 'text.secondary', ml: 1 }}
                >
                  ({fNumber(field.value.length)} مورد انتخاب شده)
                </Typography>
              )}
            </Typography>

            {loading ? (
              <Skeleton variant="rounded" height={320} />
            ) : (
              <CategoryTree
                tree={tree}
                value={field.value}
                disabled={allCategories}
                onChange={field.onChange}
              />
            )}

            {error && !allCategories && <FormHelperText error>{error.message}</FormHelperText>}
          </Box>
        )}
      />
    </Box>
  );
}
