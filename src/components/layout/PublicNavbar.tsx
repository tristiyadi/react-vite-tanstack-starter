import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";

const PublicNavbar = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

				{/* Desktop Navigation */}
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
					<Button variant="ghost" asChild>
						<Link to="/login">Sign in</Link>
					</Button>
					<Button asChild>
						<Link to="/register">Get Started</Link>
					</Button>
				</div>

				{/* Mobile Menu Button */}
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

			{/* Mobile Menu */}
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
							<Button variant="outline" asChild>
								<Link to="/login">Sign in</Link>
							</Button>
							<Button asChild>
								<Link to="/register">Get Started</Link>
							</Button>
						</div>
					</nav>
				</div>
			)}
		</header>
	);
};

export default PublicNavbar;
