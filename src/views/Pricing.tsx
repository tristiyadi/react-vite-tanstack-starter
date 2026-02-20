import { CheckCircle } from "lucide-react";
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

const Pricing: FC = () => {
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
		<div className="min-h-screen bg-background pt-16">
			<PublicNavbar />
			<main>
				<section className="py-20">
					<div className="container">
						<div className="text-center mb-16">
							<h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight gradient-primary bg-clip-text text-transparent">
								Simple, transparent pricing
							</h1>
							<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
								Choose the plan that's right for your business. All plans
								include a 14-day free trial. Scale up or down as your needs
								change.
							</p>
						</div>

						<div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
							{pricingPlans.map((plan) => (
								<Card
									key={plan.name}
									className={`flex flex-col border-2 transition-all duration-300 ${plan.popular ? "border-primary shadow-2xl scale-105" : "border-border shadow-sm hover:shadow-lg"}`}
								>
									{plan.popular && (
										<div className="bg-primary text-primary-foreground text-center py-2 text-sm font-bold uppercase tracking-wider">
											Most Popular
										</div>
									)}
									<CardHeader className="text-center pb-8 border-b border-border/50">
										<CardTitle className="text-3xl font-bold">
											{plan.name}
										</CardTitle>
										<CardDescription className="text-base mt-2">
											{plan.description}
										</CardDescription>
										<div className="mt-8">
											<span className="text-5xl font-black text-foreground">
												{plan.price}
											</span>
											{plan.price !== "Free" && plan.price !== "Custom" && (
												<span className="text-xl text-muted-foreground">
													/mo
												</span>
											)}
										</div>
									</CardHeader>
									<CardContent className="flex-grow pt-8">
										<ul className="space-y-4 mb-8">
											{plan.features.map((feature) => (
												<li
													key={feature}
													className="flex items-center gap-3 text-sm"
												>
													<CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
													<span>{feature}</span>
												</li>
											))}
										</ul>
									</CardContent>
									<div className="p-8 pt-0">
										<Button
											className="w-full h-12 text-lg font-bold transition-all hover:scale-[1.02]"
											variant={plan.popular ? "default" : "outline"}
											asChild
										>
											<Link to="/register">
												{plan.price === "Custom"
													? "Contact Sales"
													: "Get Started Now"}
											</Link>
										</Button>
									</div>
								</Card>
							))}
						</div>
					</div>
				</section>

				{/* FAQ Small Section */}
				<section className="py-20 bg-muted/30">
					<div className="container max-w-4xl">
						<h2 className="text-3xl font-bold text-center mb-12">
							Frequently Asked Questions
						</h2>
						<div className="grid gap-8">
							<div>
								<h3 className="text-xl font-bold mb-2">
									Can I switch plans later?
								</h3>
								<p className="text-muted-foreground">
									Yes, you can upgrade or downgrade your plan at any time.
									Changes will be reflected in your next billing cycle.
								</p>
							</div>
							<div>
								<h3 className="text-xl font-bold mb-2">
									Is there a free trial?
								</h3>
								<p className="text-muted-foreground">
									Every new account comes with a fully-functional 14-day trial
									of the Professional plan. No credit card required.
								</p>
							</div>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</div>
	);
};

export default Pricing;
