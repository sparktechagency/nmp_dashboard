import { z } from "zod";


export const isEditorContentEmpty = (html: string) => {
  const temp = document.createElement("div");
  temp.innerHTML = html;
  return temp.textContent?.trim() === "";
};

export const createProductValidationSchema = z.object({
  name: z.string({
    invalid_type_error: "name must be string",
    required_error: "Name is required",
  })
    .min(1, "Name is required")
    .trim(),
  typeId: z
    .string({
      invalid_type_error: "typeId must be a string",
      required_error: "Select a type",
    })
    .min(1, "Select a type"),
  categoryId: z
    .string({
      invalid_type_error: "category must be a string",
      required_error: "Select category",
    })
    .min(1, "Select category"),
  brandId: z
    .string({
      invalid_type_error: "brand must be a string",
      required_error: "Select Brand",
    })
    .optional(),
  flavorId: z
    .string({
      invalid_type_error: "brand must be a string",
      required_error: "Select Flavor",
    })
    .optional(),
  currentPrice: z
    .preprocess(
      (val) => (val === '' || val === undefined || val === null ? undefined : Number(val)),
      z
        .number({
          required_error: "Current price is required",
          invalid_type_error: "Current price must be a number",
        })
        .refine((val) => !isNaN(val), { message: "Current price must be a valid number" })
        .refine((val) => val > 0, { message: "Current price must be greater than 0" })
    )
  ,
  originalPrice: z
    .preprocess(
      (val) => {
        // If empty, return undefined to make it optional
        if (val === '' || val === undefined || val === null) {
          return undefined;
        }
        return Number(val);
      },
      z
        .number({
          invalid_type_error: "Original price must be a number",
        })
        .refine((val) => !isNaN(val), {
          message: "Original price must be a valid number",
        })
        .refine((val) => val >= 0, {
          message: "Original price cannot be negative",
        })
        .optional() // This makes it truly optional
    ),
  quantity: z
    .preprocess(
      (val) => (val === '' || val === undefined || val === null ? undefined : Number(val)),
      z
        .number({
          required_error: "Quantity is required",
          invalid_type_error: "Quantity must be a number",
        })
        .refine((val) => !isNaN(val), { message: "Quantity must be a valid number" })
        .refine((val) => val > 0, { message: "Quantity must be greater than 0" })
    )
  ,
  discount: z.string({
    invalid_type_error: "discount must be string"
  }).optional(),
  description: z.string({
    invalid_type_error: "Description must be string",
    required_error: "Description is required",
  })
    .min(1, "Description is required"),
  status: z.string({
    invalid_type_error: "status must be a valid string value.",
  })
    .refine((val) => ['visible', 'hidden'].includes(val), {
      message: "status must be one of: 'visible', 'hidden'",
    }).optional(),
})
  .superRefine((values, ctx) => {
    const { currentPrice, originalPrice } = values
    if (currentPrice && originalPrice && (currentPrice > originalPrice)) {
      ctx.addIssue({
        path: ["originalPrice"],
        message: "Original Price must be greater than current price",
        code: z.ZodIssueCode.custom,
      });
      ctx.addIssue({
        path: ["currentPrice"],
        message: "Current Price must be less than original price",
        code: z.ZodIssueCode.custom,
      });
    }
  });


export const updateProductValidationSchema = z.object({
  name: z.string({
    invalid_type_error: "name must be string",
    required_error: "Name is required",
  })
    .min(1, "Name is required")
    .trim(),
  typeId: z
    .string({
      invalid_type_error: "typeId must be a string",
      required_error: "Select a type",
    })
    .min(1, "Select a type"),
  categoryId: z
    .string({
      invalid_type_error: "category must be a string",
      required_error: "Select category",
    })
    .min(1, "Select category"),
  brandId: z
    .string({
      invalid_type_error: "brand must be a string",
      required_error: "Select Brand",
    })
    .optional(),
  flavorId: z
    .string({
      invalid_type_error: "brand must be a string",
      required_error: "Select Flavor",
    })
    .optional(),
  currentPrice: z
    .preprocess(
      (val) => (val === '' || val === undefined || val === null ? undefined : Number(val)),
      z
        .number({
          required_error: "Current price is required",
          invalid_type_error: "Current price must be a number",
        })
        .refine((val) => !isNaN(val), { message: "Current price must be a valid number" })
        .refine((val) => val > 0, { message: "Current price must be greater than 0" })
    )
  ,
  originalPrice: z
    .preprocess(
      (val) => {
        // If empty, return undefined to make it optional
        if (val === '' || val === undefined || val === null) {
          return undefined;
        }
        return Number(val);
      },
      z
        .number({
          invalid_type_error: "Original price must be a number",
        })
        .refine((val) => !isNaN(val), {
          message: "Original price must be a valid number",
        })
        .refine((val) => val >= 0, {
          message: "Original price cannot be negative",
        })
        .optional() // This makes it truly optional
    ),
  quantity: z
    .preprocess(
      (val) => (val === '' || val === undefined || val === null ? undefined : Number(val)),
      z
        .number({
          required_error: "Quantity is required",
          invalid_type_error: "Quantity must be a number",
        })
        .refine((val) => !isNaN(val), { message: "Quantity must be a valid number" })
        .refine((val) => val > 0, { message: "Quantity must be greater than 0" })
    )
  ,
  discount: z.string({
    invalid_type_error: "discount must be string"
  }).optional(),
  description: z.string({
    invalid_type_error: "Description must be string",
    required_error: "Description is required",
  })
  .min(1, "Description is required")

}).superRefine((values, ctx) => {
  const { currentPrice, originalPrice } = values
  if (currentPrice && originalPrice && (currentPrice > originalPrice)) {
    ctx.addIssue({
      path: ["originalPrice"],
      message: "Original Price must be greater than current price",
      code: z.ZodIssueCode.custom,
    });
    ctx.addIssue({
      path: ["currentPrice"],
      message: "Current Price must be less than original price",
      code: z.ZodIssueCode.custom,
    });
  }
});

