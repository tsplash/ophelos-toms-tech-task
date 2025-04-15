import prisma from "../config/prismaClient.ts";

export interface CustomerData {
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: Date;
  address: string;
}

async function create(data: CustomerData) {
  return prisma.customer.create({ data });
}

async function findAll() {
  return prisma.customer.findMany();
}

export default { create, findAll };
