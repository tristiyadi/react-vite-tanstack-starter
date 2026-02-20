import type { FC } from "react";
import { useParams, Link } from "react-router-dom";
import PublicNavbar from "@/components/layout/PublicNavbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Share2, Bookmark } from "lucide-react";

const AgendaDetail: FC = () => {
	const { id } = useParams();

	// In a real app, this would be a fetch from an API
	const blogPosts = [
		{
			id: 1,
			title: "The Future of Enterprise Management",
			content: (
				<>
					<p className="mb-4">
						The landscape of enterprise management is undergoing a seismic
						shift. As we move deeper into 2024, the integration of Artificial
						Intelligence (AI) and cloud-native architectures is no longer a
						luxury—it's a fundamental requirement for survival.
					</p>
					<p className="mb-4">
						Artificial Intelligence is transforming decision-making processes by
						providing real-time insights that were previously impossible to
						aggregate. From predictive maintenance in manufacturing to automated
						threat detection in cybersecurity, AI is the engine driving the
						modern enterprise.
					</p>
					<h2 className="text-2xl font-bold mt-8 mb-4">
						The Role of Cloud Computing
					</h2>
					<p className="mb-4">
						Cloud computing provides the scalable infrastructure necessary to
						host these advanced AI models. By leveraging serverless
						architectures and microservices, businesses can deploy updates
						faster and scale operations globally with a single click.
					</p>
					<blockquote className="border-l-4 border-primary pl-4 italic my-8 text-xl text-muted-foreground">
						"The goal isn't just to be digital; the goal is to be agile enough
						to respond to changes before they happen."
					</blockquote>
					<p className="mb-4">
						In conclusion, the future belongs to organizations that can
						successfully merge their human talent with machine intelligence, all
						supported by a robust, cloud-first management layer like ET-Admin.
					</p>
				</>
			),
			author: "Sarah Johnson",
			date: "Feb 20, 2024",
			category: "Technology",
			image:
				"https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2672&auto=format&fit=crop",
		},
		{
			id: 2,
			title: "Maximizing Team Efficiency",
			content: (
				<>
					<p className="mb-4">
						Efficiency is more than just speed; it's about clarity of purpose
						and seamless communication. In the modern distributed workforce, the
						tools we use define the culture we build.
					</p>
					<p className="mb-4">
						We've found that the highest-performing teams share three common
						traits: radical transparency, high-context communication, and the
						use of centralized management platforms.
					</p>
					<h2 className="text-2xl font-bold mt-8 mb-4">
						Centralization vs. Fragmentation
					</h2>
					<p className="mb-4">
						The average corporate worker switches between 9 application windows
						just to complete a single task. This "toggle tax" kills
						productivity. ET-Admin solves this by bringing your most critical
						business metrics into a single, unified dashboard.
					</p>
					<p className="mb-4">
						By reducing fragmentation, teams can focus on deep work rather than
						managing the overhead of their tools.
					</p>
				</>
			),
			author: "Michael Chen",
			date: "Feb 18, 2024",
			category: "Business",
			image:
				"https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop",
		},
		{
			id: 3,
			title: "State of Corporate Security 2024",
			content: (
				<>
					<p className="mb-4">
						Security is no longer just an IT concern; it's a boardroom priority.
						As cyber threats become more sophisticated, the "perimeter" of the
						enterprise has effectively disappeared.
					</p>
					<p className="mb-4">
						Today, identity is the new perimeter. Zero-trust architecture is
						becoming the global standard for organizations that value their
						intellectual property and customer data.
					</p>
					<h2 className="text-2xl font-bold mt-8 mb-4">
						Building a Culture of Security
					</h2>
					<p className="mb-4">
						Technical controls are only half the battle. A truly secure
						enterprise fosters a culture where every employee understands their
						role in the security lifecycle. This starts with visibility and ends
						with continuous education.
					</p>
				</>
			),
			author: "David Miller",
			date: "Feb 15, 2024",
			category: "Security",
			image:
				"https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2670&auto=format&fit=crop",
		},
	];

	const post = blogPosts.find((p) => p.id === Number(id));

	if (!post) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
					<Button asChild>
						<Link to="/agenda">Back to Agenda</Link>
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-background pt-16">
			<PublicNavbar />

			<main className="py-20 lg:py-32">
				<article className="container max-w-4xl">
					{/* Back Button */}
					<Button
						variant="ghost"
						className="mb-8 group text-muted-foreground hover:text-primary"
						asChild
					>
						<Link to="/agenda">
							<ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
							Back to Agenda
						</Link>
					</Button>

					{/* Category & Title */}
					<div className="space-y-4 mb-8">
						<span className="px-3 py-1 bg-primary/10 text-primary text-sm font-bold rounded-full uppercase tracking-wider">
							{post.category}
						</span>
						<h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight leading-tight">
							{post.title}
						</h1>
					</div>

					{/* Author & Date */}
					<div className="flex flex-wrap items-center justify-between gap-6 py-6 border-y border-border/50 mb-10">
						<div className="flex items-center gap-4">
							<div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
								{post.author.charAt(0)}
							</div>
							<div>
								<p className="font-bold text-foreground">{post.author}</p>
								<div className="flex items-center gap-2 text-sm text-muted-foreground">
									<Calendar className="h-4 w-4" />
									{post.date}
								</div>
							</div>
						</div>
						<div className="flex items-center gap-2">
							<Button variant="outline" size="icon" className="rounded-full">
								<Share2 className="h-4 w-4" />
							</Button>
							<Button variant="outline" size="icon" className="rounded-full">
								<Bookmark className="h-4 w-4" />
							</Button>
						</div>
					</div>

					{/* Hero Image */}
					<div className="aspect-video rounded-3xl overflow-hidden mb-12 shadow-2xl">
						<img
							src={post.image}
							alt={post.title}
							className="w-full h-full object-cover"
						/>
					</div>

					{/* Content */}
					<div className="prose prose-lg dark:prose-invert max-w-none mb-16 text-muted-foreground leading-relaxed">
						{post.content}
					</div>

					{/* CTA Footer */}
					<div className="p-8 md:p-12 rounded-3xl bg-muted/50 border border-border/50 text-center">
						<h3 className="text-2xl font-bold mb-4">
							Want more insights like this?
						</h3>
						<p className="text-muted-foreground mb-8 max-w-xl mx-auto">
							Join our newsletter and be the first to receive enterprise
							management tips, technical deep dives, and company updates.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
							<Button className="font-bold h-12 px-8">Subscribe Now</Button>
						</div>
					</div>
				</article>
			</main>

			<Footer />
		</div>
	);
};

export default AgendaDetail;
