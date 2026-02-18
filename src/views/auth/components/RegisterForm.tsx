import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type RegisterValues, registerSchema } from "@/lib/validations/auth";

interface ValidationErrors {
	[key: string]: string[];
}

interface RegisterFormProps {
	onSubmit: (data: RegisterValues) => void;
	isLoading: boolean;
	errors: ValidationErrors;
}

export const RegisterForm = ({
	onSubmit,
	isLoading,
	errors: apiErrors,
}: RegisterFormProps) => {
	const [showPassword, setShowPassword] = useState(false);

	const form = useForm<RegisterValues>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: "",
			email: "",
			username: "",
			password: "",
			confirmPassword: "",
			terms: false,
		},
	});

	const handleSubmit = (values: RegisterValues) => {
		onSubmit(values);
	};

	return (
		<Card className="border-0 shadow-lg">
			<CardContent className="pt-6">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="space-y-4"
					>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Full name</FormLabel>
									<div className="relative">
										<User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
										<FormControl>
											<Input
												{...field}
												placeholder="John Doe"
												className="pl-10"
											/>
										</FormControl>
									</div>
									<FormMessage />
									{apiErrors.name && (
										<p className="text-sm font-medium text-destructive">
											{apiErrors.name[0]}
										</p>
									)}
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username (Optional)</FormLabel>
									<div className="relative">
										<User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
										<FormControl>
											<Input
												{...field}
												placeholder="johndoe"
												className="pl-10"
											/>
										</FormControl>
									</div>
									<FormMessage />
									{apiErrors.username && (
										<p className="text-sm font-medium text-destructive">
											{apiErrors.username[0]}
										</p>
									)}
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<div className="relative">
										<Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
										<FormControl>
											<Input
												{...field}
												type="email"
												placeholder="name@example.com"
												className="pl-10"
											/>
										</FormControl>
									</div>
									<FormMessage />
									{apiErrors.email && (
										<p className="text-sm font-medium text-destructive">
											{apiErrors.email[0]}
										</p>
									)}
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<div className="relative">
										<Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
										<FormControl>
											<Input
												{...field}
												type={showPassword ? "text" : "password"}
												placeholder="Create a strong password"
												className="pl-10 pr-10"
											/>
										</FormControl>
										<button
											type="button"
											onClick={() => setShowPassword(!showPassword)}
											className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
										>
											{showPassword ? (
												<EyeOff className="h-4 w-4" />
											) : (
												<Eye className="h-4 w-4" />
											)}
										</button>
									</div>
									<FormMessage />
									{apiErrors.password && (
										<p className="text-sm font-medium text-destructive">
											{apiErrors.password[0]}
										</p>
									)}
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="confirmPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirm password</FormLabel>
									<div className="relative">
										<Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
										<FormControl>
											<Input
												{...field}
												type="password"
												placeholder="Confirm your password"
												className="pl-10"
											/>
										</FormControl>
									</div>
									<FormMessage />
									{apiErrors.confirmPassword && (
										<p className="text-sm font-medium text-destructive">
											{apiErrors.confirmPassword[0]}
										</p>
									)}
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="terms"
							render={({ field }) => (
								<FormItem>
									<div className="flex items-start space-x-2 pt-2">
										<FormControl>
											<Checkbox
												checked={field.value}
												onCheckedChange={field.onChange}
												className="mt-1"
											/>
										</FormControl>
										<FormLabel className="text-sm font-normal cursor-pointer leading-relaxed">
											I agree to the{" "}
											<Link
												to="/terms"
												className="text-primary hover:underline"
											>
												Terms of Service
											</Link>{" "}
											and{" "}
											<Link
												to="/privacy"
												className="text-primary hover:underline"
											>
												Privacy Policy
											</Link>
										</FormLabel>
									</div>
									<FormMessage />
									{apiErrors.terms && (
										<p className="text-sm font-medium text-destructive">
											{apiErrors.terms[0]}
										</p>
									)}
								</FormItem>
							)}
						/>

						<Button type="submit" className="w-full" disabled={isLoading}>
							{isLoading ? (
								<span className="flex items-center gap-2">
									<svg
										className="animate-spin h-4 w-4"
										viewBox="0 0 24 24"
										role="img"
										aria-label="Loading"
									>
										<title>Loading</title>
										<circle
											className="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											strokeWidth="4"
											fill="none"
										/>
										<path
											className="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
										/>
									</svg>
									Creating account...
								</span>
							) : (
								<span className="flex items-center gap-2">
									Create account <ArrowRight className="h-4 w-4" />
								</span>
							)}
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};
