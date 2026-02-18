import * as z from "zod";

export const loginSchema = z.object({
	email: z.string().min(1, "Email is required").email("Invalid email address"),
	password: z.string().min(1, "Password is required"),
	remember: z.boolean().optional(),
});

export type LoginValues = z.infer<typeof loginSchema>;

export const registerSchema = z
	.object({
		name: z.string().min(2, "Name must be at least 2 characters"),
		email: z
			.string()
			.min(1, "Email is required")
			.email("Invalid email address"),
		username: z
			.string()
			.min(3, "Username must be at least 3 characters")
			.optional()
			.or(z.literal("")),
		password: z.string().min(8, "Password must be at least 8 characters"),
		confirmPassword: z.string().min(1, "Please confirm your password"),
		terms: z.boolean().refine((val) => val === true, {
			message: "You must accept the terms and conditions",
		}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export type RegisterValues = z.infer<typeof registerSchema>;
