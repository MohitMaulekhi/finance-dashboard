import { z } from "zod";

export const transactionSchema = z.object({
  id: z.string(),
  date: z.string(),
  amount: z.number().positive("Amount must be positive"),
  category: z.string().min(1, "Category is required"),
  type: z.enum(["income", "expense"]),
  description: z.string().optional(),
});

export type Transaction = z.infer<typeof transactionSchema>;
export type UserRole = "viewer" | "admin";
