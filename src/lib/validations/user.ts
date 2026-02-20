import * as z from "zod";

const userObject = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	email: z.string().min(1, "Email is required").email("Invalid email address"),
	username: z
		.string()
		.min(3, "Username must be at least 3 characters")
		.optional()
		.or(z.literal("")),
	role_id: z.number().int().positive("Please select a role"),
	status: z.enum(["active", "inactive"]),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters")
		.optional()
		.or(z.literal("")),
	password_confirmation: z.string().optional().or(z.literal("")),
});

const passwordMatchRefinement = (data: {
	password?: string;
	password_confirmation?: string;
}) => {
	if (data.password && data.password !== data.password_confirmation) {
		return false;
	}
	return true;
};

const passwordMatchParams = {
	message: "Passwords do not match",
	path: ["password_confirmation"],
};

export const userSchema = userObject.refine(
	passwordMatchRefinement,
	passwordMatchParams,
);

export type UserValues = z.infer<typeof userSchema>;

export const createUserSchema = userObject
	.extend({
		password: z.string().min(8, "Password must be at least 8 characters"),
		password_confirmation: z.string().min(1, "Please confirm your password"),
	})
	.refine(passwordMatchRefinement, passwordMatchParams);
