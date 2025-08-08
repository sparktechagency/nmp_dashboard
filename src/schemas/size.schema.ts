import { z } from "zod";

export const sizeSchema = z.object({
    size: z.string({
        invalid_type_error: "Size must be a valid string value.",
        required_error: "Size is required",
    })
    .trim()
    .min(1, "Size is required")
    .refine((val) => ['XS', 'S', 'M', 'L', 'XL', 'XXL'].includes(val), {
            message: "Size must be one of: XS, S, M, L, XL, XXL.",
    }),
});