import { Router, Request } from "express";
import customerService from "../services/customerService.ts";

const router = Router();

router.post("/", async (req: Request, res: any) => {
  try {
    const customer = await customerService.createCustomer(req.body);
    return res.status(201).json(customer);
  } catch (error) {
    return res.status(500).json({ error: "Failed to create customer" });
  }
});

router.get("/", async (_req: Request, res: any) => {
  try {
    const customers = await customerService.getAllCustomers();
    return res.json(customers);
  } catch (error) {
    return res.status(500).json({ error: "Failed to retrieve customers" });
  }
});

export default router;
