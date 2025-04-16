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

  // Find John Doe
  const john = await prisma.customer.findFirst({
    where: {
      firstName: "John",
      lastName: "Doe",
    },
  });

  if (john) {
    // Create a statement for John
    const statement = await prisma.statement.create({
      data: {
        customerId: john.id,
        statementLabel: "April Statement",
        incomes: {
          create: [
            {
              name: "Salary",
              amount: 3000,
              frequency: "monthly",
            },
          ],
        },
        expenditures: {
          create: [
            {
              name: "Mortgage",
              amount: 1000,
              frequency: "monthly",
            },
          ],
        },
      },
      include: {
        incomes: true,
        expenditures: true,
      },
    });

    console.log("Created statement:", statement);
  } else {
    console.log("Could not find John Doe to create a statement.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
