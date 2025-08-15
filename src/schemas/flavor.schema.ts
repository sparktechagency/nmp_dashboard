/* eslint-disable no-useless-escape */

import z from "zod";


export const flavorSchema = z.object({
  name: z
    .string({
      invalid_type_error: "Title must be string",
      required_error: "Title is required",
    })
    .min(1, "Title is required")
    .trim()
    .regex(/^[^0-9]*$/, {
      message: "Title cannot contain numbers",
    })
    .regex(/^[^~!@#$%\^*\+\?><=;:"]*$/, {
      message: 'Title cannot contain special characters: ~ ! @ # $ % ^ * + ? > < = ; : "',
    }),
});

