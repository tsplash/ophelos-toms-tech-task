import customerRepository, {
  CustomerData,
} from "../repositories/customerRepository.ts";

async function createCustomer(data: CustomerData) {
  return customerRepository.create(data);
}

async function getAllCustomers() {
  return customerRepository.findAll();
}

export default { createCustomer, getAllCustomers };
