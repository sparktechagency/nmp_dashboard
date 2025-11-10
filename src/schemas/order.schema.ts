import { z } from "zod";

export const orderStatusSchema = z.object({
    status: z.string({
        invalid_type_error: "status must be a valid string value.",
    })
        .refine((val) => ['processing', 'shipped', 'delivered', 'cancelled'].includes(val), {
            message: "status must be one of: 'processing', 'shipped', 'delivered', 'cancelled'",
        })
});


export const updateTipsSchema = z.object({
    tips: z
        .string({
            required_error: "Tips value is required",
            invalid_type_error: "tips value must be a string",
        })
        .trim()
        .min(1, "Tips value is required")
        .refine((val) => Number(val) >= 0, {
            message: "Tips value cannot be negative",
        }),
})

