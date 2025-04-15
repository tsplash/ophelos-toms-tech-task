import prisma from "../config/prismaClient.ts";

export interface StatementData {
  customerId: number;
  statementLabel: string;
  incomes: Array<{
    name: string;
    amount: number;
    frequency: "monthly" | "yearly";
  }>;
  expenditures: Array<{
    name: string;
    amount: number;
    frequency: "monthly" | "yearly";
  }>;
}

async function create(data: StatementData) {
  return prisma.statement.create({
    data: {
      customerId: data.customerId,
      statementLabel: data.statementLabel,
      incomes: {
        create: data.incomes,
      },
      expenditures: {
        create: data.expenditures,
      },
    },
    include: {
      incomes: true,
      expenditures: true,
    },
  });
}

async function findById(id: number) {
  return prisma.statement.findUnique({
    where: { id },
    include: {
      incomes: true,
      expenditures: true,
    },
  });
}

export default { create, findById };
