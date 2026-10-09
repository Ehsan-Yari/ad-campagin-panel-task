const fields = ['costPerClick', 'dailyBudget', 'totalBudget'];

export function validateBudget(values) {
  for (const field of fields) {
    if (!Number.isInteger(values[field]) || values[field] <= 0) {
      return `${field} must be a positive integer`;
    }
  }

  if (values.dailyBudget < values.costPerClick) {
    return 'dailyBudget must be greater than or equal to costPerClick';
  }

  if (values.totalBudget < values.dailyBudget) {
    return 'totalBudget must be greater than or equal to dailyBudget';
  }

  return null;
}
