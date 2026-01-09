import {
	ArrowRight,
	BarChart3,
	CheckCircle,
	Globe,
	HeadphonesIcon,
	Shield,
	Users,
	Zap,
} from "lucide-react";
import type { FC } from "react";
import { Link } from "react-router-dom";
import Footer from "@/components/layout/Footer";
import PublicNavbar from "@/components/layout/PublicNavbar";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const Home: FC = () => {
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

	const stats = [
		{ value: "10K+", label: "Active Users" },
		{ value: "99.9%", label: "Uptime SLA" },
		{ value: "50M+", label: "Records Managed" },
		{ value: "150+", label: "Countries" },
	];

	const pricingPlans = [
		{
			name: "Starter",
			price: "Free",
			description: "Perfect for trying out our platform",
			features: [
				"Up to 3 team members",
				"Basic analytics",
				"Email support",
				"1GB storage",
			],
			popular: false,
		},
		{
			name: "Professional",
			price: "$29",
			description: "Best for growing businesses",
			features: [
				"Unlimited team members",
				"Advanced analytics",
				"Priority support",
				"100GB storage",
				"API access",
				"Custom integrations",
			],
			popular: true,
		},
		{
			name: "Enterprise",
			price: "Custom",
			description: "For large scale operations",
			features: [
				"Everything in Pro",
				"Dedicated account manager",
				"Custom SLA",
				"Unlimited storage",
				"SSO & SAML",
				"On-premise option",
			],
			popular: false,
		},
	];

	return (
		<div className="min-h-screen bg-background">
			<PublicNavbar />

			{/* Hero Section */}
			<section className="relative overflow-hidden py-20 md:py-32">
				<div className="absolute inset-0 -z-10">
					<div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
					<div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
				</div>

				<div className="container text-center">
					<div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8 animate-fade-in">
						<Zap className="h-4 w-4" />
						<span>New: AI-powered insights now available</span>
					</div>

					<h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight animate-fade-in">
						Manage Your Business
						<br />
						<span className="text-primary">Smarter & Faster</span>
					</h1>

					<p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in">
						The all-in-one platform for modern businesses. Streamline
						operations, boost productivity, and scale with confidence.
					</p>

					<div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
						<Button size="lg" asChild>
							<Link to="/register">
								Register <ArrowRight className="ml-2 h-4 w-4" />
							</Link>
						</Button>
						<Button size="lg" variant="outline" asChild>
							<Link to="/login">Login</Link>
						</Button>
					</div>

					<div className="mt-12 flex flex-wrap justify-center gap-8">
						{stats.map((stat) => (
							<div key={stat.label} className="text-center animate-fade-in">
								<div className="text-3xl font-bold text-foreground">
									{stat.value}
								</div>
								<div className="text-sm text-muted-foreground">
									{stat.label}
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section id="features" className="py-20 bg-muted/30">
				<div className="container">
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
							Everything you need to succeed
						</h2>
						<p className="text-muted-foreground max-w-2xl mx-auto">
							Powerful features designed to help you manage, analyze, and grow
							your business efficiently.
						</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						{features.map((feature) => (
							<Card
								key={feature.title}
								className="border-0 shadow-lg hover:shadow-xl transition-shadow"
							>
								<CardHeader>
									<div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
										<feature.icon className="h-6 w-6 text-primary" />
									</div>
									<CardTitle className="text-xl">{feature.title}</CardTitle>
									<CardDescription>{feature.description}</CardDescription>
								</CardHeader>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Pricing Section */}
			<section id="pricing" className="py-20">
				<div className="container">
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
							Simple, transparent pricing
						</h2>
						<p className="text-muted-foreground max-w-2xl mx-auto">
							Choose the plan that's right for your business. All plans include
							a 14-day free trial.
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
						{pricingPlans.map((plan) => (
							<Card
								key={plan.name}
								className={`border-2 transition-all ${plan.popular ? "border-primary shadow-xl scale-105" : "border-border"}`}
							>
								{plan.popular && (
									<div className="bg-primary text-primary-foreground text-center py-2 text-sm font-medium">
										Most Popular
									</div>
								)}
								<CardHeader className="text-center">
									<CardTitle className="text-2xl">{plan.name}</CardTitle>
									<CardDescription>{plan.description}</CardDescription>
									<div className="mt-4">
										<span className="text-4xl font-bold text-foreground">
											{plan.price}
										</span>
										{plan.price !== "Free" && plan.price !== "Custom" && (
											<span className="text-muted-foreground">/month</span>
										)}
									</div>
								</CardHeader>
								<CardContent>
									<ul className="space-y-3 mb-6">
										{plan.features.map((feature) => (
											<li
												key={feature}
												className="flex items-center gap-2 text-sm"
											>
												<CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
												<span>{feature}</span>
											</li>
										))}
									</ul>
									<Button
										className="w-full"
										variant={plan.popular ? "default" : "outline"}
										asChild
									>
										<Link to="/register">
											{plan.price === "Custom"
												? "Contact Sales"
												: "Get Started"}
										</Link>
									</Button>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 gradient-primary relative overflow-hidden">
				<div className="absolute inset-0 bg-black/20" />
				<div className="container relative z-10 text-center text-white">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						Ready to transform your business?
					</h2>
					<p className="text-white/80 max-w-2xl mx-auto mb-8">
						Join thousands of businesses that trust us with their operations.
						Start your free trial today—no credit card required.
					</p>
					<Button size="lg" variant="secondary" asChild>
						<Link to="/register">
							Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
						</Link>
					</Button>
				</div>
			</section>

			<Footer />
		</div>
	);
};

export default Home;
