import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
	const footerLinks = {
		product: [
			{ label: "Features", href: "#features" },
			{ label: "Pricing", href: "#pricing" },
			{ label: "Changelog", href: "#" },
			{ label: "Roadmap", href: "#" },
		],
		company: [
			{ label: "About", href: "#about" },
			{ label: "Blog", href: "#" },
			{ label: "Careers", href: "#" },
			{ label: "Contact", href: "#contact" },
		],
		resources: [
			{ label: "Documentation", href: "#" },
			{ label: "Help Center", href: "#" },
			{ label: "API Reference", href: "#" },
			{ label: "Community", href: "#" },
		],
		legal: [
			{ label: "Privacy Policy", href: "#" },
			{ label: "Terms of Service", href: "#" },
			{ label: "Cookie Policy", href: "#" },
		],
	};

	const socialLinks = [
		{
			icon: Twitter,
			href: "https://twitter.com/ekotristiyadi",
			label: "Twitter",
		},
		{ icon: Github, href: "https://github.com/tristiyadi", label: "GitHub" },
		{
			icon: Linkedin,
			href: "https://linkedin.com/in/ekotristiyadi",
			label: "LinkedIn",
		},
		{ icon: Mail, href: "mailto:eko@trimogo.com", label: "Email" },
	];

	return (
		<footer className="border-t border-border bg-card">
			<div className="container py-12 md:py-16">
				<div className="grid grid-cols-2 md:grid-cols-5 gap-8">
					{/* Brand */}
					<div className="col-span-2 md:col-span-1">
						<Link to="/" className="flex items-center gap-2 mb-4">
							<div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
								<span className="text-white font-bold text-sm">YB</span>
							</div>
							<span className="text-lg font-bold text-foreground">
								YourBrand
							</span>
						</Link>
						<p className="text-sm text-muted-foreground mb-4">
							Building the future of business management, one feature at a time.
						</p>
						<div className="flex gap-3">
							{socialLinks.map((social) => (
								<a
									key={social.label}
									href={social.href}
									className="h-9 w-9 flex items-center justify-center rounded-lg bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
									aria-label={social.label}
								>
									<social.icon className="h-4 w-4" />
								</a>
							))}
						</div>
					</div>

					{/* Links */}
					<div>
						<h4 className="font-semibold text-foreground mb-4">Product</h4>
						<ul className="space-y-3">
							{footerLinks.product.map((link) => (
								<li key={link.label}>
									<a
										href={link.href}
										className="text-sm text-muted-foreground hover:text-foreground transition-colors"
									>
										{link.label}
									</a>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h4 className="font-semibold text-foreground mb-4">Company</h4>
						<ul className="space-y-3">
							{footerLinks.company.map((link) => (
								<li key={link.label}>
									<a
										href={link.href}
										className="text-sm text-muted-foreground hover:text-foreground transition-colors"
									>
										{link.label}
									</a>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h4 className="font-semibold text-foreground mb-4">Resources</h4>
						<ul className="space-y-3">
							{footerLinks.resources.map((link) => (
								<li key={link.label}>
									<a
										href={link.href}
										className="text-sm text-muted-foreground hover:text-foreground transition-colors"
									>
										{link.label}
									</a>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h4 className="font-semibold text-foreground mb-4">Legal</h4>
						<ul className="space-y-3">
							{footerLinks.legal.map((link) => (
								<li key={link.label}>
									<a
										href={link.href}
										className="text-sm text-muted-foreground hover:text-foreground transition-colors"
									>
										{link.label}
									</a>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
					<p className="text-sm text-muted-foreground">
						© 2025 YourBrand. All rights reserved.
					</p>
					<p className="text-sm text-muted-foreground">
						Made with ❤️ for businesses everywhere
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
