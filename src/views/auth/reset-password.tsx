import { ArrowLeft, ArrowRight, CheckCircle, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/useToast";

const ForgotPassword = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [email, setEmail] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		setTimeout(() => {
			setIsLoading(false);
			setIsSubmitted(true);
			toast({
				title: "Email sent!",
				description: "Check your inbox for password reset instructions.",
			});
		}, 1500);
	};

	return (
		<div className="min-h-screen flex">
			{/* Left Side - Branding */}
			<div className="hidden lg:flex lg:w-1/2 gradient-primary relative overflow-hidden">
				<div className="absolute inset-0 bg-black/20" />
				<div className="relative z-10 flex flex-col justify-between p-12 text-white">
					<div>
						<h1 className="text-3xl font-bold">YourBrand</h1>
					</div>
					<div className="space-y-6">
						<h2 className="text-4xl font-bold leading-tight">
							Don't worry,
							<br />
							we've got you covered
						</h2>
						<p className="text-white/80 text-lg max-w-md">
							We'll send you instructions to reset your password. Your security
							is our priority.
						</p>
					</div>
					<div className="flex items-center gap-4 text-sm text-white/60">
						<span>© 2024 YourBrand. All rights reserved.</span>
					</div>
				</div>
				<div className="absolute -right-32 -top-32 w-96 h-96 rounded-full bg-white/10" />
				<div className="absolute -right-16 top-1/2 w-64 h-64 rounded-full bg-white/5" />
			</div>

			{/* Right Side - Form */}
			<div className="flex-1 flex items-center justify-center p-8 bg-background">
				<div className="absolute top-4 right-4">
					<ThemeToggle />
				</div>

				<div className="w-full max-w-md space-y-8 animate-fade-in">
					{!isSubmitted ? (
						<>
							<div className="text-center lg:text-left">
								<h2 className="text-2xl font-bold text-foreground">
									Reset your password
								</h2>
								<p className="mt-2 text-muted-foreground">
									Enter your email address and we'll send you a link to reset
									your password.
								</p>
							</div>

							<Card className="border-0 shadow-lg">
								<CardContent className="pt-6">
									<form onSubmit={handleSubmit} className="space-y-5">
										<div className="space-y-2">
											<Label htmlFor="email">Email address</Label>
											<div className="relative">
												<Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
												<Input
													id="email"
													type="email"
													placeholder="name@company.com"
													className="pl-10"
													value={email}
													onChange={(e) => setEmail(e.target.value)}
													required
												/>
											</div>
										</div>

										<Button
											type="submit"
											className="w-full"
											disabled={isLoading}
										>
											{isLoading ? (
												<span className="flex items-center gap-2">
													<svg
														className="animate-spin h-4 w-4"
														viewBox="0 0 24 24"
													>
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
													Sending...
												</span>
											) : (
												<span className="flex items-center gap-2">
													Send reset link <ArrowRight className="h-4 w-4" />
												</span>
											)}
										</Button>
									</form>
								</CardContent>
							</Card>
						</>
					) : (
						<div className="text-center space-y-6">
							<div className="mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
								<CheckCircle className="h-8 w-8 text-success" />
							</div>
							<div>
								<h2 className="text-2xl font-bold text-foreground">
									Check your email
								</h2>
								<p className="mt-2 text-muted-foreground">
									We've sent password reset instructions to{" "}
									<strong>{email}</strong>
								</p>
							</div>
							<Card className="border-0 shadow-lg">
								<CardContent className="py-6">
									<p className="text-sm text-muted-foreground mb-4">
										Didn't receive the email? Check your spam folder or
									</p>
									<Button
										variant="outline"
										className="w-full"
										onClick={() => setIsSubmitted(false)}
									>
										Try another email address
									</Button>
								</CardContent>
							</Card>
						</div>
					)}

					<div className="text-center">
						<Link
							to="/login"
							className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
						>
							<ArrowLeft className="h-4 w-4" />
							Back to sign in
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ForgotPassword;
