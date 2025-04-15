import { expect } from "chai";
import { calculateIE, FinancialItem } from "../src/utils/IECalculator.ts";

describe("IECalculator", () => {
  it("should calculate disposable income and rating correctly with monthly amounts", () => {
    const incomes: FinancialItem[] = [
      { amount: 3000, frequency: "monthly" },
      { amount: 1200, frequency: "monthly" },
    ];
    const expenditures: FinancialItem[] = [
      { amount: 500, frequency: "monthly" },
      { amount: 200, frequency: "monthly" },
    ];
    const result = calculateIE(incomes, expenditures);
    expect(result.totalIncome).to.equal(4200);
    expect(result.totalExpenditure).to.equal(700);
    expect(result.disposableIncome).to.equal(3500);
    // Ratio = 700 / 4200 ≈ 0.1667, which should rate as B
    expect(result.rating).to.equal("B");
  });

  it("should convert yearly amounts to monthly correctly", () => {
    const incomes: FinancialItem[] = [
      { amount: 36000, frequency: "yearly" }, // 3000 monthly
    ];
    const expenditures: FinancialItem[] = [
      { amount: 1200, frequency: "yearly" }, // 100 monthly
    ];
    const result = calculateIE(incomes, expenditures);
    expect(result.totalIncome).to.equal(3000);
    expect(result.totalExpenditure).to.equal(100);
    expect(result.disposableIncome).to.equal(2900);
    // Ratio = 100/3000 ≈ 0.0333, rating = A
    expect(result.rating).to.equal("A");
  });

  it("should calculate disposable income and rating correctly for rating C", () => {
    // Scenario: ratio = 1500/3000 = 0.5, which falls in the rating C range (since ratio > 0.30 && <= 0.50)
    const incomes: FinancialItem[] = [{ amount: 3000, frequency: "monthly" }];
    const expenditures: FinancialItem[] = [
      { amount: 1500, frequency: "monthly" },
    ];
    const result = calculateIE(incomes, expenditures);
    expect(result.totalIncome).to.equal(3000);
    expect(result.totalExpenditure).to.equal(1500);
    expect(result.disposableIncome).to.equal(1500);
    expect(result.rating).to.equal("C");
  });

  it("should calculate disposable income and rating correctly for rating D", () => {
    // Scenario: ratio = 2000/3000 ≈ 0.6667, which falls in the rating D range (ratio > 0.50)
    const incomes: FinancialItem[] = [{ amount: 3000, frequency: "monthly" }];
    const expenditures: FinancialItem[] = [
      { amount: 2000, frequency: "monthly" },
    ];
    const result = calculateIE(incomes, expenditures);
    expect(result.totalIncome).to.equal(3000);
    expect(result.totalExpenditure).to.equal(2000);
    expect(result.disposableIncome).to.equal(1000);
    expect(result.rating).to.equal("D");
  });

  it("should return rating D when income is zero", () => {
    // Scenario: No income provided, so by design, the ratio defaults to 1 and rating should be D
    const incomes: FinancialItem[] = [];
    const expenditures: FinancialItem[] = [
      { amount: 100, frequency: "monthly" },
    ];
    const result = calculateIE(incomes, expenditures);
    expect(result.totalIncome).to.equal(0);
    expect(result.totalExpenditure).to.equal(100);
    expect(result.disposableIncome).to.equal(-100);
    expect(result.rating).to.equal("D");
  });
});
