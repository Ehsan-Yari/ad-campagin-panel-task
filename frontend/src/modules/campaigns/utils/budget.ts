import type { BudgetField } from 'src/modules/campaigns/interface/campaigns';

import * as yup from 'yup';

export const budgetFields: BudgetField[] = ['costPerClick', 'dailyBudget', 'totalBudget'];

export const budgetLabels: Record<BudgetField, string> = {
  costPerClick: 'قیمت هر کلیک',
  dailyBudget: 'بودجه روزانه',
  totalBudget: 'بودجه کل',
};

export const budgetSuggestions: Record<BudgetField, number[]> = {
  costPerClick: [100, 200, 300],
  dailyBudget: [10000, 50000, 100000],
  totalBudget: [1000000, 5000000, 10000000],
};

const amount = (field: BudgetField) =>
  yup
    .number()
    .typeError(`${budgetLabels[field]} را وارد کنید`)
    .required(`${budgetLabels[field]} را وارد کنید`)
    .integer('عدد باید صحیح باشد')
    .positive(`${budgetLabels[field]} باید بیشتر از صفر باشد`);

export const budgetSchema = yup.object({
  costPerClick: amount('costPerClick'),
  dailyBudget: amount('dailyBudget').min(
    yup.ref('costPerClick'),
    'بودجه روزانه نباید از قیمت هر کلیک کمتر باشد'
  ),
  totalBudget: amount('totalBudget').min(
    yup.ref('dailyBudget'),
    'بودجه کل نباید از بودجه روزانه کمتر باشد'
  ),
});
