import type { FC } from "react";
import PublicNavbar from "@/components/layout/PublicNavbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";

export const Contact: FC = () => {
	return (
		<div className="min-h-screen bg-background pt-16">
			<PublicNavbar />
			<main>
				{/* Header Section */}
				<section className="py-20">
					<div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent -z-10" />
					<div className="container px-4 mx-auto text-center">
						<h1 className="text-4xl lg:text-6xl font-bold mb-6 gradient-primary bg-clip-text text-transparent">
							Get in Touch
						</h1>
						<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
							Have questions or want to learn more? We're here to help you
							scaling your business.
						</p>
					</div>
				</section>

				<section className="pb-20">
					<div className="container px-4 mx-auto">
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
							{/* Contact Info */}
							<div className="space-y-8">
								<h2 className="text-3xl font-bold">Contact Information</h2>
								<p className="text-lg text-muted-foreground">
									Our team is available Monday through Friday, 9am to 6pm GMT.
									We usually respond within 24 hours.
								</p>

								<div className="space-y-6">
									<div className="flex items-start gap-4">
										<div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
											<Mail className="h-5 w-5" />
										</div>
										<div>
											<h4 className="font-bold">Email</h4>
											<p className="text-muted-foreground">
												support@yourbrand.com
											</p>
										</div>
									</div>
									<div className="flex items-start gap-4">
										<div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
											<Phone className="h-5 w-5" />
										</div>
										<div>
											<h4 className="font-bold">Phone</h4>
											<p className="text-muted-foreground">+1 (555) 000-0000</p>
										</div>
									</div>
									<div className="flex items-start gap-4">
										<div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
											<MapPin className="h-5 w-5" />
										</div>
										<div>
											<h4 className="font-bold">Headquarters</h4>
											<p className="text-muted-foreground">
												123 Tech Square, San Francisco, CA 94107
											</p>
										</div>
									</div>
								</div>
							</div>

							{/* Contact Form */}
							<Card className="border-border shadow-xl lg:-mt-10 bg-background/50 backdrop-blur-sm">
								<CardContent className="p-8">
									<form
										className="space-y-6"
										onSubmit={(e) => e.preventDefault()}
									>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
											<div className="space-y-2">
												<label className="text-sm font-medium">
													First Name
												</label>
												<Input placeholder="John" />
											</div>
											<div className="space-y-2">
												<label className="text-sm font-medium">Last Name</label>
												<Input placeholder="Doe" />
											</div>
										</div>
										<div className="space-y-2">
											<label className="text-sm font-medium">
												Email Address
											</label>
											<Input type="email" placeholder="john@example.com" />
										</div>
										<div className="space-y-2">
											<label className="text-sm font-medium">Message</label>
											<Textarea
												placeholder="How can we help you?"
												className="min-h-[150px]"
											/>
										</div>
										<Button className="w-full h-12 text-lg">
											Send Message
										</Button>
									</form>
								</CardContent>
							</Card>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</div>
	);
};

export default Contact;
