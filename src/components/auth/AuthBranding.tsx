import { Link } from "react-router-dom";

interface AuthBrandingProps {
	title?: string;
	subtitle?: string;
	description?: string;
	footerText?: string;
	stats?: { label: string; value: string }[];
}

export const AuthBranding = ({
	title = "ET-Admin",
	subtitle = "Welcome to your professional workspace",
	description = "Manage your business with our powerful and intuitive dashboard. Access all your data, analytics, and tools in one place.",
	footerText = "© 2024 ET-Admin. All rights reserved.",
	stats,
}: AuthBrandingProps) => {
	return (
		<div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 relative overflow-hidden">
			<div className="absolute inset-0 bg-black/20" />
			<div className="relative z-10 flex flex-col justify-between p-12 text-white">
				<div>
					<Link
						to="/"
						className="inline-block hover:opacity-80 transition-opacity"
					>
						<h1 className="text-3xl font-bold">{title}</h1>
					</Link>
				</div>
				<div className="space-y-6">
					<h2 className="text-4xl font-bold leading-tight">
						{subtitle.split("\n").map((line) => (
							<span key={line}>
								{line}
								<br />
							</span>
						))}
					</h2>
					<p className="text-white/80 text-lg max-w-md">{description}</p>
					{stats && stats.length > 0 && (
						<div className="flex items-center gap-8 pt-4">
							{stats.map((stat) => (
								<div key={stat.label}>
									<div className="text-3xl font-bold">{stat.value}</div>
									<div className="text-white/60">{stat.label}</div>
								</div>
							))}
						</div>
					)}
				</div>
				<div className="flex items-center gap-4 text-sm text-white/60">
					<span>{footerText}</span>
				</div>
			</div>
			{/* Decorative circles */}
			<div className="absolute -right-32 -top-32 w-96 h-96 rounded-full bg-white/10" />
			<div className="absolute -right-16 top-1/2 w-64 h-64 rounded-full bg-white/5" />
		</div>
	);
};
