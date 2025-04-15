import { Router, Request } from "express";
import statementService from "../services/statementService.ts";

const router = Router();

router.post("/", async (req: Request, res: any) => {
  try {
    const statement = await statementService.createStatement(req.body);
    return res.status(201).json(statement);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create statement" });
  }
});

// For retrieving a statement and its calculations (disposable income and rating)
router.get("/:id", async (req: Request, res: any) => {
  try {
    const statement = await statementService.getStatementWithCalculations(
      parseInt(req.params.id)
    );
    if (!statement) {
      return res.status(404).json({ error: "Statement not found" });
    }
    return res.json(statement);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to retrieve statement" });
  }
});

export default router;
