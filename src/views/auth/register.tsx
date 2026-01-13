import { ArrowRight, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/useToast";
import { useRegister } from "../../hooks/auth/useAuth";

interface ValidationErrors {
	[key: string]: string[];
}

const Register = () => {
	const navigate = useNavigate();
	const { mutate, isPending: isLoading } = useRegister();

	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		username: "",
		password: "",
		confirmPassword: "",
		terms: false,
	});
	const [errors, setErrors] = useState<ValidationErrors>({});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (formData.password !== formData.confirmPassword) {
			setErrors({
				password_confirmation: ["Passwords Confirmation do not match"],
			});
			toast({
				title: "Error",
				description: "Passwords Confirmation do not match",
				variant: "destructive",
			});
			return;
		}

		if (!formData.terms) {
			setErrors({
				terms: ["Please accept the terms and conditions"],
			});
			toast({
				title: "Error",
				description: "Please accept the terms and conditions",
				variant: "destructive",
			});
			return;
		}

		// Call the register mutation
		mutate(
			{
				name: formData.name,
				email: formData.email,
				username: formData.username || undefined,
				password: formData.password,
				password_confirmation: formData.confirmPassword,
			},
			{
				onSuccess: () => {
					navigate("/login");
				},
				onError: (error: any) => {
					const response = error.response?.data;
					const status = error.response?.status;

					// reset error
					setErrors({});

					// VALIDATION ERROR (422)
					if (status === 422 && response?.data) {
						setErrors(response.data);
						toast({
							title: "Error",
							description: "Please check the form for errors",
							variant: "destructive",
						});
						return;
					}

					// EMAIL DUPLICATE (409)
					if (status === 409 && response?.message) {
						setErrors({
							email: [response.message],
						});
						toast({
							title: "Error",
							description: "Email already taken by another account",
							variant: "destructive",
						});
						return;
					}
					toast({
						title: "Account created!",
						description:
							"Welcome aboard. Check your email to verify your account.",
					});
				},
			},
		);
	};

	return (
		<div className="min-h-screen flex">
			{/* Left Side - Branding */}
			<div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 relative overflow-hidden">
				<div className="absolute inset-0 bg-black/20" />
				<div className="relative z-10 flex flex-col justify-between p-12 text-white">
					<div>
						<h1 className="text-3xl font-bold">YourBrand</h1>
					</div>
					<div className="space-y-6">
						<h2 className="text-4xl font-bold leading-tight">
							Start your journey
							<br />
							with us today
						</h2>
						<p className="text-white/80 text-lg max-w-md">
							Join thousands of businesses that trust us with their data
							management and analytics needs.
						</p>
						<div className="flex items-center gap-8 pt-4">
							<div>
								<div className="text-3xl font-bold">10K+</div>
								<div className="text-white/60">Active users</div>
							</div>
							<div>
								<div className="text-3xl font-bold">99.9%</div>
								<div className="text-white/60">Uptime</div>
							</div>
							<div>
								<div className="text-3xl font-bold">24/7</div>
								<div className="text-white/60">Support</div>
							</div>
						</div>
					</div>
					<div className="flex items-center gap-4 text-sm text-white/60">
						<span>© 2024 YourBrand. All rights reserved.</span>
					</div>
				</div>
				<div className="absolute -right-32 -top-32 w-96 h-96 rounded-full bg-white/10" />
				<div className="absolute -right-16 top-1/2 w-64 h-64 rounded-full bg-white/5" />
			</div>

			{/* Right Side - Register Form */}
			<div className="flex-1 flex items-center justify-center p-8 bg-background">
				<div className="absolute top-4 right-4">
					<ThemeToggle />
				</div>

				<div className="w-full max-w-md space-y-8">
					<div className="text-center lg:text-left">
						<h2 className="text-2xl font-bold text-foreground">
							Create your account
						</h2>
						<p className="mt-2 text-muted-foreground">
							Already have an account?{" "}
							<Link
								to="/login"
								className="text-primary hover:underline font-medium"
							>
								Sign in
							</Link>
						</p>
					</div>

					<Card className="border-0 shadow-lg">
						<CardContent className="pt-6">
							<form onSubmit={handleSubmit} className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="name">Full name</Label>
									<div className="relative">
										<User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
										<Input
											id="name"
											type="text"
											placeholder="John Doe"
											className="pl-10"
											value={formData.name}
											onChange={(e) =>
												setFormData({ ...formData, name: e.target.value })
											}
											required
										/>
									</div>
									{errors.name && (
										<div className="text-sm text-red-500">{errors.name[0]}</div>
									)}
								</div>

								<div className="space-y-2">
									<Label htmlFor="username">Username (Optional)</Label>
									<div className="relative">
										<User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
										<Input
											id="username"
											type="text"
											placeholder="johndoe"
											className="pl-10"
											value={formData.username}
											onChange={(e) =>
												setFormData({ ...formData, username: e.target.value })
											}
										/>
									</div>
									{errors.username && (
										<div className="text-sm text-red-500">
											{errors.username[0]}
										</div>
									)}
								</div>

								<div className="space-y-2">
									<Label htmlFor="email">Work email</Label>
									<div className="relative">
										<Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
										<Input
											id="email"
											type="email"
											placeholder="name@company.com"
											className="pl-10"
											value={formData.email}
											onChange={(e) =>
												setFormData({ ...formData, email: e.target.value })
											}
											required
										/>
									</div>
									{errors.email && (
										<div className="text-sm text-red-500">
											{errors.email[0]}
										</div>
									)}
								</div>

								<div className="space-y-2">
									<Label htmlFor="password">Password</Label>
									<div className="relative">
										<Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
										<Input
											id="password"
											type={showPassword ? "text" : "password"}
											placeholder="Create a strong password"
											className="pl-10 pr-10"
											value={formData.password}
											onChange={(e) =>
												setFormData({ ...formData, password: e.target.value })
											}
											required
										/>
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
									{errors.password && (
										<div className="text-sm text-red-500">
											{errors.password[0]}
										</div>
									)}
								</div>

								<div className="space-y-2">
									<Label htmlFor="confirmPassword">Confirm password</Label>
									<div className="relative">
										<Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
										<Input
											id="confirmPassword"
											type="password"
											placeholder="Confirm your password"
											className="pl-10"
											value={formData.confirmPassword}
											onChange={(e) =>
												setFormData({
													...formData,
													confirmPassword: e.target.value,
												})
											}
											required
										/>
									</div>
									{errors.confirmPassword && (
										<div className="text-sm text-red-500">
											{errors.confirmPassword[0]}
										</div>
									)}
								</div>

								<div className="flex items-start space-x-2 pt-2">
									<Checkbox
										id="terms"
										checked={formData.terms}
										onCheckedChange={(checked) =>
											setFormData({ ...formData, terms: checked as boolean })
										}
										className="mt-1"
									/>
									<Label
										htmlFor="terms"
										className="text-sm font-normal cursor-pointer leading-relaxed"
									>
										I agree to the{" "}
										<Link to="/terms" className="text-primary hover:underline">
											Terms of Service
										</Link>{" "}
										and{" "}
										<Link
											to="/privacy"
											className="text-primary hover:underline"
										>
											Privacy Policy
										</Link>
									</Label>
								</div>
								{errors.terms && (
									<div className="text-sm text-red-500">{errors.terms[0]}</div>
								)}

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
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default Register;
