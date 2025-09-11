/* eslint-disable no-useless-escape */
import z from "zod";

export const shippingCostValidationSchema = z.object({
  name: z
    .string({ required_error: "Name is required!" })
    .min(1, "Name is required")
    .trim()
    .regex(/^[^~!@#$%\^*\+\?><=;:"]*$/, {
      message: 'Name cannot contain special characters: ~ ! @ # $ % ^ * + ? > < = ; : "',
    }),
  minSubTotal: z
    .string({
      required_error: "Minimum value is required",
      invalid_type_error: "minSubTotal must be a string",
    })
    .trim()
    .min(1, "Minimum value is required")
    // .regex(/^\d+$/, { message: "minSubTotal must be a valid number" }) // only digits allowed
    .refine((val) => Number(val) >= 0, {
      message: "minSubTotal cannot be negative",
    }),
  maxSubTotal: z
    .string({
      required_error: "Maximum value is required",
      invalid_type_error: "Maximum must be a string",
    })
    .trim()
    .min(1, "Maximum value is required")
    .refine((val) => Number(val) > 0, {
      message: "Maximum must be greater than 0",
    }),
  cost: z
    .string({
      required_error: "Cost value is required",
      invalid_type_error: "cost must be a string",
    })
    .trim()
    .min(1, "Cost value is required")
    .refine((val) => Number(val) >= 0, {
      message: "Cost value cannot be negative",
    }),
  priority: z
    .string({
      required_error: "Priority is required",
      invalid_type_error: "priority must be a string",
    })
    .trim()
    // .regex(/^[1-9]\d*$/, {
    //   message: "priority must be a valid positive integer",
    // }) // only digits, no 0 or negatives
    .refine((val) => Number(val) > 0, {
      message: "Priority must be greater than 0",
    }),
})
.superRefine((values, ctx) => {
  const { minSubTotal, maxSubTotal } = values
  if (Number(minSubTotal) && Number(maxSubTotal) && (Number(minSubTotal) > Number(maxSubTotal))) {
    ctx.addIssue({
      path: ["maxSubTotal"],
      message: "Maximum value must be greater than Minimum value",
      code: z.ZodIssueCode.custom,
    });
    ctx.addIssue({
      path: ["minSubTotal"],
      message: "Minimum value must be less than Maximum value",
      code: z.ZodIssueCode.custom,
    });
  }
});

