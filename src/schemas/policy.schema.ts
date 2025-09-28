import { z } from "zod";


export const isEditorContentEmpty = (html: string) => {
  const temp = document.createElement("div");
  temp.innerHTML = html;
  return temp.textContent?.trim() === "";
};

export const policySchema = z.object({
  description:
    z
      .string({
        invalid_type_error: "Description must be string",
        required_error: "Description is required",
      })
      .min(1, "Description is required")
});
