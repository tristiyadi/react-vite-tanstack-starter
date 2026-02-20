import type { FC } from "react";
import PublicNavbar from "@/components/layout/PublicNavbar";
import Footer from "@/components/layout/Footer";
import { Users, Target, Shield, Zap } from "lucide-react";

export const About: FC = () => {
	return (
		<div className="min-h-screen bg-background pt-16">
			<PublicNavbar />
			<main>
				<section className="py-20">
					<div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent -z-10" />
					<div className="container px-4 mx-auto text-center">
						<h1 className="text-4xl lg:text-6xl font-bold mb-6 gradient-primary bg-clip-text text-transparent">
							Our Mission is to Empower Businesses
						</h1>
						<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
							We build tools that simplify complexity and help organizations
							focus on what truly matters: their growth and their people.
						</p>
					</div>
				</section>

				<section className="py-20 bg-muted/30">
					<div className="container px-4 mx-auto">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
							<div className="p-6 bg-background rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
								<Users className="h-12 w-12 text-primary mb-4" />
								<h3 className="text-xl font-bold mb-2">People First</h3>
								<p className="text-muted-foreground">
									We believe that great software is built by great teams for
									great people.
								</p>
							</div>
							<div className="p-6 bg-background rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
								<Target className="h-12 w-12 text-primary mb-4" />
								<h3 className="text-xl font-bold mb-2">Precision</h3>
								<p className="text-muted-foreground">
									Every pixel and line of code is crafted with purpose and
									attention to detail.
								</p>
							</div>
							<div className="p-6 bg-background rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
								<Shield className="h-12 w-12 text-primary mb-4" />
								<h3 className="text-xl font-bold mb-2">Trust</h3>
								<p className="text-muted-foreground">
									Security and transparency are at the core of everything we
									build.
								</p>
							</div>
							<div className="p-6 bg-background rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
								<Zap className="h-12 w-12 text-primary mb-4" />
								<h3 className="text-xl font-bold mb-2">Innovation</h3>
								<p className="text-muted-foreground">
									We constanty push boundaries to find better ways to solve
									problems.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Team/Story Section */}
				<section className="py-20">
					<div className="container px-4 mx-auto max-w-4xl text-center">
						<h2 className="text-3xl font-bold mb-8">Our Story</h2>
						<div className="space-y-6 text-lg text-muted-foreground">
							<p>
								Founded in 2024, YourBrand started with a simple idea: that
								managing a business shouldn't be a chore. We saw founders,
								managers, and teams struggling with fragmented tools and complex
								interfaces.
							</p>
							<p>
								We decided to build a platform that brings everything
								together—analytics, user management, and core operations—into a
								single, elegant experience. Today, we're proud to help thousands
								of businesses thrive in a digital-first world.
							</p>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</div>
	);
};

export default About;
