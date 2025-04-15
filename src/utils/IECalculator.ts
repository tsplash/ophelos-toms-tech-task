export interface FinancialItem {
  amount: number;
  frequency: "monthly" | "yearly";
}

export interface IECResult {
  totalIncome: number;
  totalExpenditure: number;
  disposableIncome: number;
  rating: "A" | "B" | "C" | "D";
}

export function calculateIE(
  incomes: FinancialItem[],
  expenditures: FinancialItem[]
): IECResult {
  // Convert each financial item to a monthly value
  const convertToMonthly = (item: FinancialItem) =>
    item.frequency === "yearly" ? item.amount / 12 : item.amount;

  const totalIncome = incomes.reduce(
    (sum, inc) => sum + convertToMonthly(inc),
    0
  );
  const totalExpenditure = expenditures.reduce(
    (sum, exp) => sum + convertToMonthly(exp),
    0
  );

  const disposableIncome = totalIncome - totalExpenditure;

  // To avoid division by zero, if no income then assign rating "D"
  const ratio = totalIncome > 0 ? totalExpenditure / totalIncome : 1;

  let rating: "A" | "B" | "C" | "D";
  if (ratio < 0.1) {
    rating = "A";
  } else if (ratio >= 0.1 && ratio <= 0.3) {
    rating = "B";
  } else if (ratio > 0.3 && ratio <= 0.5) {
    rating = "C";
  } else {
    rating = "D";
  }

  return { totalIncome, totalExpenditure, disposableIncome, rating };
}
