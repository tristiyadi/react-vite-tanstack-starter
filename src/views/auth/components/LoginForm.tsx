import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
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
import { type LoginValues, loginSchema } from "@/lib/validations/auth";

interface ValidationErrors {
	[key: string]: string[];
}

interface LoginFormProps {
	onSubmit: (data: LoginValues) => void;
	isLoading: boolean;
	errors: ValidationErrors;
}

export const LoginForm = ({
	onSubmit,
	isLoading,
	errors: apiErrors,
}: LoginFormProps) => {
	const [showPassword, setShowPassword] = useState(false);

	const form = useForm<LoginValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
			remember: false,
		},
	});

	const handleSubmit = (values: LoginValues) => {
		onSubmit(values);
	};

	return (
		<Card className="border-0 shadow-lg">
			<CardContent className="pt-6">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="space-y-5"
					>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email address</FormLabel>
									<div className="relative">
										<Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
										<FormControl>
											<Input
												{...field}
												type="email"
												placeholder="name@company.com"
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
									<div className="flex items-center justify-between">
										<FormLabel>Password</FormLabel>
										<Link
											to="/reset-password"
											className="text-sm text-primary hover:underline"
										>
											Forgot password?
										</Link>
									</div>
									<div className="relative">
										<Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
										<FormControl>
											<Input
												{...field}
												type={showPassword ? "text" : "password"}
												placeholder="Enter your password"
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
							name="remember"
							render={({ field }) => (
								<FormItem className="flex flex-row items-start space-x-2 space-y-0">
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<div className="space-y-1 leading-none">
										<FormLabel className="text-sm font-normal cursor-pointer">
											Remember me for 30 days
										</FormLabel>
									</div>
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
									Signing in...
								</span>
							) : (
								<span className="flex items-center gap-2">
									Sign in <ArrowRight className="h-4 w-4" />
								</span>
							)}
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};
