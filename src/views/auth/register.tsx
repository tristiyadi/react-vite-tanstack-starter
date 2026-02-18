import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthBranding } from "@/components/auth/AuthBranding";
import { ThemeToggle } from "@/components/ThemeToggle";
import { toast } from "@/hooks/useToast";
import { useRegister } from "../../hooks/auth/useAuth";
import { RegisterForm } from "./components/RegisterForm";

interface ValidationErrors {
	[key: string]: string[];
}

const Register = () => {
	const navigate = useNavigate();
	const { mutate, isPending: isLoading } = useRegister();
	const [errors, setErrors] = useState<ValidationErrors>({});

	const handleRegister = (formData: any) => {
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

					setErrors({});

					if (status === 422 && response?.data) {
						setErrors(response.data);
						toast({
							title: "Error",
							description: "Please check the form for errors",
							variant: "destructive",
						});
						return;
					}

					if (status === 409 && response?.message) {
						setErrors({ email: [response.message] });
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
			<AuthBranding
				subtitle="Start your journey&#10;with us today"
				description="Join thousands of businesses that trust us with their data management and analytics needs."
				stats={[
					{ label: "Active users", value: "10K+" },
					{ label: "Uptime", value: "99.9%" },
					{ label: "Support", value: "24/7" },
				]}
			/>

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

					<RegisterForm
						onSubmit={handleRegister}
						isLoading={isLoading}
						errors={errors}
					/>
				</div>
			</div>
		</div>
	);
};

export default Register;
