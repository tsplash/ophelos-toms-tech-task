import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const customers = await prisma.customer.createMany({
    data: [
      {
        firstName: "John",
        middleName: "A.",
        lastName: "Doe",
        dateOfBirth: new Date("1990-01-01"),
        address: "123 Main St",
      },
      {
        firstName: "Jane",
        middleName: "B.",
        lastName: "Smith",
        dateOfBirth: new Date("1985-05-15"),
        address: "456 Oak Ave",
      },
    ],
  });
  console.log(`Seeded ${customers.count} customers`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
