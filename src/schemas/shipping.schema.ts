import z from "zod";

export const shippingCostValidationSchema = z.object({
  name: z
    .string({ required_error: "Name is required!" })
    .min(1, "Name is required"),
  minSubTotal: z
    .string({ required_error: "Minimum Value is required!" })
    .min(1, "Minimum Value is required"),
  maxSubTotal: z
    .string({ required_error: "Maximum Value is required!" })
    .min(1, "Maximum Value is required"),
  cost: z
    .string({ required_error: "Cost Value is required!" })
    .min(1, "Cost Value is required"),
  priority: z
    .string({ required_error: "Priority is required!" })
    .min(1, "Priority is required"),
//   minSubTotal: z.preprocess(
//     (val) =>
//       val === "" || val === undefined || val === null ? undefined : Number(val),
//     z.number({
//       invalid_type_error: "minSubTotal must be a number",
//       required_error: "minSubTotal is required",
//     }).refine((val) => val >= 0, {
//       message: "minSubTotal cannot be negative",
//     }).transform((val)=> String(val))
//   ),
//   maxSubTotal: z.preprocess(
//     (val) =>
//       val === "" || val === undefined || val === null ? undefined : Number(val),
//     z.number({
//       invalid_type_error: "maxSubTotal must be a number",
//       required_error: "maxSubTotal is required",
//     }).refine((val) => val > 0, {
//       message: "maxSubTotal must be greater than 0",
//     })
//   ),
//   cost: z.preprocess(
//     (val) =>
//       val === "" || val === undefined || val === null ? undefined : Number(val),
//     z.number({
//       invalid_type_error: "cost must be a number",
//       required_error: "cost value is required",
//     }).refine((val) => val >= 0, {
//       message: "cost cannot be negative",
//     })
//   ),
//   priority: z.preprocess(
//     (val) =>
//       val === "" || val === undefined || val === null ? undefined : Number(val),
//     z.number({
//       invalid_type_error: "priority must be a number",
//       required_error: "priority is required",
//     }).refine((val) => val > 0, {
//       message: "priority must be greater than 0",
//     })
//   ),
});

