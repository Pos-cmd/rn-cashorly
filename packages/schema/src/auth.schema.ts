import z from "zod"

export const signUpSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Full name is required" })
    .min(2, { message: "Name must be at least 2 characters long" }),
  email: z
    .email(
      "Your email address is incomplete. Make surr it follow the correct format with a valid domain. For example, john@example.com"
    )
    .trim()
    .min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" }),
})

export const signInSchema = z.object({
  email: z
    .email(
      "Enter a valid email address. For example, john@example.com"
    )
    .trim()
    .min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" }),
})
