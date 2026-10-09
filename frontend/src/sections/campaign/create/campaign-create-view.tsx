import type { InferType } from 'yup';

import * as yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Step from '@mui/material/Step';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';
import { budgetSchema } from 'src/modules/campaigns/utils/budget';
import { useCreateCampaign } from 'src/modules/campaigns/mutations';

import { Form } from 'src/components/hook-form';
import { toast } from 'src/components/snackbar';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { StepBudget } from './step-budget';
import { StepCategories } from './step-categories';

const steps = ['عنوان و دسته‌بندی', 'قیمت و بودجه'];

const campaignSchema = yup
  .object({
    title: yup.string().trim().required('عنوان کمپین را وارد کنید'),
    allCategories: yup.boolean().required(),
    categoryIds: yup
      .array(yup.string().required())
      .required()
      .when('allCategories', {
        is: false,
        then: (schema) => schema.min(1, 'حداقل یک دسته‌بندی انتخاب کنید'),
      }),
  })
  .concat(budgetSchema);

type CampaignFormValues = InferType<typeof campaignSchema>;

export function CampaignCreateView() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);

  const createCampaign = useCreateCampaign();

  const methods = useForm<CampaignFormValues>({
    mode: 'onTouched',
    resolver: yupResolver(campaignSchema),
    defaultValues: { title: '', allCategories: false, categoryIds: [] },
  });

  const handleNext = async () => {
    const valid = await methods.trigger(['title', 'allCategories', 'categoryIds']);
    if (valid) {
      setActiveStep(1);
    }
  };

  const onSubmit = methods.handleSubmit(async (values) => {
    await createCampaign.mutateAsync({
      ...values,
      categoryIds: values.allCategories ? [] : values.categoryIds,
    });
    toast.success('کمپین با موفقیت ساخته شد');
    router.push(paths.campaign.list);
  });

  return (
    <DashboardContent maxWidth="md">
      <CustomBreadcrumbs
        heading="ساخت کمپین تبلیغاتی"
        links={[{ name: 'کمپین‌ها', href: paths.campaign.list }, { name: 'ساخت کمپین' }]}
        sx={{ mb: 5 }}
      />

      <Card sx={{ p: 3 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Form methods={methods} onSubmit={onSubmit}>
          {activeStep === 0 ? <StepCategories /> : <StepBudget />}

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              color="inherit"
              variant="outlined"
              disabled={activeStep === 0}
              onClick={() => setActiveStep(0)}
            >
              مرحله قبل
            </Button>

            {activeStep === 0 ? (
              <Button key="next" variant="contained" onClick={handleNext}>
                مرحله بعد
              </Button>
            ) : (
              <Button
                key="submit"
                type="submit"
                variant="contained"
                loading={methods.formState.isSubmitting}
              >
                ارسال
              </Button>
            )}
          </Box>
        </Form>
      </Card>
    </DashboardContent>
  );
}
