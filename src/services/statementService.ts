import statementRepository, {
  StatementData,
} from "../repositories/statementRepository.ts";
import { calculateIE } from "../utils/IECalculator.ts";

async function createStatement(data: StatementData) {
  return statementRepository.create(data);
}

async function getStatementWithCalculations(statementId: number) {
  const statement = await statementRepository.findById(statementId);
  if (!statement) {
    return null;
  }

  // Calculate monthly totals from incomes and expenditures using our utility class.
  const { disposableIncome, rating, totalIncome, totalExpenditure } =
    calculateIE(statement.incomes, statement.expenditures);

  return {
    ...statement,
    calculations: {
      totalIncome,
      totalExpenditure,
      disposableIncome,
      rating,
    },
  };
}

export default { createStatement, getStatementWithCalculations };
