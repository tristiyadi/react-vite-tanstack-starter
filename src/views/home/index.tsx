import {
	ArrowRight,
	BarChart3,
	Shield,
	Zap,
	Calendar,
	User,
} from "lucide-react";
import type { FC } from "react";
import { Link } from "react-router-dom";
import Footer from "@/components/layout/Footer";
import PublicNavbar from "@/components/layout/PublicNavbar";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

const Home: FC = () => {
	const featuresSummary = [
		{
			icon: BarChart3,
			title: "Advanced Analytics",
			description:
				"Get deep insights into your business metrics with powerful analytics.",
		},
		{
			icon: Shield,
			title: "Enterprise Security",
			description:
				"Bank-level encryption and security protocols to keep your data safe.",
		},
		{
			icon: Zap,
			title: "Lightning Fast",
			description: "Optimized performance ensures your team never waits.",
		},
	];

	const stats = [
		{ value: "10K+", label: "Active Users" },
		{ value: "99.9%", label: "Uptime SLA" },
		{ value: "50M+", label: "Records Managed" },
		{ value: "150+", label: "Countries" },
	];

	const slides = [
		{
			title: "Modern Interface",
			description:
				"Experience a sleek, intuitive design built for productivity.",
			image:
				"https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
		},
		{
			title: "Powerful Dashboard",
			description:
				"Manage all your enterprise operations from a single control plane.",
			image:
				"https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2672&auto=format&fit=crop",
		},
		{
			title: "Real-time Collaboration",
			description: "Sync with your team instantly across the globe.",
			image:
				"https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop",
		},
	];

	const recentPosts = [
		{
			id: 1,
			title: "The Future of Enterprise Management",
			author: "Sarah Johnson",
			date: "Feb 20, 2024",
			image:
				"https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
		},
		{
			id: 2,
			title: "Maximizing Team Efficiency",
			author: "Michael Chen",
			date: "Feb 18, 2024",
			image:
				"https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop",
		},
	];

	return (
		<div className="min-h-screen bg-background pt-16">
			<PublicNavbar />

			{/* Hero Section */}
			<section className="relative overflow-hidden py-20 md:py-32 border-b border-border/50">
				<div className="absolute inset-0 -z-10">
					<div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
					<div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
				</div>

				<div className="container text-center text-foreground">
					<div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8 animate-fade-in border border-primary/20">
						<Zap className="h-4 w-4" />
						<span>New: AI-powered insights now available</span>
					</div>

					<h1 className="text-4xl md:text-7xl font-extrabold mb-6 tracking-tight animate-fade-in leading-tight">
						Manage Your Business
						<br />
						<span className="bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
							Better & Faster
						</span>
					</h1>

					<p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in leading-relaxed">
						The all-in-one platform for modern businesses. Streamline
						operations, boost productivity, and scale your organization with
						absolute confidence.
					</p>

					<div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in mb-16">
						<Button
							size="lg"
							className="h-14 px-8 text-lg font-bold shadow-xl shadow-primary/20"
							asChild
						>
							<Link to="/register">
								Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
							</Link>
						</Button>
						<Button
							size="lg"
							variant="ghost"
							className="h-14 px-8 text-lg font-bold glass-morphism border border-primary/20 hover:bg-primary/10 hover:border-primary/40 text-primary transition-all shadow-xl"
							asChild
						>
							<Link to="/contact">Talk to Sales</Link>
						</Button>
					</div>

					<div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
						{stats.map((stat) => (
							<div
								key={stat.label}
								className="text-center animate-fade-in p-4 rounded-2xl bg-muted/50 border border-border/50"
							>
								<div className="text-3xl md:text-4xl font-black text-foreground mb-1">
									{stat.value}
								</div>
								<div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
									{stat.label}
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Slider Section */}
			<section className="py-24 bg-muted/20">
				<div className="container">
					<div className="text-center mb-16 px-4">
						<h2 className="text-3xl md:text-5xl font-bold mb-4">
							Visualizing Success
						</h2>
						<p className="text-muted-foreground text-lg max-w-2xl mx-auto">
							Take a look at how ET-Admin transforms complex data into
							beautiful, actionable interfaces.
						</p>
					</div>

					<Carousel className="w-full max-w-5xl mx-auto shadow-2xl rounded-3xl overflow-hidden border border-border">
						<CarouselContent>
							{slides.map((slide) => (
								<CarouselItem key={slide.title}>
									<div className="relative aspect-video group">
										<img
											src={slide.image}
											alt={slide.title}
											className="w-full h-full object-cover"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-12 text-white">
											<h3 className="text-2xl md:text-4xl font-bold mb-2">
												{slide.title}
											</h3>
											<p className="text-lg text-white/80 max-w-lg leading-relaxed">
												{slide.description}
											</p>
										</div>
									</div>
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious className="left-6 opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 text-white border-white/20 hover:bg-black/40" />
						<CarouselNext className="right-6 opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 text-white border-white/20 hover:bg-black/40" />
					</Carousel>
				</div>
			</section>

			{/* Features Preview Section */}
			<section className="py-24">
				<div className="container">
					<div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 px-4">
						<div className="max-w-xl text-foreground">
							<h2 className="text-3xl md:text-4xl font-bold mb-4">
								Built for the modern enterprise
							</h2>
							<p className="text-muted-foreground text-lg">
								Discover how our comprehensive toolset helps you manage
								complexity and focus on growth.
							</p>
						</div>
						<Button
							variant="ghost"
							className="group text-primary font-bold transition-all"
							asChild
						>
							<Link to="/features">
								Explore all features{" "}
								<ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
							</Link>
						</Button>
					</div>

					<div className="grid md:grid-cols-3 gap-8 px-4">
						{featuresSummary.map((feature) => (
							<Card
								key={feature.title}
								className="border border-border/50 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group bg-card"
							>
								<CardHeader>
									<div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
										<feature.icon className="h-8 w-8 text-primary" />
									</div>
									<CardTitle className="text-2xl font-bold">
										{feature.title}
									</CardTitle>
									<CardDescription className="text-base leading-relaxed">
										{feature.description}
									</CardDescription>
								</CardHeader>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Agenda/Blog Preview Section */}
			<section className="py-24 bg-muted/30 border-y border-border/50">
				<div className="container">
					<div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6 px-4">
						<div className="text-center md:text-left">
							<h2 className="text-3xl font-bold mb-2">Company Agenda</h2>
							<p className="text-muted-foreground">
								Keep up with our latest updates and insights.
							</p>
						</div>
						<Button variant="outline" className="font-bold gap-2" asChild>
							<Link to="/agenda">
								<Calendar className="h-4 w-4" />
								View All News
							</Link>
						</Button>
					</div>

					<div className="grid md:grid-cols-2 gap-8 px-4">
						{recentPosts.map((post) => (
							<Link
								to={`/agenda/${post.id}`}
								key={post.id}
								className="group overflow-hidden rounded-2xl border border-border/50 bg-background shadow-sm hover:shadow-xl transition-all"
							>
								<div className="flex flex-col md:flex-row">
									<div className="w-full md:w-48 h-48 overflow-hidden">
										<img
											src={post.image}
											alt={post.title}
											className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
										/>
									</div>
									<div className="p-6 flex flex-col justify-center flex-1">
										<h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
											{post.title}
										</h3>
										<div className="flex items-center gap-6 text-sm text-muted-foreground">
											<div className="flex items-center gap-2">
												<User className="h-4 w-4" />
												{post.author}
											</div>
											<div className="flex items-center gap-2">
												<Calendar className="h-4 w-4" />
												{post.date}
											</div>
										</div>
									</div>
								</div>
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-24 relative overflow-hidden">
				<div className="absolute inset-0 gradient-primary opacity-90" />
				<div className="absolute inset-0 bg-black/10" />
				<div className="container relative z-10 text-center text-white">
					<h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
						Ready to transform your workflow?
					</h2>
					<p className="text-white/80 text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
						Join 10,000+ organizations building the future with ET-Admin. Get
						started in less than 2 minutes.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button
							size="lg"
							variant="secondary"
							className="h-14 px-10 text-lg font-bold text-primary transition-all hover:scale-105 shadow-xl"
							asChild
						>
							<Link to="/register">Get Started Free</Link>
						</Button>
						<Button
							size="lg"
							variant="ghost"
							className="h-14 px-10 text-lg font-bold border-2 border-white text-white hover:bg-white hover:text-primary transition-all hover:scale-105"
							asChild
						>
							<Link to="/contact">Talk to Sales</Link>
						</Button>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
};

export default Home;
