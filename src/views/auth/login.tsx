import Cookies from "js-cookie";
import { Github } from "lucide-react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthBranding } from "@/components/auth/AuthBranding";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { AuthContext } from "../../context/AuthContext";
import { useLogin } from "../../hooks/auth/useAuth";
import { LoginForm } from "./components/LoginForm";
import type { LoginValues } from "@/lib/validations/auth";

interface ValidationErrors {
	[key: string]: string[];
}

const Login = () => {
	const navigate = useNavigate();
	const { mutate, isPending: isLoading } = useLogin();
	const authContext: any = useContext(AuthContext);
	const { setIsAuthenticated } = authContext;
	const [errors, setErrors] = useState<ValidationErrors>({});

	const handleLogin = (formData: LoginValues) => {
		mutate(
			{
				email: formData.email,
				password: formData.password,
			},
			{
				onSuccess: (data) => {
					Cookies.set("token", data.data.token);
					Cookies.set(
						"user",
						JSON.stringify({
							id: data.data.user.id,
							uid: data.data.user.uid,
							name: data.data.user.name,
							username: data.data.user.username,
							email: data.data.user.email,
							role_id: data.data.user.role_id,
							status: data.data.user.status,
						}),
					);
					setIsAuthenticated(true);
					navigate("/admin/dashboard");
				},
				onError: (error: any) => {
					const response = error.response?.data;
					const status = error.response?.status;

					setErrors({});

					if (status === 422 && response?.data) {
						setErrors(response.data);
						return;
					}

					if (status === 401) {
						setErrors({
							email: [response?.message || "Login failed"],
						});
						return;
					}
				},
			},
		);
	};

	return (
		<div className="min-h-screen flex">
			<AuthBranding
				subtitle="Welcome to your&#10;professional workspace"
				description="Manage your business with our powerful and intuitive dashboard. Access all your data, analytics, and tools in one place."
			/>

			<div className="flex-1 flex items-center justify-center p-8 bg-background">
				<div className="absolute top-4 right-4">
					<ThemeToggle />
				</div>

				<div className="w-full max-w-md space-y-8">
					<div className="text-center lg:text-left">
						<h2 className="text-2xl font-bold text-foreground">
							Sign in to your account
						</h2>
						<p className="mt-2 text-muted-foreground">
							Don't have an account?{" "}
							<Link
								to="/register"
								className="text-primary hover:underline font-medium"
							>
								Create one
							</Link>
						</p>
					</div>

					<LoginForm
						onSubmit={handleLogin}
						isLoading={isLoading}
						errors={errors}
					/>

					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-border" />
						</div>
						<div className="relative flex justify-center text-xs uppercase">
							<span className="bg-background px-2 text-muted-foreground">
								Or continue with
							</span>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<Button variant="outline" className="w-full">
							<svg
								className="mr-2 h-4 w-4"
								viewBox="0 0 24 24"
								role="img"
								aria-label="Google"
							>
								<title>Google</title>
								<path
									fill="currentColor"
									d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
								/>
								<path
									fill="currentColor"
									d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
								/>
								<path
									fill="currentColor"
									d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
								/>
								<path
									fill="currentColor"
									d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
								/>
							</svg>
							Google
						</Button>
						<Button variant="outline" className="w-full">
							<Github className="mr-2 h-4 w-4" />
							GitHub
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
