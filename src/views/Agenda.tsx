import type { FC } from "react";
import PublicNavbar from "@/components/layout/PublicNavbar";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight } from "lucide-react";

const Agenda: FC = () => {
	const blogPosts = [
		{
			id: 1,
			title: "The Future of Enterprise Management",
			description:
				"How AI and cloud computing are reshaping the way businesses look at their data.",
			author: "Sarah Johnson",
			date: "Feb 20, 2024",
			category: "Technology",
			image:
				"https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2672&auto=format&fit=crop",
		},
		{
			id: 2,
			title: "Maximizing Team Efficiency",
			description:
				"Practical tips for using collaborative tools to boost productivity in small teams.",
			author: "Michael Chen",
			date: "Feb 18, 2024",
			category: "Business",
			image:
				"https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop",
		},
		{
			id: 3,
			title: "State of Corporate Security 2024",
			description:
				"A deep dive into the latest security trends and how organizations are protecting their assets.",
			author: "David Miller",
			date: "Feb 15, 2024",
			category: "Security",
			image:
				"https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2670&auto=format&fit=crop",
		},
	];

	return (
		<div className="min-h-screen bg-background pt-16">
			<PublicNavbar />
			<main>
				<section className="py-20">
					<div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent -z-10" />
					<div className="container text-center">
						<h1 className="text-4xl lg:text-6xl font-bold mb-6 gradient-primary bg-clip-text text-transparent">
							Company Agenda & Blog
						</h1>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
							Stay up to date with our latest news, technology insights, and
							corporate updates.
						</p>
					</div>
				</section>

				<section className="pb-20">
					<div className="container">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{blogPosts.map((post) => (
								<Card
									key={post.id}
									className="overflow-hidden border-border/50 group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-background/50 backdrop-blur-sm"
								>
									<div className="aspect-video overflow-hidden">
										<img
											src={post.image}
											alt={post.title}
											className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
										/>
									</div>
									<CardHeader className="space-y-4">
										<div className="flex items-center gap-4">
											<span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">
												{post.category}
											</span>
										</div>
										<CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors leading-tight">
											{post.title}
										</CardTitle>
										<CardDescription className="text-base line-clamp-3">
											{post.description}
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="flex flex-col gap-4 pt-4 border-t border-border/50">
											<div className="flex items-center justify-between text-sm text-muted-foreground">
												<div className="flex items-center gap-2">
													<User className="h-4 w-4" />
													{post.author}
												</div>
												<div className="flex items-center gap-2">
													<Calendar className="h-4 w-4" />
													{post.date}
												</div>
											</div>
											<Button
												variant="ghost"
												className="w-full justify-between group/btn text-primary hover:text-primary hover:bg-primary/5 font-bold"
												asChild
											>
												<Link to={`/agenda/${post.id}`}>
													Read Full Article
													<ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
												</Link>
											</Button>
										</div>
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

export default Agenda;
