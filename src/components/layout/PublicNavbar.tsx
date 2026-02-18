import {
	ChevronDown,
	LayoutDashboard,
	LogOut,
	Menu,
	Settings,
	User,
	X,
} from "lucide-react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AuthContext } from "@/context/AuthContext";
import { useAuthUser, useLogout } from "@/hooks/auth/useAuth";

const PublicNavbar = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const auth = useContext(AuthContext);
	const user = useAuthUser();
	const logout = useLogout();

	const isAuthenticated = auth?.isAuthenticated ?? false;

	const userInitial = user?.name
		? user.name
				.split(" ")
				.map((n) => n[0])
				.join("")
				.toUpperCase()
				.slice(0, 2)
		: "??";

	const navLinks = [
		{ label: "Features", href: "#features" },
		{ label: "Pricing", href: "#pricing" },
		{ label: "About", href: "#about" },
		{ label: "Contact", href: "#contact" },
	];

	return (
		<header className="sticky top-0 z-50 w-full glass border-b border-border/50">
			<div className="container flex h-16 items-center justify-between">
				<Link to="/" className="flex items-center gap-2">
					<div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
						<span className="text-white font-bold text-sm">YB</span>
					</div>
					<span className="text-xl font-bold text-foreground">YourBrand</span>
				</Link>

				<nav className="hidden md:flex items-center gap-8">
					{navLinks.map((link) => (
						<a
							key={link.label}
							href={link.href}
							className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
						>
							{link.label}
						</a>
					))}
				</nav>

				<div className="hidden md:flex items-center gap-3">
					<ThemeToggle />
					{isAuthenticated ? (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" className="flex items-center gap-2">
									<Avatar className="h-8 w-8">
										<AvatarFallback className="bg-primary text-primary-foreground">
											{userInitial}
										</AvatarFallback>
									</Avatar>
									<span className="font-medium">{user?.name || "User"}</span>
									<ChevronDown className="h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem asChild>
									<Link to="/admin">
										<LayoutDashboard className="mr-2 h-4 w-4" />
										Dashboard
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<User className="mr-2 h-4 w-4" />
									Profile
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Settings className="mr-2 h-4 w-4" />
									Settings
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem className="text-destructive" onClick={logout}>
									<LogOut className="mr-2 h-4 w-4" />
									Logout
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					) : (
						<>
							<Button variant="ghost" asChild>
								<Link to="/login">Sign in</Link>
							</Button>
							<Button asChild>
								<Link to="/register">Get Started</Link>
							</Button>
						</>
					)}
				</div>

				<div className="flex items-center gap-2 md:hidden">
					<ThemeToggle />
					<Button
						variant="ghost"
						size="icon"
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
					>
						{isMobileMenuOpen ? (
							<X className="h-5 w-5" />
						) : (
							<Menu className="h-5 w-5" />
						)}
					</Button>
				</div>
			</div>

			{isMobileMenuOpen && (
				<div className="md:hidden border-t border-border bg-background animate-fade-in">
					<nav className="container py-4 flex flex-col gap-3">
						{navLinks.map((link) => (
							<a
								key={link.label}
								href={link.href}
								className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
								onClick={() => setIsMobileMenuOpen(false)}
							>
								{link.label}
							</a>
						))}
						<div className="flex flex-col gap-2 pt-4 border-t border-border">
							{isAuthenticated ? (
								<>
									<Button variant="outline" asChild>
										<Link to="/admin">Dashboard</Link>
									</Button>
									<Button variant="destructive" onClick={logout}>
										Logout
									</Button>
								</>
							) : (
								<>
									<Button variant="outline" asChild>
										<Link to="/login">Sign in</Link>
									</Button>
									<Button asChild>
										<Link to="/register">Get Started</Link>
									</Button>
								</>
							)}
						</div>
					</nav>
				</div>
			)}
		</header>
	);
};

export default PublicNavbar;
