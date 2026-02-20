import {
	BarChart3,
	Globe,
	HeadphonesIcon,
	Shield,
	Users,
	Zap,
} from "lucide-react";
import type { FC } from "react";
import Footer from "@/components/layout/Footer";
import PublicNavbar from "@/components/layout/PublicNavbar";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const Features: FC = () => {
	const features = [
		{
			icon: BarChart3,
			title: "Advanced Analytics",
			description:
				"Get deep insights into your business metrics with powerful analytics and real-time reporting.",
		},
		{
			icon: Shield,
			title: "Enterprise Security",
			description:
				"Bank-level encryption and security protocols to keep your data safe and compliant.",
		},
		{
			icon: Zap,
			title: "Lightning Fast",
			description:
				"Optimized performance ensures your team never waits. Speed is our priority.",
		},
		{
			icon: Users,
			title: "Team Collaboration",
			description:
				"Work together seamlessly with real-time updates and role-based permissions.",
		},
		{
			icon: Globe,
			title: "Global Scale",
			description:
				"Built for businesses of all sizes, from startups to Fortune 500 companies.",
		},
		{
			icon: HeadphonesIcon,
			title: "24/7 Support",
			description:
				"Our dedicated support team is always ready to help you succeed.",
		},
	];

	return (
		<div className="min-h-screen bg-background pt-16">
			<PublicNavbar />
			<main>
				<section className="py-20 bg-muted/30">
					<div className="container">
						<div className="text-center mb-16">
							<h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight gradient-primary bg-clip-text text-transparent">
								Everything you need to succeed
							</h1>
							<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
								Powerful features designed to help you manage, analyze, and grow
								your business efficiently. Our platform scales with your
								ambition.
							</p>
						</div>

						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
							{features.map((feature) => (
								<Card
									key={feature.title}
									className="border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
								>
									<CardHeader>
										<div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
											<feature.icon className="h-8 w-8 text-primary" />
										</div>
										<CardTitle className="text-2xl">{feature.title}</CardTitle>
										<CardDescription className="text-base">
											{feature.description}
										</CardDescription>
									</CardHeader>
									<CardContent>
										<p className="text-sm text-muted-foreground">
											Learn more about how our {feature.title.toLowerCase()} can
											transform your workflow and drive results for your entire
											team.
										</p>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</div>
	);
};

export default Features;
