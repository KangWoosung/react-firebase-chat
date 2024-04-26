/*  2024-04-25 00:30:39


*/

import { ZodObject, z } from "zod";

export const logInSchema: ZodObject<any> = z.object({
  email: z
    .string()
    .nonempty("Email address is required")
    .email({ message: "Please enter a valid email address" }),
  password: z.string().min(4, { message: "Password is longer than 3 chars" }),
});

export type LogInSchemaType = z.infer<typeof logInSchema>;

// 확장된 스키마
export const signUpSchema = logInSchema.merge(
  z.object({
    userName: z
      .string()
      .nonempty("User name is required")
      .min(4, { message: "User name is longer than 3 chars" }),
  })
);
export type SignUpSchemaType = z.infer<typeof signUpSchema>;
